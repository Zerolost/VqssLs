#!/usr/bin/env python3
"""定期体检：抽查规则里的域名还能不能解析，输出报告（不修改规则）。

用法：
  python3 tools/check_health.py                # 每个列表抽查 150 个
  python3 tools/check_health.py --sample 300
  python3 tools/check_health.py --full         # 全量检查（慢）
"""
import concurrent.futures
import glob
import json
import os
import random
import re
import sys
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def domains_of(path):
    out = []
    for line in open(path, encoding='utf-8'):
        m = re.match(r'^DOMAIN-SUFFIX,([\w.-]+)$', line.strip())
        if m:
            out.append(m.group(1))
    return out


def alive(host):
    url = 'https://1.1.1.1/dns-query?' + urllib.parse.urlencode({'name': host, 'type': 'A'})
    try:
        req = urllib.request.Request(url, headers={'accept': 'application/dns-json'})
        d = json.load(urllib.request.urlopen(req, timeout=12))
        return host, any(a.get('type') == 1 for a in d.get('Answer', []))
    except Exception:
        return host, False


def main():
    sample = 150
    if '--sample' in sys.argv:
        sample = int(sys.argv[sys.argv.index('--sample') + 1])
    full = '--full' in sys.argv

    rows = []
    for path in sorted(glob.glob(os.path.join(ROOT, 'rule/Surge/*.list'))):
        hosts = domains_of(path)
        if not hosts:
            continue
        picked = hosts if full else random.sample(hosts, min(sample, len(hosts)))
        dead = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=16) as ex:
            for host, ok in ex.map(alive, picked):
                if not ok:
                    dead.append(host)
        rows.append((os.path.basename(path), len(hosts), len(picked), dead))
        print(f'{os.path.basename(path)}: {len(hosts)} 条，抽查 {len(picked)}，失效 {len(dead)}')

    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as f:
            f.write('## 规则健康检查\n\n| 文件 | 规则数 | 抽查 | 失效 | 失效率 |\n|---|---:|---:|---:|---:|\n')
            for name, total, checked, dead in rows:
                rate = f'{len(dead) / checked * 100:.1f}%' if checked else '-'
                f.write(f'| {name} | {total} | {checked} | {len(dead)} | {rate} |\n')
            f.write('\n<details><summary>失效域名</summary>\n\n')
            for name, _, _, dead in rows:
                if dead:
                    f.write(f'**{name}**\n\n```\n' + '\n'.join(dead[:60]) + '\n```\n\n')
            f.write('</details>\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
