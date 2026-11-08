#!/usr/bin/env python3
"""导入 lige47/lige_icon 的图标到 icon/icons/<分类>/。

来源：https://github.com/lige47/lige_icon/tree/main/icon
处理：统一量化成 128 色 PNG（体积约为原图 1/3，平涂图标看不出差别），
      重名跳过，`xxx(1).png` 这类变体保留为 `xxx_1.png`。

用法：GITHUB_TOKEN=xxx python3 tools/import_lige.py
"""
import io
import json
import os
import re
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICON = os.path.join(ROOT, 'icon')
OUT = os.path.join(ICON, 'icons')
CATS_PATH = os.path.join(ICON, 'categories.json')
TOKEN = os.environ.get('GITHUB_TOKEN', '')
REPO = 'lige47/lige_icon'
BRANCH = 'main'

# 上游目录 → 本仓库分类
DIR_MAP = {
    '01Country': 'region',
    '02ProxySoftLogo': 'tool',
    '03CNSoft': 'app',
    '04ProxySoft': 'tool',
    '05icon': 'app',
    '06jichang': 'brand',
    'emby': 'emby',
}


def api(path):
    req = urllib.request.Request('https://api.github.com' + path, headers={
        'Authorization': 'Bearer ' + TOKEN,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'VqssLs-Import',
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def fetch(path):
    url = f'https://raw.githubusercontent.com/{REPO}/{BRANCH}/{urllib.parse.quote(path)}'
    req = urllib.request.Request(url, headers={'User-Agent': 'VqssLs-Import'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def safe_name(stem):
    s = re.sub(r'\(\d+\)$', lambda m: '_' + m.group(0)[1:-1], stem)
    s = s.replace(' ', '_').replace('/', '_').replace('\\', '_')
    s = re.sub(r'[<>:"|?*]', '_', s)
    return s.strip('_')


def main():
    cats = json.load(open(CATS_PATH, encoding='utf-8'))
    tree = api(f'/repos/{REPO}/git/trees/{BRANCH}?recursive=1')
    paths = [t['path'] for t in tree['tree']
             if t['type'] == 'blob' and t['path'].startswith('icon/') and t['path'].lower().endswith('.png')]
    print(f'上游图标 {len(paths)} 个')

    jobs = []
    for p in paths:
        parts = p.split('/')
        if len(parts) < 3:
            continue
        up_dir, fname = parts[1], parts[-1]
        cat = DIR_MAP.get(up_dir)
        if not cat:
            continue
        name = safe_name(fname[:-4])
        jobs.append((p, cat, name))

    existing = set()
    for base, _, files in os.walk(OUT):
        for f in files:
            if f.endswith('.png'):
                existing.add(f[:-4].lower())

    added = skipped = failed = 0
    size_before = 0
    size_after = 0

    def work(job):
        p, cat, name = job
        if name.lower() in existing:
            return ('skip', 0, 0)
        try:
            data = fetch(p)
            im = Image.open(io.BytesIO(data)).convert('RGBA')
            if max(im.size) < 256:
                # 小图放大到 256 会糊，保持原尺寸
                pass
            buf = io.BytesIO()
            im.convert('P', palette=Image.ADAPTIVE, colors=128).save(buf, 'PNG', optimize=True)
            d = os.path.join(OUT, cat)
            os.makedirs(d, exist_ok=True)
            with open(os.path.join(d, name + '.png'), 'wb') as f:
                f.write(buf.getvalue())
            return ('add', name, cat, len(data), len(buf.getvalue()))
        except Exception as e:
            return ('fail', name, str(e))

    with ThreadPoolExecutor(max_workers=8) as ex:
        for r in ex.map(work, jobs):
            if r[0] == 'add':
                _, name, cat, a, b = r
                added += 1
                size_before += a
                size_after += b
                cats[name] = cat
            elif r[0] == 'skip':
                skipped += 1
            else:
                failed += 1

    json.dump(cats, open(CATS_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
    print(f'新增 {added}，跳过重名 {skipped}，失败 {failed}')
    print(f'体积 {size_before // 1024} KB → {size_after // 1024} KB')


if __name__ == '__main__':
    main()
