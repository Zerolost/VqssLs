#!/usr/bin/env python3
"""爬取 App Store 图标（多国家 × 关键词搜索）。

参考 mszhangopopop/IconLibrary 的做法：
  - 用 iTunes Search API 按关键词搜索：/search?term=&country=&entity=software&limit=200
  - 图标用 artworkUrl512 的目录，把文件名换成 `256x256bb.png` 取对应分辨率

用法：
  python3 tools/crawl_appstore.py                 # 默认 3000 个上限
  python3 tools/crawl_appstore.py --max 8000
  python3 tools/crawl_appstore.py --countries cn,us
  python3 tools/crawl_appstore.py --terms 视频,音乐   # 只跑指定关键词
"""
import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICON = os.path.join(ROOT, 'icon')
OUT = os.path.join(ICON, 'icons', 'appstore')
CATS_PATH = os.path.join(ICON, 'categories.json')
INDEX_PATH = os.path.join(ICON, 'appstore-index.json')
CACHE = '/tmp/appstore_cache'
UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'}

COUNTRIES = ['cn', 'us', 'jp', 'hk', 'tw', 'kr', 'sg', 'gb', 'de', 'fr',
             'ca', 'au', 'in', 'br', 'ru', 'th', 'vn', 'my', 'id', 'ph']

# 中文关键词覆盖国内榜单外的大量长尾 App，英文词补海外
TERMS = """社交 聊天 视频 音乐 直播 短视频 相机 修图 拍照 剪辑 漫画 小说 阅读 听书 新闻 资讯
游戏 棋牌 消除 赛车 射击 冒险 养成 卡牌 模拟 竞技 体育 健身 跑步 健康 睡眠 记账 理财 股票
购物 外卖 团购 优惠券 出行 打车 地图 导航 旅行 酒店 机票 翻译 词典 学习 教育 考试 编程
办公 文档 笔记 日历 待办 邮箱 云盘 文件 扫描 录音 会议 密码 安全 杀毒 清理 电池 桌面
壁纸 主题 输入法 浏览器 下载 播放器 投屏 遥控 智能家居 天气 时钟 计算器 记账本
AI 助手 人工智能 写作 配音 变声 识图 翻译官 VPN 加速器 游戏加速 云游戏 社区 论坛 招聘
银行 支付 保险 医疗 挂号 问诊 药店 快递 二手 房产 汽车 装修 母婴 宠物 菜谱 美食
chat photo video music game social news shopping finance travel fitness education
productivity tools weather camera map music podcast streaming dating banking crypto
ai chatgpt writing translate vpn browser notes calendar mail cloud storage scanner""".split()

GENRE_SLUG = {
    '游戏': 'Games', 'Games': 'Games',
    '娱乐': 'Entertainment', 'Entertainment': 'Entertainment',
    '社交': 'Social', 'Social Networking': 'Social',
    '摄影与录像': 'PhotoVideo', 'Photo & Video': 'PhotoVideo',
    '效率': 'Productivity', 'Productivity': 'Productivity',
    '工具': 'Utilities', 'Utilities': 'Utilities',
    '音乐': 'Music', 'Music': 'Music',
    '教育': 'Education', 'Education': 'Education',
    '财务': 'Finance', 'Finance': 'Finance',
    '生活': 'Lifestyle', 'Lifestyle': 'Lifestyle',
    '健康健美': 'Health', 'Health & Fitness': 'Health',
    '购物': 'Shopping', 'Shopping': 'Shopping',
    '旅游': 'Travel', 'Travel': 'Travel',
    '美食佳饮': 'Food', 'Food & Drink': 'Food',
    '新闻': 'News', 'News': 'News',
    '图书': 'Books', 'Books': 'Books',
    '商务': 'Business', 'Business': 'Business',
    '导航': 'Navigation', 'Navigation': 'Navigation',
    '体育': 'Sports', 'Sports': 'Sports',
    '医疗': 'Medical', 'Medical': 'Medical',
    '参考': 'Reference', 'Reference': 'Reference',
    '软件开发工具': 'Developer', 'Developer Tools': 'Developer',
    '图形和设计': 'Graphics', 'Graphics & Design': 'Graphics',
    '报刊杂志': 'Magazines', 'Magazines & Newspapers': 'Magazines',
    '天气': 'Weather', 'Weather': 'Weather',
}

MAX_ICONS = 3000
LIMIT = 200


def fetch_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def search(term, country):
    key = re.sub(r'\W+', '_', f'{country}_{term}')[:80] + '.json'
    path = os.path.join(CACHE, key)
    if os.path.exists(path):
        try:
            return json.load(open(path, encoding='utf-8'))
        except Exception:
            pass
    q = urllib.parse.urlencode({'term': term, 'country': country,
                                'entity': 'software', 'limit': LIMIT})
    try:
        d = fetch_json('https://itunes.apple.com/search?' + q)
        res = d.get('results', [])
        os.makedirs(CACHE, exist_ok=True)
        json.dump(res, open(path, 'w', encoding='utf-8'), ensure_ascii=False)
        return res
    except Exception as e:
        print(f'  [warn] {country}/{term}: {e}')
        return []


def safe_name(s):
    s = re.sub(r'[\\/:*?"<>|]', '', s)
    s = re.sub(r'\s+', '', s)
    return s[:28] or 'app'


def genre_dir(app):
    genres = app.get('genres') or []
    g = genres[0] if genres else 'Other'
    return GENRE_SLUG.get(g, 'Other')


def icon_url(app, size=256):
    base = app.get('artworkUrl512') or app.get('artworkUrl100') or ''
    if not base:
        return None
    return base.rsplit('/', 1)[0] + f'/{size}x{size}bb.png'


def download(app):
    url = icon_url(app)
    if not url:
        raise ValueError('no artwork')
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    im = Image.open(io.BytesIO(data)).convert('RGBA')
    if im.size != (256, 256):
        im = im.resize((256, 256), Image.LANCZOS)
    buf = io.BytesIO()
    im.convert('P', palette=Image.ADAPTIVE, colors=128).save(buf, 'PNG', optimize=True)
    return buf.getvalue()


def main():
    max_icons = MAX_ICONS
    if '--max' in sys.argv:
        max_icons = int(sys.argv[sys.argv.index('--max') + 1])
    countries = COUNTRIES
    if '--countries' in sys.argv:
        countries = sys.argv[sys.argv.index('--countries') + 1].split(',')
    terms = TERMS
    if '--terms' in sys.argv:
        terms = sys.argv[sys.argv.index('--terms') + 1].split(',')

    os.makedirs(OUT, exist_ok=True)
    cats = json.load(open(CATS_PATH, encoding='utf-8'))
    index = json.load(open(INDEX_PATH, encoding='utf-8')) if os.path.exists(INDEX_PATH) else {}

    # 目录里已有的图标算已导入
    for base, _, files in os.walk(OUT):
        for f in files:
            if f.endswith('.png'):
                key = f[:-4]
                index.setdefault(key, {'name': key, 'artist': '', 'country': '', 'genre': ''})
                cats.setdefault(key, 'appstore')

    # 1. 搜索
    jobs = [(t, c) for t in terms for c in countries]
    seen = {}
    with ThreadPoolExecutor(max_workers=8) as ex:
        for results in ex.map(lambda j: search(*j), jobs):
            for app in results:
                seen.setdefault(app['trackId'], app)
    print(f'搜索去重后 {len(seen)} 个 App')

    # 2. 下载
    todo = []
    for app in seen.values():
        key = f"{safe_name(app.get('trackName', ''))}_{app['trackId']}"
        if key in index:
            continue
        todo.append((key, app))
    print(f'待下载 {len(todo)}，上限 {max_icons}')
    todo = todo[:max_icons]

    added = failed = total = 0

    def work(item):
        key, app = item
        try:
            data = download(app)
            d = os.path.join(OUT, genre_dir(app))
            os.makedirs(d, exist_ok=True)
            with open(os.path.join(d, key + '.png'), 'wb') as f:
                f.write(data)
            return key, app, len(data)
        except Exception:
            return key, app, None

    with ThreadPoolExecutor(max_workers=12) as ex:
        for key, app, size in ex.map(work, todo):
            if size is None:
                failed += 1
                continue
            added += 1
            total += size
            cats[key] = 'appstore'
            genres = app.get('genres') or []
            index[key] = {'name': app.get('trackName', ''), 'artist': app.get('artistName', ''),
                          'country': app.get('country', ''),
                          'genre': genres[0] if genres else ''}

    json.dump(cats, open(CATS_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
    json.dump(index, open(INDEX_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
    print(f'新增 {added}，失败 {failed}，体积 {total // 1024} KB')


if __name__ == '__main__':
    main()
