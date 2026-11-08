"""从 Qure / mini 图标库拉取 PNG、规范命名并生成 Surge 图标 JSON。

用法:
  python3 build_icons.py            # 从源站同步缺失图标后重建
  python3 build_icons.py --rebuild  # 只用本地已有 PNG 重建 JSON
"""
import json, os, re, sys, urllib.request, urllib.parse, concurrent.futures

ROOT = os.path.dirname(os.path.abspath(__file__))
ICON_DIR = os.path.join(ROOT, 'icons')
RAW_BASE = 'https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/'

SOURCES = [
    ('https://raw.githubusercontent.com/Koolson/Qure/master/Other/QureColor.json', 'png'),
    ('https://raw.githubusercontent.com/Orz-3/mini/master/Color/Base64.json', 'b64'),
]

# 英文别名 -> 规范命名，便于写配置时直接引用
ALIAS = {
    'Quantumult_X': 'QuantumultX', 'Quantumult_X_1': 'QuantumultX_1',
    'Telegram': 'Telegram', 'Twitter': 'Twitter', 'YouTube': 'YouTube',
    'Apple': 'Apple', 'Apple_1': 'Apple_1', 'Apple_2': 'Apple_2',
    'Direct': 'Direct', 'Proxy': 'Proxy', 'Reject': 'Reject',
    'Domestic': 'Domestic', 'Overseas': 'Overseas', 'Global': 'Global',
    'Available': 'Available', 'Static': 'Static', 'SSID': 'SSID',
    'HKMTMedia': 'HKMTMedia', 'StreamingSE': 'StreamingSE', 'Streaming': 'Streaming',
    'ChatGPT': 'ChatGPT', 'OpenAI': 'ChatGPT', 'Claude': 'Claude', 'Gemini': 'Gemini',
    'GitHub': 'GitHub', 'Google': 'Google', 'Netflix': 'Netflix', 'Spotify': 'Spotify',
    'TikTok': 'TikTok', 'Bilibili': 'Bilibili', 'Disney': 'DisneyPlus', 'DisneyPlus': 'DisneyPlus',
    'YouTubeMusic': 'YouTubeMusic', 'PayPal': 'PayPal', 'Alipay': 'Alipay', 'WeChat': 'WeChat',
    'IPLC': 'IPLC', 'IEPL': 'IEPL', 'GIA': 'GIA', 'BGP': 'BGP', 'AGA': 'AGA',
}


def norm(name):
    """统一命名：去扩展名，驼峰分段用下划线保留，非法字符替换。"""
    stem = re.sub(r'\.(png|jpe?g|webp|svg)$', '', name, flags=re.I)
    for bad in [' ', '.', '+', '/', '\\', '(', ')', '（', '）']:
        stem = stem.replace(bad, '_')
    stem = re.sub(r'_+', '_', stem).strip('_')
    return ALIAS.get(stem, stem)


def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={'User-Agent': 'VqssLs-IconSync'})
    return urllib.request.urlopen(req, timeout=timeout).read()


def load_source(src, kind):
    out = {}
    try:
        data = json.load(open(src, 'rb')) if os.path.exists(src) else json.loads(fetch(src))
    except Exception as e:
        print(f'[warn] source failed: {src} {e}', file=sys.stderr)
        return out
    for item in data.get('icons', []):
        name = item.get('name', '')
        if not name.lower().endswith('.png'):
            continue
        out[item.get('name')] = item.get('url') or item.get('base64')
    return out


def main():
    rebuild_only = '--rebuild' in sys.argv
    os.makedirs(ICON_DIR, exist_ok=True)
    existing = {norm(f): f for f in os.listdir(ICON_DIR) if f.lower().endswith('.png')}

    if not rebuild_only:
        remote = {}
        for src, kind in SOURCES:
            for k, v in load_source(src, kind).items():
                remote.setdefault(norm(k) + '.png', v)
        todo = {k: v for k, v in remote.items() if k not in existing}
        print(f'remote={len(remote)} local={len(existing)} download={len(todo)}')

        def save(item):
            fname, url = item
            try:
                data = fetch(url) if url.startswith('http') else url
                if len(data) < 100:
                    return None
                with open(os.path.join(ICON_DIR, fname), 'wb') as f:
                    f.write(data)
                return fname
            except Exception as e:
                print(f'[warn] {fname}: {e}', file=sys.stderr)
                return None

        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
            ok = sum(1 for r in ex.map(save, todo.items()) if r)
        print(f'downloaded={ok}')

    # 重建 JSON
    files = sorted(f for f in os.listdir(ICON_DIR) if f.lower().endswith('.png'))
    icons = [{'name': f, 'url': RAW_BASE + urllib.parse.quote(f)} for f in files]
    payload = {
        'name': 'Zerolost Icons',
        'description': 'Surge 图标集，新增或删除 icons/ 下的 PNG 后由 GitHub Actions 自动重建',
        'icons': icons,
    }
    with open(os.path.join(ROOT, 'icons.json'), 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f'surge icons.json: {len(icons)} icons')


if __name__ == '__main__':
    main()
