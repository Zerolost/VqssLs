# 图标集

Surge 用的图标集，`icons.json` 是标准 Surge 图标 JSON，可直接在策略组或规则里引用。

```
https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons.json
```

## 用法

策略组：

```ini
[Proxy Group]
🇭🇰 香港 = select, policy-path=..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/HongKong.png
```

规则集里也可以写 `DOMAIN-SUFFIX,example.com,Proxy,icon-url=...`。

图标名就是 `icons/` 下的文件名（含 `.png`），可在 `icons.json` 里查全部可用名字。

## 目录结构

| 路径 | 说明 |
|---|---|
| `icons/` | 全部 PNG，256×256，透明圆角 |
| `icons.json` | 自动生成的 Surge 图标集，`name` + `url` |
| `build_icons.py` | 重建 `icons.json`；不带参数时还会从上游图标库补齐缺失图标 |
| `make_text_icons.py` | 为协议/策略生成文字占位图标（需中文字体） |
| `make_brand_icons.py` | 拉取 simple-icons / iconify 的品牌 SVG，渲染成圆角品牌图标 |

## 新增或删除图标

1. 把 PNG 放进 `icons/`（命名用英文、驼峰或下划线，如 `IEPL_CN2.png`），或删掉不需要的。
2. 提交并推送到 `main`。
3. GitHub Actions（`.github/workflows/sync-icons.yml`）会自动重建 `icons.json` 并提交回来，无需手动改 JSON。

工作流也会在每周一自动跑一次，顺带校验：JSON 里的每个条目都有对应文件、没有重名。

## 图标来源

- [Qure](https://github.com/Koolson/Qure)：主体彩色图标集（MIT 授权，保留原作者署名）
- 自绘占位图标：协议名（SS / VM / VL / TR / H2 / TUIC …）、策略组名（Airport / Transit / Direct …）

## 本地生成图标

品牌图标和文字图标需要额外依赖，只在本地生成，GitHub Actions 只负责重建 JSON：

```sh
apk add rsvg-convert font-noto-cjk        # SVG 渲染 + 中文字体
python3 make_brand_icons.py               # 品牌图标（OpenAI / Claude / Gemini / DeepSeek …）
python3 make_text_icons.py                # 文字占位图标（机场 / 专线 / 中转 / 订阅 …）
python3 build_icons.py --rebuild          # 重建 icons.json
```

新增品牌只需在 `make_brand_icons.py` 的 `BRANDS` 里加一行：`'名称': ('si', 'simple-icons-slug', None)`，
slug 取自 [simple-icons](https://simpleicons.org)；没有品牌图标的用 `('text', '显示文字', '#底色')`。
