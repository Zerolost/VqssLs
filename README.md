# VqssLs

自用的 Surge 资源库：**分流规则集**、**图标集**，以及配套的同步脚本与 GitHub Actions。

规则集按主题拆分，可直接 `RULE-SET` 引用；图标集是标准 Surge 图标 JSON，500+ 个图标按分类存放，新增或删除 PNG 后由 Actions 自动重建索引。

---

## 分流规则

全部位于 [`rule/Surge`](rule/Surge)，一行一条，不含策略，引用时自行指定。

| 规则集 | 条数 | 内容 |
|---|---:|---|
| [API.list](rule/Surge/API.list) | 194 | AI API 中转站（OpenAI / Claude 二次转发的服务商官网与端点） |
| [Airport.list](rule/Surge/Airport.list) | 202 | 机场与中转站官网、订阅入口、导航测评站 |
| [LSP.list](rule/Surge/LSP.list) | 210 | 紳士漫畫、喜漫、18漫画、HAnime、JMComic、Pica |
| [Exhentai.list](rule/Surge/Exhentai.list) | 23 | E-Hentai / ExHentai 生态（含图片 CDN、上传服、H@H） |
| [Simular.list](rule/Surge/Simular.list) | 10 | Simular box 云端桌面与 MCP 端点 |

### 引用方式

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/API.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Airport.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/LSP.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Exhentai.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Simular.list,PROXY
```

### 编写约定

- 先域名、后 IP：`DOMAIN-SUFFIX` 命中就不必再查 DNS。
- IP 规则一律带 `no-resolve`，避免为未解析的域名触发查询、或解析失败中断匹配。
- Cloudflare / Fastly 这类共享地址池不整段收录，只收能确认归属的 `/32` 或小网段，防止误伤正常站点。
- 共用托管后缀（`*.pages.dev`、`*.qzz.io`、`*.dpdns.org`、`*.cc.cd`）必须用 `DOMAIN,` 精确匹配。

---

## 图标集

```
https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons.json
```

501 个 256×256 PNG，统一「彩色圆角底 + 白色图形」，浅色底自动改用深色图形。

| 分类 | 数量 | 示例 |
|---|---:|---|
| `ai` | 123 | OpenAI、Claude、Gemini、DeepSeek、Qwen、Cohere、Groq、Midjourney |
| `media` | 101 | Netflix、YouTube、Disney+、Bilibili、Spotify、Twitch |
| `app` | 80 | Telegram、GitHub、Steam、PayPal、Notion、Discord |
| `policy` | 67 | Direct、Proxy、Reject、机场、专线、中转、订阅 |
| `region` | 63 | HK、TW、JP、SG、US、UK、DE、CN |
| `service` | 24 | Apple、Google、Amazon、Microsoft、Mail |
| `brand` | 15 | 机场品牌图标 |
| `protocol` | 14 | SS、VMess、VLESS、Trojan、Hysteria2、TUIC、WireGuard |
| `server` | 11 | IEPL、IPLC、BGP、GIA、CN2、5G、WiFi |
| `tool` | 3 | Quantumult X、Qure、Vercel |
| `other` | — | 尚未归类的图标 |

预览见 [icon/preview.jpg](icon/preview.jpg)，命名规则与新增方式见 [icon/README.md](icon/README.md)。

### 在配置里使用

```ini
[Proxy Group]
🇭🇰 香港 = select, policy-path=..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/region/HK.png
🤖 ChatGPT = select, ..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/ai/OpenAI.png
```

图标名就是 `icons.json` 里的 `name`，`url` 指向对应分类目录。

---

## 目录结构

```
rule/Surge/         Surge 规则集
icon/
  icons/<分类>/     图标源文件（PNG）
  icons.json        自动生成的 Surge 图标索引
  categories.json   图标名 → 分类的映射
  preview.jpg       全部图标预览
  build_icons.py    重建 icons.json
  make_*.py         品牌图标 / 文字图标 / TypingMind 图标生成脚本
Script/Loon/        Loon 脚本与插件
Venera/             漫画源镜像（自动同步）
.github/workflows/  自动化任务
```

## 自动化

| 工作流 | 触发 | 作用 |
|---|---|---|
| `sync-icons.yml` | 改动 `icon/icons/**`、每周一 | 重建 `icons.json` 并校验：每个条目都有文件、无重名 |
| `sync-airport.yml` | 每天 21:43 UTC | 从 Telegram `@jichang_list` 抓新机场域名，DoH 校验后追加 |
| `sync-venera-sources.yml` | 每周一 | 同步上游漫画源 |

## 说明

- 规则与图标均为自用整理，按需取用；第三方图标版权归原作者（Qure、TypingMind、simple-icons 等）。
- 机场与中转站域名轮换频繁，规则会每天自动补新，但不自动删除失效条目。
