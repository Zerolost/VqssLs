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
fixes = {
  'ykmh.js': [
    ('            temp = options[1].split("-")[0]', '            const temp = options[1].split("-")[0]')
  ],
  'manhuagui.js': [
    ('    let tmp = e.querySelector(".updateon").childNodes;\n    let update = tmp[0].replace("更新于：", "").trim();', '    let update = e.querySelector(".updateon")?.text?.replace("更新于：", "").trim() || "";'),
    ('      author,\n', ''),
    ('          recommend.push(comic);', '          if (comic != null) recommend.push(comic);'),
    ('          error(`Login expired`);\n          return;', '          throw "Login expired";')
  ],
  'manga_dex.js': [
    ("let raw = contentElement.innerHtml || '';", "let raw = contentElement.innerHTML ?? contentElement.innerHtml ?? '';")
  ],
  'copy_manga.js': [
    ('                error(`Login expired`);\n                return;', '                throw "Login expired";')
  ],
  'copy_manga_multi_accounts.js': [
    ('                error(`Login expired`);\n                return;', '                throw "Login expired";'),
    ('                error(`Login expired`);\r\n                return;', '                throw "Login expired";'),
    ('            if (results[0].status !== 200) {\n                throw `Invalid status code: ${res.status}`;', '            if (results[0].status !== 200) {\n                throw `Invalid status code: ${results[0].status}`;'),
    ('            if (results[0].status !== 200) {\r\n                throw `Invalid status code: ${res.status}`;', '            if (results[0].status !== 200) {\r\n                throw `Invalid status code: ${results[0].status}`;')
  ],
  'hot_manga.js': [
    ('throw `Invalid status code: ${res.status}`;', 'throw `Invalid status code: ${results[0].status}`;')
  ]
}
for file_name, rules in fixes.items():
  target = root / 'Venera' / 'sources' / file_name
  source = target.read_text(encoding='utf-8')
  for old, new in rules:
    source = source.replace(old, new)
  target.write_text(source, encoding='utf-8')
print('patched ehentai and static compatibility issues')
