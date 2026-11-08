#!/usr/bin/env python3
"""把 rule/Surge 下的规则集转换成 Loon / Quantumult X 格式。

- Loon 的远程规则列表不带策略，内容与 Surge 一致，仅扩展名不同（.lsr）
- Quantumult X 用小写关键字，且每条要带策略：host-suffix, example.com, proxy

用法：python3 rule/convert.py
"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SURGE = os.path.join(ROOT, 'Surge')
LOON = os.path.join(ROOT, 'Loon')
QX = os.path.join(ROOT, 'Qx')

# 文件 → QX 策略（机场官网走直连，其余走代理）
POLICY = {
    'API': 'proxy',
    'Airport': 'direct',
    'Exhentai': 'proxy',
    'LSP': 'proxy',
    'Simular': 'proxy',
}

QX_TYPE = {
    'DOMAIN': 'host',
    'DOMAIN-SUFFIX': 'host-suffix',
    'DOMAIN-KEYWORD': 'host-keyword',
    'DOMAIN-WILDCARD': 'host-wildcard',
    'IP-CIDR': 'ip-cidr',
    'IP-CIDR6': 'ip6-cidr',
    'GEOIP': 'geoip',
    'IP-ASN': 'ip-asn',
    'USER-AGENT': 'user-agent',
}


def convert_line(line, policy):
    """Surge 行 → QX 行；无法转换返回 None。"""
    s = line.strip()
    if not s or s.startswith('#') or s.startswith(';') or s.startswith('//'):
        return None
    parts = [p.strip() for p in s.split(',')]
    kind = parts[0].upper()
    if kind not in QX_TYPE:
        return None
    value = parts[1]
    flags = [p for p in parts[2:] if p]
    out = f'{QX_TYPE[kind]}, {value}, {policy}'
    for f in flags:
        if f in ('no-resolve', 'force-remote-dns'):
            out += f', {f}'
    return out


def main():
    os.makedirs(LOON, exist_ok=True)
    os.makedirs(QX, exist_ok=True)
    for name in sorted(os.listdir(SURGE)):
        if not name.endswith('.list'):
            continue
        base = name[:-5]
        src = os.path.join(SURGE, name)
        text = open(src, encoding='utf-8').read()
        lines = text.splitlines()

        # Loon：与 Surge 同构，只改扩展名
        with open(os.path.join(LOON, base + '.lsr'), 'w', encoding='utf-8') as f:
            f.write(text if text.endswith('\n') else text + '\n')

        # QX：逐行转换
        policy = POLICY.get(base, 'proxy')
        out = [f'# {base} · 由 rule/convert.py 从 Surge 规则集转换，策略默认 {policy}']
        for l in lines:
            q = convert_line(l, policy)
            if q:
                out.append(q)
            elif l.strip().startswith('#'):
                out.append(l.rstrip())
        with open(os.path.join(QX, base + '.list'), 'w', encoding='utf-8') as f:
            f.write('\n'.join(out).strip() + '\n')
        print(f'{base}: {sum(1 for l in lines if l and not l.startswith("#"))} rules')


if __name__ == '__main__':
    main()
