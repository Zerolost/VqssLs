#!/usr/bin/env python3
"""从 Telegram 机场频道抓取官网域名，合并进 rule/Surge/Airport.list。

保留文件里的三个分区：官网入口 / 托管平台精确匹配 / 导航测评站。
只追加新域名，不删除已有条目（机场域名轮换频繁，删了容易误伤）。
"""
import json
import os
import re
import urllib.parse
import urllib.request

CHANNEL = 'jichang_list'
FEEDS = [
    f'https://tg.i-c-a.su/json/{CHANNEL}?limit=100',
    f'https://tg.i-c-a.su/rss/{CHANNEL}?limit=100',
]
TARGET = 'rule/Surge/Airport.list'

HOSTING = {
    'pages.dev', 'vercel.app', 'netlify.app', 'github.io', 'workers.dev', 'dpdns.org',
    'eu.org', 'js.org', 'herokuapp.com', 'web.app', 'firebaseapp.com', 'onrender.com',
    'glitch.me', 'surge.sh', 'fly.dev', 'us.kg', 'is-an.app', 'nyc.mn', 'pp.ua',
    'qzz.io', 'de5.net', 'cc.cd', 'com.de', 'xyz.cd', 'edu.kg', 'us.ci',
}
EXCLUDE = {'t.me', 'telegram.org', 'telegram.me', 'google.com', 'github.com', 'cloudflare.com'}

SEC_PROVIDER = '# 官网、订阅与测速入口'
SEC_EXACT = '# 托管平台入口（精确匹配）'
SEC_NAV = '# 机场导航与测评站'


def get(url, timeout=40):
    req = urllib.request.Request(url, headers={'User-Agent': 'VqssLs-AirportSync'})
    return urllib.request.urlopen(req, timeout=timeout).read().decode('utf-8', 'ignore')


def load_psl():
    rules, wild, exc = set(), set(), set()
    try:
        text = get('https://publicsuffix.org/list/public_suffix_list.dat', timeout=60)
    except Exception as e:
        print('[warn] psl fetch failed:', e)
        return None
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith('//'):
            continue
        if line.startswith('!'):
            exc.add(line[1:])
        elif line.startswith('*.'):
            wild.add(line[2:])
        else:
            rules.add(line)
    return rules, wild, exc


def reg_domain(host, psl):
    if not psl:
        return host
    rules, wild, exc = psl
    parts = host.split('.')
    n = len(parts)
    best = 1
    for i in range(n):
        cand = '.'.join(parts[i:])
        if cand in exc:
            return '.'.join(parts[n - i:])
        if cand in rules:
            best = max(best, n - i)
        if '.'.join(parts[i + 1:]) in wild:
            best = max(best, n - i)
    return '.'.join(parts[-(best + 1):])


def parse_feed(text):
    hosts = set()
    # JSON feed
    try:
        data = json.loads(text)
        msgs = data.get('messages', data) if isinstance(data, dict) else data
        for m in msgs:
            body = m.get('message') or ''
            hosts |= hosts_from_text(body)
        return hosts
    except Exception:
        pass
    # RSS feed
    import html
    for item in re.findall(r'<item>(.*?)</item>', text, re.S):
        d = re.search(r'<description>(.*?)</description>', item, re.S)
        if d:
            body = html.unescape(d.group(1))
            body = re.sub(r'<br\s*/?>', '\n', body)
            hosts |= hosts_from_text(re.sub(r'<[^>]+>', '', body))
    return hosts


def hosts_from_text(body):
    if '官网' not in body:
        return set()
    block = body.split('官网:')[-1]
    for stop in ('协议:', '频道:', '群组:', '时间:'):
        block = block.split(stop)[0]
    out = set()
    for u in re.findall(r'https?://[^\s*<>"\']+', block):
        h = (urllib.parse.urlparse(u).hostname or '').lower().strip('.')
        if h and re.match(r'^[a-z0-9.-]+$', h) and '.' in h:
            out.add(h)
    return out


def alive(host):
    url = 'https://1.1.1.1/dns-query?' + urllib.parse.urlencode({'name': host, 'type': 'A'})
    try:
        req = urllib.request.Request(url, headers={'accept': 'application/dns-json'})
        d = json.load(urllib.request.urlopen(req, timeout=12))
        return any(a.get('type') == 1 for a in d.get('Answer', []))
    except Exception:
        return False


def read_sections(path):
    providers, exact, nav = set(), set(), set()
    section = None
    for line in open(path, encoding='utf-8'):
        s = line.strip()
        if s.startswith('# ============'):
            continue
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


def main():
    psl = load_psl()
    existing_providers, existing_exact, existing_nav = read_sections(TARGET)

    raw = set()
    for feed in FEEDS:
        try:
            raw |= parse_feed(get(feed))
            print(f'{feed}: hosts so far {len(raw)}')
        except Exception as e:
            print(f'[warn] feed failed: {feed} {e}')

    suffix, exact = set(), set()
    for h in raw:
        r = reg_domain(h, psl)
        if any(r == x or r.endswith('.' + x) for x in HOSTING):
            exact.add(h)
        elif r not in EXCLUDE:
            suffix.add(r)

    candidates = sorted(suffix - existing_providers)
    print(f'candidates: {len(candidates)}')
    added = [c for c in candidates if alive(c)]
    print(f'new alive: {len(added)}')
    for a in added:
        print('  +', a)

    providers = sorted(existing_providers | set(added))
    exact_all = sorted(existing_exact | exact)
    nav = sorted(existing_nav)

    lines = ['# ============ 机场与中转站 ============',
             SEC_PROVIDER,
             '# 来源：Telegram @jichang_list、公开机场测评与导航站']
    lines += ['DOMAIN-SUFFIX,' + d for d in providers]
    lines += ['', SEC_EXACT]
    lines += ['DOMAIN,' + d for d in exact_all]
    lines += ['', SEC_NAV]
    lines += ['DOMAIN-SUFFIX,' + d for d in nav]
    open(TARGET, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    print(f'wrote {TARGET}: {len(providers)} + {len(exact_all)} + {len(nav)}')


if __name__ == '__main__':
    main()
