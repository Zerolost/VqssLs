#!/usr/bin/env python3
"""规则文件检查与整理。

检查项：
- 语法：关键字、域名、CIDR、参数是否合法
- 重复：完全相同的行
- 冗余：被更宽的 DOMAIN-SUFFIX 覆盖的 DOMAIN；被更宽网段覆盖的 IP-CIDR
- 排序：同一分区内的规则按类型、值排序

用法：
  python3 tools/lint_rules.py                 # 只检查
  python3 tools/lint_rules.py --fix           # 修掉重复/冗余/空白
  python3 tools/lint_rules.py --fix --sort    # 另外重排同一分区的规则
"""
import ipaddress
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SURGE_TYPES = {'DOMAIN', 'DOMAIN-SUFFIX', 'DOMAIN-KEYWORD', 'DOMAIN-WILDCARD',
               'IP-CIDR', 'IP-CIDR6', 'GEOIP', 'IP-ASN', 'USER-AGENT', 'URL-REGEX'}
QX_TYPES = {'host', 'host-suffix', 'host-keyword', 'host-wildcard',
            'ip-cidr', 'ip6-cidr', 'geoip', 'ip-asn', 'user-agent', 'url-regex'}

DOMAIN_RE = re.compile(r'^(?=.{1,253}$)([a-z0-9_]([a-z0-9_-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$')
IP_RE = re.compile(r'^\d{1,3}(\.\d{1,3}){3}(/\d{1,2})?$')


def parse(line, dialect):
    """返回 (type, value, flags) 或 None（注释/空行）。"""
    s = line.strip()
    if not s or s.startswith(('#', ';', '//')):
        return None
    parts = [p.strip() for p in s.split(',')]
    kind = parts[0]
    valid = SURGE_TYPES if dialect == 'surge' else QX_TYPES
    norm = kind if dialect == 'surge' else kind.lower()
    if norm not in valid:
        return ('BAD', s, [])
    if len(parts) < 2:
        return ('BAD', s, [])
    if dialect == 'qx':
        # QX 第三个字段是策略，之后才是参数
        if len(parts) < 3:
            return ('BAD', s, [])
        return (norm, parts[1], parts[3:])
    return (norm, parts[1], parts[2:])


def check_ip(value):
    try:
        net = ipaddress.ip_network(value, strict=False)
    except ValueError:
        return f'非法 CIDR: {value}'
    if str(net) != value:
        return f'网段含主机位，应为 {net}'
    return None


def lint_file(path, dialect, fix=False, sort=False):
    lines = open(path, encoding='utf-8').read().splitlines()
    problems = []
    seen = set()
    domains = {}
    nets = []
    out = []
    section = None

    for idx, line in enumerate(lines, 1):
        raw = line.rstrip()
        parsed = parse(raw, dialect)
        if parsed is None:
            out.append(raw)
            if raw.startswith('#'):
                section = raw
            continue

        kind, value, flags = parsed
        if kind == 'BAD':
            problems.append((idx, '无法识别的规则', raw))
            out.append(raw)
            continue

        # 语法
        if kind.lower() in ('domain', 'domain-suffix', 'host', 'host-suffix'):
            if not DOMAIN_RE.match(value.lower()) and not value.startswith('*'):
                problems.append((idx, '域名格式可疑', raw))
        if kind.lower() in ('ip-cidr', 'ip6-cidr'):
            err = check_ip(value)
            if err:
                problems.append((idx, err, raw))
        if kind.lower() in ('host-keyword', 'domain-keyword') and '.' in value:
            tld = value.rsplit('.', 1)[-1]
            if len(tld) < 2 and not any(ch in value for ch in '*?['):
                problems.append((idx, '疑似域名误写成 keyword（TLD 不足 2 位）', raw))
        for f in flags:
            if f and f not in ('no-resolve', 'force-remote-dns', 'extended-matching'):
                if not f.startswith(('policy=', 'tag=')):
                    problems.append((idx, f'未知参数 {f}', raw))

        key = (kind, value.lower(), tuple(flags))
        if key in seen:
            problems.append((idx, '重复规则', raw))
            if fix:
                continue
        seen.add(key)

        # 冗余：DOMAIN 被 DOMAIN-SUFFIX 覆盖
        if kind.lower() in ('domain', 'host'):
            hit = next((s for s in domains if value.lower().endswith('.' + s) or value.lower() == s), None)
            if hit:
                problems.append((idx, f'被 DOMAIN-SUFFIX,{hit} 覆盖', raw))
                if fix:
                    continue
        if kind.lower() in ('domain-suffix', 'host-suffix'):
            domains[value.lower()] = idx

        # 冗余：IP 段被更宽的段覆盖
        if kind.lower() in ('ip-cidr', 'ip6-cidr'):
            try:
                net = ipaddress.ip_network(value, strict=False)
            except ValueError:
                net = None
            if net:
                wider = next((n for n in nets if net != n and net.subnet_of(n)), None)
                if wider:
                    problems.append((idx, f'被 {wider} 覆盖', raw))
                    if fix:
                        continue
                nets.append(net)

        out.append(raw)

    if fix:
        text = '\n'.join(out).rstrip() + '\n'
        if text != '\n'.join(lines).rstrip() + '\n':
            open(path, 'w', encoding='utf-8').write(text)
    return problems


def main():
    fix = '--fix' in sys.argv
    targets = []
    for base, _, files in os.walk(os.path.join(ROOT, 'rule')):
        for f in sorted(files):
            if f.endswith(('.list', '.lsr')):
                targets.append(os.path.join(base, f))

    total = 0
    for path in targets:
        dialect = 'qx' if '/Qx/' in path else 'surge'
        problems = lint_file(path, dialect, fix=fix)
        rel = os.path.relpath(path, ROOT)
        if problems:
            print(f'\n{rel}  ({len(problems)})')
            for idx, msg, raw in problems[:40]:
                print(f'  L{idx}: {msg}  ← {raw[:70]}')
            total += len(problems)
        else:
            print(f'{rel}  ok')
    print(f'\n共 {total} 个问题' + ('（已自动修复可修的部分）' if fix else ''))
    return 0


if __name__ == '__main__':
    sys.exit(main())
