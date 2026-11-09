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
NAMES = os.path.join(ROOT, 'rule/.airport-names.json')

# 频道 → 用途。airport = 收集官网域名；closed = 跑路/关闭通报，用来清理规则
CHANNELS = [
    ('jichang_list', 'airport'),
    ('duang_speedtest', 'airport'),
    ('haitun_channel', 'airport'),
    ('jichangtj', 'airport'),
    ('jcplnanmin', 'closed'),
]

CLOSED_WORDS = ('跑路', '关闭', '停运', '停服', '失联', '挂了', '已关', '退出',
                '不再运营', '无法访问', '登不进', '注销')
# 推广/优惠类消息里常出现「跑路风险」这类词，不能当成跑路通报
AD_WORDS = ('优惠', '折扣', '首单', '专属', '低至', '套餐', '月付', '年付', '抽奖',
            '福利', '券', '¥', '折后', '限时')
# 已知的测评/导航站，归到导航分区而不是机场官网
NAV_KNOWN = {'jichangtuijian.com', 'jichangdaoghang.com', 'jichangdaohang.com', 'jichangblog.net',
             'clashvps.org', 'jichang100.com', 'jichangbaike.com', 'jichangnav.com',
             'jichangpai.com', 'jichangs.com', 'jichang.uk', 'jichang.win'}

# 频道消息里出现「官网/网址/地址」等字段时的分隔词
FIELD_WORDS = ('官网', '官方网站', '网址', '网站', '地址', '主页', '官网地址')
NEXT_FIELDS = ('协议:', '频道:', '群组:', '时间:', '名称:', '序号:', '标签:', '价格:', '套餐:')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'}

HOSTING = {
    'pages.dev', 'vercel.app', 'netlify.app', 'github.io', 'workers.dev', 'dpdns.org',
    'eu.org', 'js.org', 'herokuapp.com', 'web.app', 'firebaseapp.com', 'onrender.com',
    'glitch.me', 'surge.sh', 'fly.dev', 'us.kg', 'is-an.app', 'nyc.mn', 'pp.ua',
    'qzz.io', 'de5.net', 'cc.cd', 'com.de', 'xyz.cd', 'edu.kg', 'us.ci', 'dedyn.io',
}
EXCLUDE = {'t.me', 'telegram.org', 'telegram.me', 'google.com', 'github.com', 'cloudflare.com'}

# 新闻/社交/论坛/云厂商：频道里经常出现，但不是机场官网
NOISE = {
    'gov.cn', 'news.cn', 'people.com.cn', 'xinhuanet.com', 'sina.com.cn', 'sina.com',
    'sohu.com', '163.com', 'qq.com', 'weibo.com', 'weibo.cn', 'zhihu.com', 'bilibili.com',
    'douyin.com', 'toutiao.com', 'baidu.com', 'aliyun.com', 'alibaba.com', 'tencent.com',
    'huawei.com', 'xiaomi.com', 'apple.com', 'microsoft.com', 'amazon.com', 'aws.amazon.com',
    'x.com', 'twitter.com', 'youtube.com', 'facebook.com', 'instagram.com', 'tiktok.com',
    'reddit.com', 'discord.com', 'medium.com', 'wikipedia.org', 'nodeseek.com',
    'hostloc.com', 'v2ex.com', 'linux.do', '52pojie.cn', 'hostmonit.com', 'itdog.cn',
    'jsdelivr.net', 'unpkg.com', 'gstatic.com', 'googleapis.com', 'cloudfront.net',
    'akamai.net', 'akamaized.net', 'aliyuncs.com', 'myqcloud.com', 'qcloud.com',
    'chatgpt.com', 'openai.com', 'anthropic.com', 'claude.ai', 'gemini.google.com',
    'xueqiu.com', 'weixin.qq.com', 'mp.weixin.qq.com', 'ping0.cc', 'itdog.cn',
}

# 代理客户端官网：不是机场，收进去没意义
APP_HOSTS = {'nssurge.com', 'surge.sh', 'egernapp.com', 'getbitzapp.com', 'stash.ws',
             'shadowrocket.com', 'loon.app', 'quantumultx.com', 'clashverge.com',
             'clash.razord.top', 'mihomo.app', 'sing-box.sagernet.org', 'v2ray.com'}

# 短链与推广跳转
SHORTEN = {'reurl.cc', 'bit.ly', 'tinyurl.com', 't.co', 't.cn', 'url.cn', 's.id',
           'cutt.ly', 'rebrand.ly', 'shorturl.at', 'is.gd', 'v.gd', 'suo.im'}

# 只有出现这些词，才把整条消息里的链接当官网候选（防止把新闻链接当机场）
AIRPORT_WORDS = ('机场', '加速', '中转', '专线', '节点', '订阅', '流量', '套餐',
                 'VPS', 'VPN', 'IPLC', 'IEPL', 'BGP', '落地', '月付', '年付')

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


def fetch_allorigins(channel, before=None):
    """第三方 CORS 代理，返回的是 t.me 原始 HTML。"""
    target = f'https://t.me/s/{channel}'
    if before:
        target += f'?before={before}'
    url = 'https://api.allorigins.win/raw?url=' + urllib.parse.quote(target, safe='')
    return http_get(url, timeout=60)


def fetch_jina(channel):
    """Jina Reader，把页面转成 Markdown，最后兜底。"""
    return http_get(f'https://r.jina.ai/https://t.me/s/{channel}', timeout=60)


def fetch_messages(channel, pages=5):
    """按优先级抓取消息：t.me → allorigins → i-c-a.su → jina。"""
    # 1. t.me 直连（GitHub Actions 可访问）
    try:
        out, before = [], None
        for _ in range(pages):
            batch = parse_html_messages(fetch_telegram_html(channel, before))
            if not batch:
                break
            out += batch
            nxt = min(m['id'] for m in batch)
            if nxt == before:
                break
            before = nxt
        if out:
            return out, 't.me'
    except Exception as e:
        print(f'  [t.me] {channel}: {e}')

    # 2. allorigins 代理拿原始 HTML
    try:
        out, before = [], None
        for _ in range(pages):
            batch = parse_html_messages(fetch_allorigins(channel, before))
            if not batch:
                break
            out += batch
            nxt = min(m['id'] for m in batch)
            if nxt == before:
                break
            before = nxt
        if out:
            return out, 'allorigins'
    except Exception as e:
        print(f'  [allorigins] {channel}: {e}')

    # 3. i-c-a.su 镜像
    try:
        out = fetch_mirror_json(channel)
        if out:
            return out, 'i-c-a.su'
    except Exception as e:
        print(f'  [i-c-a.su] {channel}: {e}')

    # 4. jina reader
    try:
        page = fetch_jina(channel)
        out = []
        for m in re.finditer(r'\n(\d{3,})\n', page):
            pass
        blocks = re.split(r'\n#{1,6} ', page)
        texts = [b for b in blocks if ('官网' in b or '网址' in b or 'http' in b)]
        for i, b in enumerate(texts):
            out.append({'id': i, 'text': html.unescape(re.sub(r'\[([^\]]*)\]\((http[^)]+)\)', r'\2', b))})
        if out:
            return out, 'jina'
    except Exception as e:
        print(f'  [jina] {channel}: {e}')

    return [], 'none'


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


def extract_block(text, start='官网'):
    """取字段值：从「官网:」到下一个字段。"""
    for word in FIELD_WORDS:
        if word in text and (start in (word, '官网')):
            pass
    if start not in text:
        return ''
    seg = text.split(start, 1)[1]
    seg = re.split(r'[⦁•·]', seg)[0]
    for stop in NEXT_FIELDS:
        seg = seg.split(stop, 1)[0]
    return seg


def links_from_message(text):
    """先找官网/网址字段；没有字段时，只有机场类消息才退回整条消息的链接。"""
    for word in FIELD_WORDS:
        if word in text:
            block = extract_block(text, word)
            urls = urls_from_block(block)
            if urls:
                return urls
    if any(w.lower() in text.lower() for w in AIRPORT_WORDS):
        return urls_from_block(text)
    return []


def is_closure(text):
    """判断一条消息是不是「某机场跑路/关停」的通报，避开推广文里的「跑路风险」。"""
    if any(w in text for w in AD_WORDS):
        return False
    head = text[:120]
    for w in CLOSED_WORDS:
        if w not in text:
            continue
        idx = text.find(w)
        tail = text[idx + len(w): idx + len(w) + 2]
        if tail.startswith('风险') or tail.startswith('的'):
            continue
        if w in head:
            return True
    return False


def message_name(text):
    """从消息里取一个可读的机场名/标题，去掉链接和话题标签。"""
    t = re.sub(r'https?://\S+', ' ', text)
    t = re.sub(r'\?q=\S*', ' ', t)
    t = urllib.parse.unquote(t)
    m = re.search(r'名称[:：]\s*(.+)', t)
    if m:
        name = m.group(1)
    else:
        lines = [l.strip() for l in t.splitlines() if l.strip()]
        name = lines[0] if lines else ''
    name = re.sub(r'[#*•·]+', ' ', name)
    name = re.sub(r'\s+', ' ', name).strip()
    return name[:40]


def urls_from_block(block):
    urls = []
    for u in re.findall(r'https?://[^\s*<>"\']+', block):
        u = u.strip().rstrip('.,;)]')
        urls.append(u)
    return urls


GOV_TLDS = ('.gov', '.gov.cn', '.edu', '.edu.cn', '.mil')


def registrable(host):
    """取 eTLD+1；不下载 PSL，用常见的多段后缀规则兜底。"""
    parts = host.split('.')
    two = ('.'.join(parts[-2:]) if len(parts) >= 2 else host)
    if host.endswith(GOV_TLDS):
        return host
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

    # 1. 逐频道抓取
    hosts = set()
    name_map = {}
    if os.path.exists(NAMES):
        try:
            name_map = json.load(open(NAMES, encoding='utf-8'))
        except Exception:
            name_map = {}
    closed_domains = set()
    closed_notes = []
    sources = []
    total_msgs = 0
    max_id = last_id

    for channel, kind in CHANNELS:
        msgs, src = fetch_messages(channel, pages)
        if not msgs:
            print(f'[warn] @{channel} 没抓到消息')
            continue
        msgs.sort(key=lambda m: m['id'])
        total_msgs += len(msgs)
        max_id = max([max_id] + [m['id'] for m in msgs])
        sources.append(f'{channel}({src})')
        print(f'@{channel}（{kind}）{len(msgs)} 条，来源 {src}')

        for m in msgs:
            text = m['text']
            urls = links_from_message(text)
            found = []
            for u in urls:
                h = (urllib.parse.urlparse(u).hostname or '').lower().strip('.')
                if not h or not re.match(r'^[a-z0-9.-]+$', h) or '.' not in h:
                    continue
                r = registrable(h)
                if h.endswith(GOV_TLDS):
                    continue
                if r in APP_HOSTS or r in SHORTEN:
                    continue
                if re.search(r'aff\.(com|net|cc|vip|xyz)$', r):
                    continue
                if any(len(x) > 20 for x in h.split('.')):
                    continue
                if h in EXCLUDE or any(r == n or r.endswith('.' + n) for n in NOISE):
                    continue
                found.append(h)

            if kind == 'closed':
                if is_closure(text):
                    # 通报里提到已知机场名，就把对应域名标记为关闭
                    for nm, dom in name_map.items():
                        if len(nm) >= 3 and nm in text:
                            closed_domains.add(dom)
                    sent = False
                    for h in found:
                        if 't.me' in h or h in EXCLUDE:
                            continue
                        closed_domains.add(registrable(h))
                        sent = True
                    closed_notes.append(f"{message_name(text)}\t{','.join(sorted(set(found))) or '-'}")
            else:
                hosts.update(found)
                nm = message_name(text)
                nm = re.sub(r'[#\s]', '', nm)
                if 2 <= len(nm) <= 20 and found:
                    name_map.setdefault(nm, registrable(found[0]))

    if not hosts and not closed_domains:
        print('[error] 所有频道都没有可用数据')
        return 1

    source = '、'.join(sources)
    print(f'共 {total_msgs} 条消息，域名候选 {len(hosts)} 个，关闭通报 {len(closed_notes)} 条')

    suffix, exact, nav_found = set(), set(), set()
    for h in hosts:
        r = registrable(h)
        if r in SHARED:
            continue
        if r in NAV_KNOWN:
            nav_found.add(r)
            continue
        if r in HOSTING:
            exact.add(h)
        else:
            suffix.add(r)
    print(f'新域名：{len(suffix)} 个主域 + {len(exact)} 个托管平台主机')

    # 3. 合并
    providers, old_exact, nav = read_sections(TARGET)
    nav |= nav_found
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

    removed = sorted(d for d in closed_domains if d in providers)
    providers |= set(added)
    providers -= set(removed)
    if removed:
        print(f'按跑路通报移除 {len(removed)} 个：{", ".join(removed)}')
    exact = {h for h in exact if not any(h == s or h.endswith('.' + s) for s in providers)}
    exact -= old_exact
    exact |= old_exact

    if not dry:
        json.dump(name_map, open(NAMES, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)

    if closed_notes and not dry:
        log = os.path.join(ROOT, 'rule/airport-closed.txt')
        old = open(log, encoding='utf-8').read() if os.path.exists(log) else '# 跑路/关闭通报记录（频道 @jcplnanmin）\n'
        stamp = __import__('time').strftime('%Y-%m-%d')
        for n in closed_notes:
            line = f'{stamp}\t{n}'
            if line not in old:
                old = old.rstrip() + '\n' + line
        open(log, 'w', encoding='utf-8').write(old.rstrip() + '\n')

    if not dry:
        write_sections(TARGET, providers, exact, nav, f'{source}、公开机场测评与导航站')
        state['last_id'] = max_id
        state['channels'] = [c for c, _ in CHANNELS]
        state['updated'] = __import__('time').strftime('%Y-%m-%d')
        json.dump(state, open(STATE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'已写入 {TARGET}：{len(providers)} 主域 / {len(exact)} 精确 / {len(nav)} 导航')
    else:
        print('dry-run，未写入')

    # GitHub Actions 摘要
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as f:
            f.write(f'## 机场规则同步\n\n- 来源：{source}\n- 消息：{total_msgs}\n'
                    f'- 新增域名：{len(added)}\n- 移除（跑路）：{len(removed)}\n'
                    f'- 主域总数：{len(providers)}\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
