#!/usr/bin/env python3
"""从 API 中转站榜单/导航站抓取服务商域名，补进 rule/Surge/API.list。

做法：
  1. 抓每个榜单页面的 HTML，提取外链（SPA 站点会附带 sitemap 与 JSON 数据再抓一遍）
  2. 过滤掉榜单站自己、官方厂商、社交/CDN/统计域名
  3. DoH 校验能解析才收录；托管平台（pages.dev / qzz.io 等）用精确匹配
  4. 解析到独立 IP（非 Cloudflare / Fastly 等共享段）的，顺手生成 /32 的 IP-CIDR

用法：
  python3 tools/sync_api_relay.py             # 抓取并写入
  python3 tools/sync_api_relay.py --dry-run
"""
import ipaddress
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, 'rule/Surge/API.list')
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'}

SOURCES = [
    'https://veridrop.org/',
    'https://www.helpaio.com/',
    'https://www.hvoyai.com/',
    'https://www.aiapipk.com/',
    'https://www.okkmax.com/',
    'https://www.aisuby.com/',
    'https://www.joyinai.com/',
    'https://raw.githubusercontent.com/Chenking-maker/api-rank/main/README.md',
]

# 榜单站自己 / 官方厂商 / 无关站点
EXCLUDE = {
    'veridrop.org', 'helpaio.com', 'hvoyai.com', 'aiapipk.com', 'okkmax.com', 'aisuby.com',
    'joyinai.com', 'github.com', 'githubusercontent.com', 'github.io',
    'openai.com', 'anthropic.com', 'google.com', 'deepseek.com', 'moonshot.cn',
    'bigmodel.cn', 'siliconflow.com', 'alibabacloud.com', 'baidu.com', 'tencent.com',
    'volces.com', 'x.ai', 'mistral.ai', 'groq.com', 'cohere.com', 'azure.com',
    'microsoft.com', 'amazon.com', 'cloudflare.com', 'vercel.com', 'netlify.com',
    'twitter.com', 'x.com', 'telegram.org', 't.me', 'discord.com', 'youtube.com',
    'bilibili.com', 'zhihu.com', 'juejin.cn', 'csdn.net', 'jianshu.com', 'weibo.com',
    'googleapis.com', 'gstatic.com', 'jsdelivr.net', 'unpkg.com', 'bootcdn.net',
    'baidu.com', 'cnzz.com', 'umeng.com', 'sentry.io', 'posthog.com', 'clarity.ms',
    'fonts.googleapis.com', 'w3.org', 'schema.org', 'gravatar.com', 'alicdn.com',
    'myqcloud.com', 'qcloud.com', 'aliyuncs.com', 'byteimg.com', 'zhimg.com',
    'amazonaws.com', 'azurewebsites.net', 'cloudfront.net', 'akamaized.net',
    'chatgpt.com', 'claude.ai', 'gemini.google.com', 'openrouter.ai',
    'unsplash.com', 'pexels.com', 'iconfont.cn', 'fontawesome.com',
    'google-analytics.com', 'googletagmanager.com', 'bing.com',
    'aliyun.com', 'aliyuncdn.com', 'apifox.com', 'apifox.cn', 'postman.com',
    'notion.so', 'feishu.cn', 'larksuite.com', 'yuque.com', 'wps.cn',
}

HOSTING = {'pages.dev', 'vercel.app', 'netlify.app', 'github.io', 'workers.dev',
           'dpdns.org', 'eu.org', 'js.org', 'herokuapp.com', 'web.app',
           'firebaseapp.com', 'onrender.com', 'glitch.me', 'surge.sh', 'fly.dev',
           'qzz.io', 'de5.net', 'cc.cd', 'com.de', 'xyz.cd', 'us.kg', 'is-an.app',
           'nyc.mn', 'pp.ua', 'dedyn.io', 'vercel.sh', 'deno.dev'}

# Cloudflare / Fastly / Akamai 等共享段的判定（前缀）
SHARED_NET = [
    '104.16.', '104.17.', '104.18.', '104.19.', '104.20.', '104.21.', '104.22.', '104.23.',
    '104.24.', '104.25.', '104.26.', '104.27.', '172.64.', '172.65.', '172.66.', '172.67.',
    '172.68.', '172.69.', '172.70.', '172.71.', '151.101.', '199.232.', '185.199.',
    '13.107.', '23.20.', '23.21.', '23.22.', '23.23.', '76.76.', '216.239.',
]

SEC_PROVIDER = '# 官网与控制台'
SEC_IP = '# 独立服务器'


def http_get(url, timeout=40, retries=2):
    last = None
    for i in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read().decode('utf-8', 'ignore')
        except Exception as e:
            last = e
            if i < retries:
                __import__('time').sleep(2 + i * 3)
    raise last


def registrable(host):
    parts = host.split('.')
    if len(parts) >= 3 and '.'.join(parts[-2:]) in {
            'com.cn', 'net.cn', 'org.cn', 'gov.cn', 'co.uk', 'org.uk', 'co.jp', 'ne.jp',
            'com.tw', 'com.hk', 'com.sg', 'com.au', 'co.kr', 'com.br', 'com.ru', 'com.tr'}:
        return '.'.join(parts[-3:])
    return '.'.join(parts[-2:])


def hosts_from(url):
    out = set()
    try:
        html = http_get(url)
    except Exception as e:
        print(f'  [warn] {url}: {e}')
        return out
    # sitemap 里的链接也可能是榜单条目
    for u in re.findall(r'https?://[^\s"\'<>\\]+', html):
        try:
            h = (urllib.parse.urlparse(u).hostname or '').lower().strip('.')
        except ValueError:
            continue
        if h and re.match(r'^[a-z0-9.-]+$', h) and '.' in h:
            out.add(h)
    return out


CLOUD_ASN = {'16509', '14618', '15169', '396982', '8075', '37963', '45102',
             '132203', '45090', '13335', '209242', '54113', '19551', '20473',
             '24940', '16276', '14061', '63949', '2635'}


def asn_of(ip):
    """查 IP 的 ASN（Team Cymru 的 DNS 接口），失败返回 None。"""
    rev = '.'.join(reversed(ip.split('.'))) + '.origin.asn.cymru.com'
    url = 'https://dns.google/resolve?' + urllib.parse.urlencode({'name': rev, 'type': 'TXT'})
    try:
        req = urllib.request.Request(url, headers={'accept': 'application/json'})
        d = json.load(urllib.request.urlopen(req, timeout=10))
        for a in d.get('Answer', []):
            txt = a.get('data', '')
            m = re.search(r'"(\d+)\s', txt) or re.match(r'^(\d+)', txt.strip('"'))
            if m:
                return m.group(1)
    except Exception:
        pass
    return None


def alive(host):
    url = 'https://1.1.1.1/dns-query?' + urllib.parse.urlencode({'name': host, 'type': 'A'})
    try:
        req = urllib.request.Request(url, headers={'accept': 'application/dns-json'})
        d = json.load(urllib.request.urlopen(req, timeout=12))
        ips = [a['data'] for a in d.get('Answer', []) if a.get('type') == 1]
        return host, ips
    except Exception:
        return host, []


def read_list(path):
    providers, exact, ips = set(), set(), set()
    section = None
    if not os.path.exists(path):
        return providers, exact, ips
    for line in open(path, encoding='utf-8'):
        s = line.strip()
        if s.startswith(SEC_PROVIDER):
            section = 'p'
            continue
        if s.startswith(SEC_IP):
            section = 'i'
            continue
        m = re.match(r'^DOMAIN-SUFFIX,(.+)$', s)
        if m and section == 'p':
            providers.add(m.group(1))
            continue
        m = re.match(r'^DOMAIN,(.+)$', s)
        if m and section == 'p':
            exact.add(m.group(1))
            continue
        m = re.match(r'^IP-CIDR,([\d.]+)/32,', s)
        if m and section == 'i':
            ips.add(m.group(1))
    return providers, exact, ips


def main():
    dry = '--dry-run' in sys.argv
    hosts = set()
    if '--from-file' in sys.argv:
        path = sys.argv[sys.argv.index('--from-file') + 1]
        for line in open(path, encoding='utf-8'):
            h = line.strip().lower()
            if h and re.match(r'^[a-z0-9.-]+\.[a-z]{2,}$', h):
                hosts.add(h)
        print(f'{path}: {len(hosts)} 个域名')
    else:
        for url in SOURCES:
            got = hosts_from(url)
            print(f'{url}: {len(got)} 个链接')
            hosts |= got

    cand = set()
    for h in hosts:
        if h in EXCLUDE:
            continue
        r = registrable(h)
        if r in EXCLUDE or any(r == e or r.endswith('.' + e) for e in EXCLUDE):
            continue
        if any(len(x) > 20 for x in h.split('.')):
            continue
        if re.match(r'^(cdn|static|img|image|assets?|oss|file|download|up)\d*\.', h):
            continue
        if 'xn--' in h:
            continue
        cand.add((h, r))
    print(f'去重后候选 {len(cand)} 个')

    providers, exact, old_ips = read_list(TARGET)

    suffix_new, exact_new = set(), set()
    for h, r in sorted(cand):
        if r in HOSTING:
            if h not in exact:
                exact_new.add(h)
        elif r not in providers:
            suffix_new.add(r)

    # 校验 + 取 IP
    check = sorted(suffix_new)
    resolved = {}
    with ThreadPoolExecutor(max_workers=12) as ex:
        for host, ips in ex.map(alive, check):
            if ips:
                resolved[host] = ips
    print(f'可解析：{len(resolved)} / {len(check)}')

    # 只在「独立 IP」时生成规则：同 /24 合并成一条，排除云厂商与共享 CDN 段
    CLOUD = ('3.', '13.', '18.', '34.', '35.', '44.', '52.', '54.', '99.83.', '99.84.',
             '47.100.', '47.101.', '47.102.', '47.103.', '8.13', '8.14', '8.21', '8.15',
             '120.24.', '120.25.', '119.28.', '119.29.', '129.226.', '43.15', '43.16')
    ip_nets = {}
    for host, ips in resolved.items():
        for ip in ips:
            if any(ip.startswith(p) for p in SHARED_NET) or ip.startswith(CLOUD):
                continue
            try:
                addr = ipaddress.ip_address(ip)
            except ValueError:
                continue
            if not addr.is_global:
                continue
            net = str(ipaddress.ip_network(ip + '/24', strict=False))
            ip_nets.setdefault(net, []).append(ip)
    # 独占 /24 的候选，再看 ASN：云厂商一律跳过
    solo = [ips[0] for _, ips in sorted(ip_nets.items()) if len(ips) == 1]
    solo = [ip for ip in solo if ip not in old_ips][:80]
    ip_new = set()
    with ThreadPoolExecutor(max_workers=10) as ex:
        for ip, asn in zip(solo, ex.map(asn_of, solo)):
            if asn and asn in CLOUD_ASN:
                continue
            ip_new.add(ip)

    print(f'新增主域 {len(resolved)}、精确 {len(exact_new)}、IP {len(ip_new)}')
    for d in sorted(resolved):
        print('  +', d)
    for ip in sorted(ip_new):
        print('  + ip', ip)

    if dry:
        print('dry-run，未写入')
        return 0

    providers |= set(resolved)
    exact |= exact_new
    lines = ['# ============ AI API 中转站 ============', SEC_PROVIDER,
             '# 来源：公开中转站榜单与导航仓库']
    lines += ['DOMAIN-SUFFIX,' + d for d in sorted(providers)]
    lines += ['DOMAIN,' + d for d in sorted(exact)]
    if old_ips or ip_new:
        lines += ['', SEC_IP, '# 只收非共享 CDN 的独立 IP，避免误伤']
        lines += [f'IP-CIDR,{ip}/32,no-resolve' for ip in sorted(old_ips | ip_new)]
    open(TARGET, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    print(f'已写入 {TARGET}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
