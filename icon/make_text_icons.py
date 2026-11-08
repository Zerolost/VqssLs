"""为没有现成 PNG 的服务生成文字/双字图标（蓝底白字，256x256）。"""
from PIL import Image, ImageDraw, ImageFont
import os, json


FONT_PATH = '/usr/share/fonts/noto/NotoSansCJK-Bold.ttc'


def load_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size, index=2)  # index 2 = 简体中文
    except Exception:
        return ImageFont.load_default(size=size)


OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
os.makedirs(OUT, exist_ok=True)

PALETTE = [
    ((64, 120, 255), (255, 255, 255)),   # 蓝
    ((255, 106, 61), (255, 255, 255)),   # 橙
    ((48, 176, 120), (255, 255, 255)),   # 绿
    ((124, 92, 255), (255, 255, 255)),   # 紫
    ((38, 48, 72), (255, 255, 255)),     # 深蓝灰
    ((232, 62, 96), (255, 255, 255)),    # 红
]

# 名称: 显示文字
ITEMS = {
    'Airport': 'A', 'Airport_1': '机场', 'Transit': 'T', 'Landing': '入',
    'IEPL_CN2': 'CN2', 'CN2GIA': 'GIA', 'BGP_GIA': 'BGP',
    'Proxy_Auto': 'A', 'Proxy_Select': 'S', 'Proxy_Fallback': 'F',
    'Proxy_LoadBalance': 'LB', 'Proxy_Manual': 'M',
    'Home': 'H', 'Company': 'C', 'School': 'S', 'Cellular': '5G',
    'WiFi': 'W', 'LowLatency': 'LL', 'Latency': 'ms',
    'Shadowsocks': 'SS', 'Vmess': 'VM', 'Vless': 'VL', 'Trojan': 'TR',
    'Hysteria': 'HY', 'Hysteria2': 'H2', 'Tuic': 'TUIC', 'AnyTLS': 'TLS',
    'Snell': 'SN', 'WireGuard': 'WG', 'Tailscale': 'TS', 'SOCKS5': 'S5',
    'HTTP': 'HTTP', 'Reality': 'R',
}


def build(name, text, idx):
    bg, fg = PALETTE[idx % len(PALETTE)]
    W = 256
    img = Image.new('RGBA', (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([8, 8, W - 8, W - 8], radius=56, fill=bg + (255,))
    size = 140 if len(text) <= 1 else (112 if len(text) == 2 else (84 if len(text) <= 3 else 64))
    font = load_font(size)
    box = d.textbbox((0, 0), text, font=font)
    d.text(((W - (box[2] - box[0])) / 2 - box[0], (W - (box[3] - box[1])) / 2 - box[1]), text, font=font, fill=fg)
    img.save(os.path.join(OUT, name + '.png'))


if __name__ == '__main__':
    done = 0
    for i, (name, text) in enumerate(ITEMS.items()):
        if not os.path.exists(os.path.join(OUT, name + '.png')):
            build(name, text, i)
            done += 1
    print('generated', done)