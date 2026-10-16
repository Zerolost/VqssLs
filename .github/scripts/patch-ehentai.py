import json
from pathlib import Path

root = Path(__file__).resolve().parents[2]
path = root / 'Venera' / 'sources' / 'ehentai.js'
text = path.read_text(encoding='utf-8')
replacements = {
  'version = "1.2.0"': 'version = "1.2.1"',
  'url = "https://cdn.jsdelivr.net/gh/venera-app/venera-configs@main/ehentai.js"': 'url = "https://cdn.jsdelivr.net/gh/Zerolost/VqssLs@main/Venera/sources/ehentai.js"',
  'this.apikey': 'this.apiKey',
  "if(this.apiKey[0]": "if(this.apiKey && this.apiKey[0]",
}
for old, new in replacements.items():
  text = text.replace(old, new)
path.write_text(text, encoding='utf-8')
index_path = root / 'Venera' / 'venera-next-all-sources.json'
items = json.loads(index_path.read_text(encoding='utf-8'))
for item in items:
  if item.get('name') == 'ehentai':
    item['version'] = '1.2.1'
    item['description'] = 'e-hentai / exhentai 源；支持登录、搜索、详情、章节、图片和收藏'
index_path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('patched ehentai.js to v1.2.1')
