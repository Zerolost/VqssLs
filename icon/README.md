# 图标集

Surge 图标集，501 个 256×256 PNG，按分类存放。`icons.json` 是标准 Surge 图标 JSON，可直接引用。

```
https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons.json
```

![预览](preview.jpg)

## 用法

```ini
[Proxy Group]
🇭🇰 香港 = select, policy-path=..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/region/HK.png
🤖 ChatGPT = select, ..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/ai/OpenAI.png
```

规则行也可以带图标：`DOMAIN-SUFFIX,example.com,Proxy,icon-url=...`

图标名就是文件名去掉 `.png`，可在 `icons.json` 里查全部可用名字。

## 分类

| 目录 | 数量 | 内容 |
|---|---:|---|
| `ai/` | 123 | AI 厂商、模型、客户端与生成工具 |
| `media/` | 101 | 影音与流媒体 |
| `app/` | 80 | 应用与游戏 |
| `policy/` | 67 | 策略、机场、线路标识 |
| `region/` | 63 | 国家与地区 |
| `service/` | 24 | 平台服务 |
| `brand/` | 15 | 机场品牌 |
| `protocol/` | 14 | 代理协议 |
| `server/` | 11 | 线路类型与网络 |
| `tool/` | 3 | 工具 |
| `other/` | — | 未归类 |

分类由 `categories.json` 决定（图标名 → 目录），生成脚本按它落盘。

## 文件说明

| 文件 | 说明 |
|---|---|
| `icons/<分类>/*.png` | 图标源文件 |
| `icons.json` | 自动生成的 Surge 图标索引（`name` + `url`） |
| `categories.json` | 图标名到分类目录的映射 |
| `build_icons.py` | 递归扫描 `icons/` 重建 `icons.json`；不带参数时会先从上游图标库补齐缺失图标 |
| `make_brand_icons.py` | 拉取 simple-icons / iconify 的品牌 SVG，渲染成圆角品牌图标 |
| `make_typingmind_icons.py` | 从 TypingMind 模型图标库导入 AI 厂商图标（121 个） |
| `make_text_icons.py` | 生成文字占位图标（机场 / 专线 / 中转 / 订阅 …） |

## 新增或删除图标

1. 把 PNG 放进 `icons/<分类>/`，或直接删掉不需要的。
2. 新图标名写进 `categories.json`，不写会落到 `other/`。
3. 提交推送到 `main`。
4. GitHub Actions（`sync-icons.yml`）自动重建 `icons.json` 并提交回来，同时校验「每个条目都有文件、无重名」。

## 本地生成

生成脚本需要 SVG 渲染与中文字体，只在本地跑，Actions 只负责重建 JSON：

```sh
apk add rsvg-convert font-noto-cjk        # SVG 渲染 + 中文字体
python3 make_brand_icons.py               # 品牌图标
python3 make_typingmind_icons.py          # TypingMind 模型图标
python3 make_text_icons.py                # 文字占位图标
python3 build_icons.py --rebuild          # 重建 icons.json
```

新增品牌只需在 `make_brand_icons.py` 的 `BRANDS` 里加一行：`'名称': ('si', 'simple-icons-slug', None)`，
slug 取自 [simple-icons](https://simpleicons.org)；没有品牌图标的用 `('text', '显示文字', '#底色')`。

## 来源

- [Qure](https://github.com/Koolson/Qure)：主体彩色图标集（MIT 授权，保留原作者署名）
- [TypingMind](https://custom.typingmind.com)：AI 模型与厂商图标
- [simple-icons](https://simpleicons.org) / [Iconify](https://iconify.design)：品牌矢量图标
- 自绘：协议名、策略组名、线路类型
