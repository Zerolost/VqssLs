#!/usr/bin/env python3
"""生成图标预览图：icon/preview.jpg（分类图标）+ icon/preview-appstore.jpg（App Store 抽样）。"""
import json
import os
import random
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICON = os.path.join(ROOT, 'icon')
OUT = os.path.join(ICON, 'icons')
FONT = '/usr/share/fonts/noto/NotoSansCJK-Bold.ttc'

LABELS = [('ai', 'AI 厂商与模型'), ('media', '影音流媒体'), ('app', '应用与游戏'),
          ('region', '地区'), ('policy', '策略与图标'), ('service', '服务'),
          ('protocol', '协议'), ('server', '线路与服务器'), ('brand', '机场品牌'),
          ('tool', '工具与软件'), ('emby', 'Emby 服务器'), ('other', '其它')]
CELL, PAD, COLS, HEAD = 64, 6, 20, 30


def font(size):
    try:
        return ImageFont.truetype(FONT, size, index=2)
    except Exception:
        return ImageFont.load_default(size=size)


def sheet(rows, path):
    width = COLS * (CELL + PAD) + PAD
    height = sum(HEAD + ((len(fs) + COLS - 1) // COLS) * (CELL + PAD) + PAD for _, fs in rows)
    img = Image.new('RGB', (width, height), (248, 249, 251))
    d = ImageDraw.Draw(img)
    f = font(20)
    y = 0
    for label, files in rows:
        d.rectangle([0, y, width, y + HEAD], fill=(226, 232, 240))
        d.text((PAD + 6, y + 5), f'{label} ({len(files)})', font=f, fill=(30, 41, 59))
        y += HEAD
        for i, p in enumerate(files):
            x = PAD + (i % COLS) * (CELL + PAD)
            yy = y + (i // COLS) * (CELL + PAD)
            im = Image.open(p).convert('RGBA').resize((CELL, CELL), Image.LANCZOS)
            img.paste(im, (x, yy), im)
        y += ((len(files) + COLS - 1) // COLS) * (CELL + PAD) + PAD
    img.save(path, quality=84, optimize=True)
    return img.size, os.path.getsize(path) // 1024


def main():
    groups = {}
    for base, _, files in os.walk(OUT):
        rel = os.path.relpath(base, OUT).replace(os.sep, '/')
        cat = rel.split('/')[0]
        for f in files:
            if f.endswith('.png'):
                groups.setdefault(cat, []).append(os.path.join(base, f))

    LIMIT = 120
    rows = []
    for key, label in LABELS:
        files = sorted(groups.get(key, []))
        if not files:
            continue
        shown = files[:LIMIT]
        text = label if len(files) <= LIMIT else f'{label} · 显示 {LIMIT} / 共 {len(files)}'
        rows.append((text, shown))
    print('preview.jpg', sheet(rows, os.path.join(ICON, 'preview.jpg')))

    app = sorted(groups.get('appstore', []))
    random.seed(11)
    sample = random.sample(app, min(400, len(app)))
    print('preview-appstore.jpg', sheet([(f'App Store 抽样（共 {len(app)} 个）', sample)],
                                        os.path.join(ICON, 'preview-appstore.jpg')))


if __name__ == '__main__':
    main()
