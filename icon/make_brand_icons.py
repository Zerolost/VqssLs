"""生成品牌图标：拉取 simple-icons / iconify 的 SVG，渲染成 256×256 圆角 PNG。

用法：python3 make_brand_icons.py
依赖：rsvg-convert（apk add rsvg-convert）、Pillow
"""
import json
import os
import re
import subprocess
import urllib.request
from PIL import Image, ImageDraw, ImageFont


FONT_PATH = '/usr/share/fonts/noto/NotoSansCJK-Bold.ttc'


CATS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'categories.json')


def icon_path(name):
    """按 categories.json 决定落到哪个分类目录。"""
    try:
        cats = json.load(open(CATS_PATH, encoding='utf-8'))
    except Exception:
        cats = {}
    d = os.path.join(OUT, cats.get(name, 'other'))
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, name + '.png')


def load_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size, index=2)  # index 2 = 简体中文
    except Exception:
        return ImageFont.load_default(size=size)


ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, 'icons')
TMP = '/tmp/_icon'
os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

# 名称: (来源, 标识, 兜底色)  来源 si=simple-icons（自动取品牌色）, logos=iconify logos
BRANDS = {
    'OpenAI': ('si', 'openai', None),
    'Claude': ('si', 'anthropic', None),
    'Gemini': ('si', 'googlegemini', None),
    'DeepSeek': ('si', 'deepseek', None),
    'Qwen': ('si', 'qwen', None),
    'Grok': ('logos', 'groq', '#F55036'),
    'Mistral': ('si', 'mistralai', None),
    'Ollama': ('si', 'ollama', None),
    'HuggingFace': ('si', 'huggingface', None),
    'OpenRouter': ('si', 'openrouter', None),
    'Perplexity': ('si', 'perplexity', None),
    'Poe': ('si', 'poe', None),
    'Cursor': ('si', 'cursor', None),
    'Copilot': ('si', 'githubcopilot', None),
    'OpenWebUI': ('text', 'OWUI', '#1F2937'),
    'LibreChat': ('text', 'LC', '#2B2B2B'),
    'Chatbox': ('text', 'CB', '#1E88E5'),
    'Dify': ('si', 'dify', '#1C64F2'),
    'Coze': ('si', 'coze', '#1A73E8'),
    'ComfyUI': ('text', 'CFUI', '#222222'),
    'Midjourney': ('logos', 'midjourney', '#0B0B0B'),
    'Suno': ('si', 'suno', '#111111'),
    'ElevenLabs': ('si', 'elevenlabs', '#111111'),
    'Replicate': ('si', 'replicate', '#111111'),
    'Cloudflare': ('si', 'cloudflare', None),
    'Vercel': ('si', 'vercel', None),
    'LangChain': ('si', 'langchain', '#1C3C3C'),
    'SiliconFlow': ('text', 'SF', '#6E4AFF'),
    'Moonshot': ('text', 'Kimi', '#1F1F1F'),
    'GLM': ('text', 'GLM', '#2E5BFF'),
    'Doubao': ('text', '豆包', '#4B6EF5'),
    'ERNIE': ('text', '文心', '#2932E1'),
    'OneAPI': ('text', '1', '#2B7FFF'),
    'NewAPI': ('text', 'N', '#22A06B'),
    'Relay': ('text', '中转', '#4A7BFF'),
    'API': ('text', 'API', '#0F172A'),
    'Subscription': ('text', '订阅', '#F59E0B'),
    'Speedtest': ('text', '速', '#16A34A'),
    'Node': ('text', '节点', '#475569'),
    'Anycast': ('text', 'AC', '#0EA5E9'),
    'Landing_1': ('text', '落地', '#7C5CFF'),
    'Airport_2': ('text', '专线', '#FF6A3D'),
}


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={'User-Agent': 'VqssLs-IconGen'})
    return urllib.request.urlopen(req, timeout=timeout).read()


def brand_color(slug):
    try:
        svg = fetch(f'https://cdn.simpleicons.org/{slug}').decode('utf-8', 'ignore')
        m = re.search(r'fill="#([0-9A-Fa-f]{6})"', svg)
        if m:
            return '#' + m.group(1)
    except Exception:
        pass
    return None


def get_svg(kind, key):
    if kind == 'si':
        try:
            return fetch(f'https://cdn.simpleicons.org/{key}/white').decode('utf-8', 'ignore')
        except Exception:
            return fetch(f'https://api.iconify.design/simple-icons/{key}.svg?height=200&color=white').decode('utf-8', 'ignore')
    return fetch(f'https://api.iconify.design/logos/{key}.svg?height=200').decode('utf-8', 'ignore')


def render_glyph(svg_text, path, size=168):
    svg_path = path + '.svg'
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_text)
    subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size), '-o', path, svg_path], check=True)


def build(name, kind, key, color):
    bg = color
    if kind == 'si':
        bg = brand_color(key) or color or '#333333'
    bg = bg or '#333333'
    img = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([6, 6, 250, 250], radius=58, fill=bg)
    if kind == 'text':
        size = 140 if len(key) == 1 else (108 if len(key) == 2 else (76 if len(key) == 3 else 62))
        font = load_font(size)
        box = d.textbbox((0, 0), key, font=font)
        d.text(((256 - (box[2] - box[0])) / 2 - box[0], (256 - (box[3] - box[1])) / 2 - box[1]),
               key, font=font, fill=(255, 255, 255))
    else:
        glyph = os.path.join(TMP, name + '.png')
        render_glyph(get_svg(kind, key), glyph)
        g = Image.open(glyph).convert('RGBA')
        # logos 是彩色的，统一转白以适配底色
        px = g.load()
        for y in range(g.size[1]):
            for x in range(g.size[0]):
                r, gg, b, a = px[x, y]
                if a:
                    px[x, y] = (255, 255, 255, a)
        img.paste(g, ((256 - g.size[0]) // 2, (256 - g.size[1]) // 2), g)
    img.save(icon_path(name))


if __name__ == '__main__':
    ok, fail = 0, 0
    for name, (kind, key, color) in BRANDS.items():
        try:
            build(name, kind, key, color)
            ok += 1
            print('ok  ', name)
        except Exception as e:
            fail += 1
            print('fail', name, e)
    print(f'done ok={ok} fail={fail}')