#!/usr/bin/env python3
"""把上游作者的规则 / 脚本 / 模块 / 重写存档到 archive/<用户名>/<仓库>/。

只做快照留档，不参与本仓库的规则生成；每个作者目录下会生成 README 记录来源、提交与许可。

用法：
  GITHUB_TOKEN=xxx python3 tools/archive_upstream.py
  python3 tools/archive_upstream.py --only blackmatrix7   # 只更新某位作者
"""
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.path.join(ROOT, 'archive')
TOKEN = os.environ.get('GITHUB_TOKEN', '')

# 作者 / 仓库 / 关注点
SOURCES = [
    ('blackmatrix7', 'ios_rule_script', 'rule'),
    ('Hackl0us', 'SS-Rule-Snippet', 'rule'),
    ('geekdada', 'surge-list', 'rule'),
    ('Orz-3', 'QuantumultX', 'rule'),
    ('scomper', 'surge-list', 'rule'),
    ('Koolson', 'Qure', 'json'),
    ('NobyDa', 'Script', 'script'),
    ('chavyleung', 'scripts', 'script'),
    ('Peng-YM', 'QuanX', 'script'),
    ('yichahucha', 'surge', 'script'),
    ('app2smile', 'rules', 'module'),
    ('fmz200', 'wool_scripts', 'module'),
    ('KOP-XIAO', 'QuantumultX', ('module', 'script')),
    ('VirgilClyne', 'GetSomeFries', 'module'),
    ('Semporia', 'TikTok-Unlock', 'module'),
    ('zqzess', 'rule_for_quantumultX', ('rule', 'module')),
    ('ddgksf2013', 'Scripts', 'script'),
    ('Tartarus2014', 'Loon-Script', ('script', 'module')),
]

# 关注的规则主题（文件名关键词）
RULE_KEYS = ('airport', 'proxy', 'node', 'subscri', 'ai', 'openai', 'claude', 'chatgpt',
             'gemini', 'media', 'stream', 'video', 'music', 'netflix', 'youtube', 'bilibili',
             'telegram', 'twitter', 'github', 'apple', 'adblock', 'ad_', 'reject', 'direct',
             'domestic', 'global', 'foreign', 'hk', 'jp', 'us')
RULE_EXT = ('.list', '.lsr', '.conf', '.txt', '.yaml', '.yml', '.sgmodule', '.snippet')

MAX_RULES = 18
MAX_SCRIPTS = 12
MAX_MODULES = 12
MAX_JSON = 12
MAX_BYTES = 400 * 1024  # 单文件上限


def api(path):
    url = 'https://api.github.com' + path
    req = urllib.request.Request(url, headers={
        'Authorization': 'Bearer ' + TOKEN,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'VqssLs-Archive',
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return json.load(r), dict(r.headers)
        except urllib.error.HTTPError as e:
            if e.code in (403, 429):
                time.sleep(5 + attempt * 5)
                continue
            raise
    return None, {}


def raw(owner, repo, branch, path):
    url = f'https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{urllib.parse.quote(path)}'
    req = urllib.request.Request(url, headers={'User-Agent': 'VqssLs-Archive'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


HIGH = ('airport', 'proxy', 'node', 'subscri', 'openai', 'chatgpt', 'claude', 'gemini',
        'ai.', 'adblock', 'reject')
MID = ('stream', 'media', 'video', 'music', 'netflix', 'youtube', 'bilibili', 'telegram',
       'github', 'apple', 'spotify', 'twitter', 'disney')
LOW = ('hk', 'jp', 'us', 'sg', 'tw', 'direct', 'domestic', 'global', 'foreign')


def score(path):
    low = path.lower()
    name = low.rsplit('/', 1)[-1]
    s = 0
    for k in HIGH:
        if k in name:
            s += 10
    for k in MID:
        if k in name:
            s += 5
    for k in LOW:
        if k in name:
            s += 1
    for d in ('/surge/', '/loon/', '/qx/', '/quantumultx/'):
        if d in low:
            s += 3
    return s


CLIENTS = [('surge', '/surge/'), ('loon', '/loon/'),
           ('qx', '/quantumultx/'), ('qx', '/quantumult/'), ('qx', '/qx/'),
           ('clash', '/clash/')]


def client_of(path):
    low = path.lower()
    for name, token in CLIENTS:
        if token in low:
            return name
    return 'other'


def pick_multiclient(paths):
    """同一个主题尽量把 Surge / Loon / QX 三个版本都留下。"""
    groups = {}
    for p in paths:
        stem = p.rsplit('/', 1)[-1].lower()
        groups.setdefault(stem, []).append(p)

    ordered = sorted(groups.items(), key=lambda kv: (-score(kv[1][0]), len(kv[0])))
    out = []
    for stem, cands in ordered:
        best = {}
        for p in sorted(cands, key=lambda x: (len(x), x)):
            c = client_of(p)
            if c in ('surge', 'loon', 'qx', 'clash') and c not in best:
                best[c] = p
        for c in ('surge', 'loon', 'qx', 'clash'):
            if c in best:
                out.append(best[c])
        if len(out) >= MAX_RULES * 3:
            break
    return out


def pick(paths, kind):
    out = []
    for p in paths:
        low = p.lower()
        name = low.rsplit('/', 1)[-1]
        if kind == 'rule':
            if not low.endswith(RULE_EXT):
                continue
            if 'license' in name or 'readme' in name:
                continue
            if not any(k in name for k in RULE_KEYS):
                continue
            if '/.github/' in low:
                continue
            out.append(p)
        elif kind == 'script':
            if not low.endswith('.js'):
                continue
            if 'node_modules' in low or 'min.js' in name:
                continue
            out.append(p)
        elif kind == 'json':
            if not low.endswith('.json'):
                continue
            if '/other/' not in low and not name.startswith('qurecolor'):
                continue
            out.append(p)
        else:
            if not low.endswith(('.plugin', '.sgmodule', '.snippet', '.conf', '.stoverride', '.lpx')):
                continue
            out.append(p)
    if kind == 'rule':
        picked = pick_multiclient(out)
        if not picked:
            # 文件名不是英文主题词（比如中文命名）时，直接按扩展名兜底
            fallback = [p for p in paths if p.lower().endswith(RULE_EXT)
                        and 'license' not in p.lower() and 'readme' not in p.lower()
                        and '/.github/' not in p.lower()]
            picked = pick_multiclient(fallback) or fallback[:MAX_RULES]
        return picked
    return sorted(out, key=lambda p: (len(p), p))


def archive_one(owner, repo, kind):
    meta, _ = api(f'/repos/{owner}/{repo}')
    if not meta:
        print(f'  skip {owner}/{repo} (no meta)')
        return 0
    branch = meta.get('default_branch', 'main')
    lic = (meta.get('license') or {}).get('spdx_id') or 'NOASSERTION'
    tree, _ = api(f'/repos/{owner}/{repo}/git/trees/{branch}?recursive=1')
    if not tree:
        print(f'  skip {owner}/{repo} (no tree)')
        return 0
    paths = [t['path'] for t in tree.get('tree', []) if t['type'] == 'blob']

    limit = {'rule': MAX_RULES, 'script': MAX_SCRIPTS, 'module': MAX_MODULES, 'json': MAX_JSON}[kind]
    if kind == 'rule':
        picked = pick(paths, kind)[:limit * 3]   # 三端各留一份
    else:
        picked = pick(paths, kind)[:limit]

    dest_root = os.path.join(ARCHIVE, owner, repo)
    saved = []
    total = 0
    for p in picked:
        try:
            data = raw(owner, repo, branch, p)
        except Exception:
            continue
        if len(data) > MAX_BYTES:
            continue
        dest = os.path.join(dest_root, p)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'wb') as f:
            f.write(data)
        saved.append(p)
        total += len(data)

    if not saved:
        print(f'  {owner}/{repo}: 无可存档文件')
        return 0

    lines = [f'# {owner}/{repo}', '',
             f'- 来源：https://github.com/{owner}/{repo}',
             f'- 分支：`{branch}`　快照：{time.strftime("%Y-%m-%d")}',
             f'- 许可：{lic}',
             f'- 文件数：{len(saved)}', '',
             '> 仅作留档参考，规则以上游为准；版权归原作者，详见仓库根目录 `CREDITS.md`。', '',
             '## 文件', '']
    lines += [f'- `{p}`' for p in saved]
    open(os.path.join(dest_root, 'ARCHIVE.md'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')

    # 作者级索引
    owner_md = os.path.join(ARCHIVE, owner, 'README.md')
    entry = f'- [{repo}](https://github.com/{owner}/{repo}) — {lic} — {len(saved)} 个文件'
    existing = open(owner_md, encoding='utf-8').read() if os.path.exists(owner_md) else f'# {owner}\n\n'
    if repo not in existing:
        existing = existing.rstrip() + '\n' + entry + '\n'
        open(owner_md, 'w', encoding='utf-8').write(existing)
    print(f'  {owner}/{repo}: {len(saved)} 个文件, {total // 1024} KB')
    return len(saved)


def main():
    only = None
    if '--only' in sys.argv:
        only = sys.argv[sys.argv.index('--only') + 1]
    os.makedirs(ARCHIVE, exist_ok=True)
    count = 0
    for owner, repo, kinds in SOURCES:
        if only and owner.lower() != only.lower():
            continue
        for kind in (kinds if isinstance(kinds, tuple) else (kinds,)):
            print(f'{owner}/{repo} ({kind})')
            try:
                count += archive_one(owner, repo, kind)
            except Exception as e:
                print(f'  fail: {e}')
    print(f'\n共存档 {count} 个文件')


if __name__ == '__main__':
    main()
