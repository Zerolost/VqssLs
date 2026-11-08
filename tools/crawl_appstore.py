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
import time
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
ai chatgpt writing translate vpn browser notes calendar mail cloud storage scanner
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
工具 系统 优化 省电 内存 网速 测速 流量 加速 代理 梯子 订阅 节点 分享 网盘 相册 备份 同步
简历 求职 招聘 兼职 面试 课程 单词 口语 听力 题库 考研 考公 证书 笔记 思维导图 待办 日程
短视频 直播 弹幕 追剧 电影 电视剧 综艺 动漫 番剧 有声 播客 电台 相声 评书 戏曲
外卖 点餐 菜谱 生鲜 超市 便利店 优惠 返利 团购 秒杀 比价 分期 借贷 信用卡 公积金 社保
挂号 问诊 体检 经期 孕期 减肥 瑜伽 冥想 睡眠 心率 血压 血糖 步数 骑行 游泳 滑雪
机票 火车票 酒店 民宿 景点 门票 打车 代驾 租车 停车 加油 违章 导航 公交 地铁 共享单车
相机 美颜 滤镜 抠图 拼图 壁纸 头像 表情 贴纸 视频剪辑 字幕 配音 变声 混音 修音
扫描 证件 合同 发票 报销 考勤 审批 会议 白板 团队 协作 项目管理 代码 服务器 数据库
密码 保险箱 隐私 加密 清理 杀毒 拦截 骚扰 来电 短信 通讯录 备份 换机 迁移
天气 空气质量 台风 地震 潮汐 日历 倒数 纪念日 记账 预算 资产 基金 股票 期货 外汇 黄金
kindle ebook reader podcast audiobook meditation yoga diet recipe cooking travel hotel
flight train taxi parking weather alarm clock timer calculator widget wallpaper theme
photo editor selfie filter collage scanner fax printer email sms contacts dialer
antivirus cleaner booster battery file manager ftp ssh terminal database devops
crypto wallet stock trading banking insurance invoice payroll crm erp kanban
school college exam vocabulary grammar dictionary thesaurus translation
dating chat social forum community blog rss news magazine podcast radio
fitness workout running cycling swimming yoga pilates calorie sleep
shopping deal coupon cashback delivery grocery food restaurant reservation
map navigation gps transit parking fuel rental car sharing scooter
music player equalizer karaoke lyrics video editor vlog live stream
game rpg puzzle action racing sports strategy simulation card board
kids education toddler story coloring learning language math
photo vault secret folder screen recorder call recorder voice memo
""".split()

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


def fetch_json(url, retries=3):
    last = None
    for i in range(retries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception as e:
            last = e
            time.sleep(2 + i * 3)
    raise last


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

    # 1. 搜索（--no-search 时只用本地缓存，避免被 iTunes 限流）
    no_search = '--no-search' in sys.argv
    jobs = [] if no_search else [(t, c) for t in terms for c in countries]
    seen = {}
    if no_search:
        # 直接读缓存目录里已有的搜索结果
        if os.path.isdir(CACHE):
            for f in os.listdir(CACHE):
                if not f.endswith('.json'):
                    continue
                try:
                    for app in json.load(open(os.path.join(CACHE, f), encoding='utf-8')):
                        seen.setdefault(app['trackId'], app)
                except Exception:
                    pass
        print(f'仅用缓存：{len(seen)} 个 App')
    else:
        with ThreadPoolExecutor(max_workers=4) as ex:
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

    state = {'added': 0, 'failed': 0, 'total': 0}

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

    batch_size = 1200
    if '--batch' in sys.argv:
        batch_size = int(sys.argv[sys.argv.index('--batch') + 1])

    def run_batch(batch):
        with ThreadPoolExecutor(max_workers=12) as ex:
            for key, app, size in ex.map(work, batch):
                if size is None:
                    state['failed'] += 1
                    continue
                state['added'] += 1
                state['total'] += size
                cats[key] = 'appstore'
                genres = app.get('genres') or []
                index[key] = {'name': app.get('trackName', ''), 'artist': app.get('artistName', ''),
                              'country': app.get('country', ''),
                              'genre': genres[0] if genres else ''}
        # 每批落盘一次，中断也不丢进度
        json.dump(cats, open(CATS_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
        json.dump(index, open(INDEX_PATH, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
        print(f'  进度 新增 {state["added"]}，失败 {state["failed"]}，剩余 {len(remaining)}')

    remaining = todo
    while remaining:
        batch, remaining = remaining[:batch_size], remaining[batch_size:]
        run_batch(batch)

    print(f'完成：新增 {state["added"]}，失败 {state["failed"]}，体积 {state["total"] // 1024} KB')


if __name__ == '__main__':
    main()
