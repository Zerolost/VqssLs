#!/usr/bin/env python3
"""从 Telegram 频道抓取机场官网域名，合并进 rule/Surge/Airport.list。

抓取通道（按顺序尝试）：
  1. https://t.me/s/<channel>          — Telegram 官方网页预览，GitHub Actions 可直连
  2. https://tg.i-c-a.su/json/<channel> — 第三方镜像，仅作备用

只做「追加」：旧域名不会自动删除（机场换域名频繁，删了容易误伤）。
新增域名先过 DoH 校验，解析不到的不写入。

用法：
  python3 tools/sync_telegram_airport.py                 # 抓最新若干页并合并
  python3 tools/sync_telegram_airport.py --dry-run       # 只打印不写入
  python3 tools/sync_telegram_airport.py --pages 10      # 多翻几页历史
"""
import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, 'rule/Surge/Airport.list')
STATE = os.path.join(ROOT, 'rule/.airport-state.json')

CHANNEL = os.environ.get('TG_CHANNEL', 'jichang_list')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'}

HOSTING = {
    'pages.dev', 'vercel.app', 'netlify.app', 'github.io', 'workers.dev', 'dpdns.org',
    'eu.org', 'js.org', 'herokuapp.com', 'web.app', 'firebaseapp.com', 'onrender.com',
    'glitch.me', 'surge.sh', 'fly.dev', 'us.kg', 'is-an.app', 'nyc.mn', 'pp.ua',
    'qzz.io', 'de5.net', 'cc.cd', 'com.de', 'xyz.cd', 'edu.kg', 'us.ci', 'dedyn.io',
}
EXCLUDE = {'t.me', 'telegram.org', 'telegram.me', 'google.com', 'github.com', 'cloudflare.com'}

# 公共动态域名 / 短链平台：整域收录会误伤同一服务下的其他用户，直接跳过
SHARED = {
    'duckdns.org', 'ddnsgeek.com', 'ddns.net', 'noip.com', 'hopto.org', 'zapto.org',
    'sytes.net', 'myftp.org', 'synology.me', 'myqnapcloud.com', 'quickconnect.to',
    'ngrok.io', 'ngrok-free.app', 'trycloudflare.com', 'serveo.net', 'localhost.run',
    'bit.ly', 'tinyurl.com', 't.cn', 'url.cn', 's.id', 'shorturl.at',
}

SEC_PROVIDER = '# 官网、订阅与测速入口'
SEC_EXACT = '# 托管平台入口（精确匹配）'
SEC_NAV = '# 机场导航与测评站'


# ---------------------------------------------------------------- 抓取

def http_get(url, timeout=40):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode('utf-8', 'ignore')


def fetch_telegram_html(channel, before=None):
    url = f'https://t.me/s/{channel}'
    if before:
        url += f'?before={before}'
    return http_get(url)


def fetch_mirror_json(channel, limit=100):
    url = f'https://tg.i-c-a.su/json/{channel}?limit={limit}'
    data = json.loads(http_get(url))
    msgs = data.get('messages', data) if isinstance(data, dict) else data
    out = []
    for m in msgs:
        text = m.get('message') or ''
        text = re.sub(r'<br\s*/?>', '\n', text)
        text = re.sub(r'<[^>]+>', '', text)
        out.append({'id': m.get('id', 0), 'text': html.unescape(text)})
    return out


# ---------------------------------------------------------------- 解析

def parse_html_messages(page):
    """从 t.me/s 页面解析出 [{id, text}]（text 保留 <a href> 的 URL）。"""
    out = []
    for block in re.split(r'<div class="tgme_widget_message_wrap', page)[1:]:
        m = re.search(r'data-post="[^/]+/(\d+)"', block)
        if not m:
            continue
        msg_id = int(m.group(1))
        body = re.search(r'class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>', block, re.S)
        if not body:
            continue
        raw = body.group(1)
        # 链接同时保留 href，避免可见文字被截断
        raw = re.sub(r'<a[^>]*href="([^"]+)"[^>]*>.*?</a>', r' \1 ', raw, flags=re.S)
        text = re.sub(r'<br\s*/?>', '\n', raw)
        text = re.sub(r'<[^>]+>', '', text)
        out.append({'id': msg_id, 'text': html.unescape(text)})
    return out


def extract_block(text, start='官网', stops=('协议:', '频道:', '群组:', '时间:')):
    """取「官网:」到下一个字段之间的内容。"""
    if start not in text:
        return ''
    seg = text.split(start, 1)[1]
    for stop in stops:
        seg = seg.split(stop, 1)[0]
    return seg


def urls_from_block(block):
    urls = []
    for u in re.findall(r'https?://[^\s*<>"\']+', block):
        u = u.strip().rstrip('.,;)]')
        urls.append(u)
    return urls


def registrable(host):
    """取 eTLD+1；不下载 PSL，用常见的多段后缀规则兜底。"""
    parts = host.split('.')
    two = ('.'.join(parts[-2:]) if len(parts) >= 2 else host)
    if len(parts) >= 3 and '.'.join(parts[-2:]) in {'com.cn', 'net.cn', 'org.cn', 'gov.cn',
                                                    'co.uk', 'org.uk', 'co.jp', 'ne.jp',
                                                    'com.tw', 'com.hk', 'com.sg', 'com.au',
                                                    'co.kr', 'com.br', 'com.ru', 'com.tr'}:
        return '.'.join(parts[-3:])
    return two


# ---------------------------------------------------------------- 域名整理

def read_sections(path):
    providers, exact, nav = set(), set(), set()
    section = None
    if not os.path.exists(path):
        return providers, exact, nav
    for line in open(path, encoding='utf-8'):
        s = line.strip()
        if s == SEC_PROVIDER:
            section = 'p'
            continue
        if s == SEC_EXACT:
            section = 'e'
            continue
        if s == SEC_NAV:
            section = 'n'
            continue
        m = re.match(r'^DOMAIN-SUFFIX,(.+)$', s)
        if m and section in ('p', 'n'):
            (providers if section == 'p' else nav).add(m.group(1))
            continue
        m = re.match(r'^DOMAIN,(.+)$', s)
        if m and section == 'e':
            exact.add(m.group(1))
    return providers, exact, nav


def alive(host):
    url = 'https://1.1.1.1/dns-query?' + urllib.parse.urlencode({'name': host, 'type': 'A'})
    try:
        req = urllib.request.Request(url, headers={'accept': 'application/dns-json'})
        d = json.load(urllib.request.urlopen(req, timeout=12))
        return any(a.get('type') == 1 for a in d.get('Answer', []))
    except Exception:
        return False


def write_sections(path, providers, exact, nav, source_note):
    lines = ['# ============ 机场与中转站 ============',
             SEC_PROVIDER,
             f'# 来源：{source_note}']
    lines += ['DOMAIN-SUFFIX,' + d for d in sorted(providers)]
    lines += ['', SEC_EXACT]
    lines += ['DOMAIN,' + d for d in sorted(exact)]
    lines += ['', SEC_NAV]
    lines += ['DOMAIN-SUFFIX,' + d for d in sorted(nav)]
    with open(path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')


def main():
    dry = '--dry-run' in sys.argv
    pages = 5
    if '--pages' in sys.argv:
        pages = int(sys.argv[sys.argv.index('--pages') + 1])
    no_validate = '--no-validate' in sys.argv

    state = {}
    if os.path.exists(STATE):
        try:
            state = json.load(open(STATE, encoding='utf-8'))
        except Exception:
            state = {}
    last_id = int(state.get('last_id', 0))

    # 1. 抓消息，优先 t.me，失败回退镜像
    messages, source = [], ''
    try:
        before = None
        for _ in range(pages):
            page = fetch_telegram_html(CHANNEL, before)
            batch = parse_html_messages(page)
            if not batch:
                break
            messages += batch
            new_before = min(m['id'] for m in batch)
            if last_id and new_before <= last_id:
                break
            if new_before == before:
                break
            before = new_before
        if messages:
            source = f'Telegram @{CHANNEL}'
    except Exception as e:
        print(f'[warn] t.me 抓取失败：{e}')

    if not messages:
        try:
            messages = fetch_mirror_json(CHANNEL)
            source = f'Telegram @{CHANNEL}（镜像）'
        except Exception as e:
            print(f'[error] 备用通道也失败：{e}')
            return 1

    messages.sort(key=lambda m: m['id'])
    # 每次都重新合并最新若干页：合并是幂等的，避免漏掉上次解析失败的条目
    fresh = messages
    print(f'抓到 {len(messages)} 条消息（来源：{source}，上次记录 id {last_id}）')

    # 2. 抽域名
    hosts = set()
    for m in fresh:
        block = extract_block(m['text'])
        for u in urls_from_block(block):
            h = (urllib.parse.urlparse(u).hostname or '').lower().strip('.')
            if h and re.match(r'^[a-z0-9.-]+$', h) and '.' in h and h not in EXCLUDE:
                hosts.add(h)

    suffix, exact = set(), set()
    for h in hosts:
        r = registrable(h)
        if r in SHARED:
            continue
        if r in HOSTING:
            exact.add(h)
        else:
            suffix.add(r)
    print(f'新域名：{len(suffix)} 个主域 + {len(exact)} 个托管平台主机')

    # 3. 合并
    providers, old_exact, nav = read_sections(TARGET)
    candidates = sorted(suffix - providers)
    if no_validate:
        added = candidates
    else:
        added = []
        with ThreadPoolExecutor(max_workers=8) as ex:
            for host, ok in zip(candidates, ex.map(alive, candidates)):
                if ok:
                    added.append(host)
    print(f'可解析并新增：{len(added)} 个')
    for a in added:
        print('  +', a)

    providers |= set(added)
    exact = {h for h in exact if not any(h == s or h.endswith('.' + s) for s in providers)}
    exact -= old_exact
    exact |= old_exact

    if not dry:
        write_sections(TARGET, providers, exact, nav, f'{source}、公开机场测评与导航站')
        state['last_id'] = max((m['id'] for m in messages), default=last_id)
        state['updated'] = __import__('time').strftime('%Y-%m-%d')
        json.dump(state, open(STATE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'已写入 {TARGET}：{len(providers)} 主域 / {len(exact)} 精确 / {len(nav)} 导航')
    else:
        print('dry-run，未写入')

    # GitHub Actions 摘要
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as f:
            f.write(f'## 机场规则同步\n\n- 来源：{source}\n- 新消息：{len(fresh)}\n'
                    f'- 新增域名：{len(added)}\n- 主域总数：{len(providers)}\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
