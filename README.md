# VqssLs

自用的 [Surge](https://apps.apple.com/us/app/surge-5/id1442620678) / [Loon](https://apps.apple.com/us/app/loon/id1373567447) / [Quantumult X](https://apps.apple.com/us/app/quantumult-x/id1443988620) 资源库：**分流规则集**（三种格式同步）、**图标集**，以及配套的同步脚本与 GitHub Actions。

规则以 Surge 格式为准，`rule/convert.py` 自动生成 Loon 与 Quantumult X 版本；图标集是标准 Surge 图标 JSON，500+ 个图标按分类存放，新增或删除 PNG 后由 Actions 自动重建索引。

---

## 分流规则

同一份规则三个格式：Surge `.list`（不带策略）、Loon `.lsr`（不带策略）、Quantumult X `.list`（带策略）。
**改规则只改 [`rule/Surge`](rule/Surge)**，另外两份由脚本自动生成。

| 规则集 | 条数 | 内容 | 建议策略 |
|---|---:|---|---|
| API | 194 | AI API 中转站（OpenAI / Claude 二次转发的服务商官网与端点） | `PROXY` |
| Airport | 202 | 机场与中转站官网、订阅入口、导航测评站 | `DIRECT` |
| LSP | 210 | 紳士漫畫、喜漫、18漫画、HAnime、JMComic、Pica | `PROXY` |
| Exhentai | 23 | E-Hentai / ExHentai 生态（含图片 CDN、上传服、H@H） | `PROXY` |
| Simular | 10 | Simular box 云端桌面与 MCP 端点 | `PROXY` |

各客户端目录下都有说明：[`rule/Surge`](rule/Surge/README.md) · [`rule/Loon`](rule/Loon/README.md) · [`rule/Qx`](rule/Qx/README.md)

### Surge / Loon

两者格式一致，Loon 用 `.lsr` 扩展名：

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Airport.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/API.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/LSP.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Exhentai.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Simular.list,PROXY
```

### Quantumult X

```ini
[filter_remote]
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Airport.list, tag=机场, force-policy=direct, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/API.list, tag=API中转, force-policy=proxy, enabled=true
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
rule/Surge/         规则源文件（改这里）
rule/Loon/          Loon 规则（自动生成）
rule/Qx/            Quantumult X 规则（自动生成）
rule/convert.py     Surge → Loon / QX 转换脚本
icon/
  icons/<分类>/      图标源文件（PNG）
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
| `sync-rule-formats.yml` | 改动 `rule/Surge/**` | 生成 Loon 与 QX 规则并校验 |
| `sync-venera-sources.yml` | 每周一 | 同步上游漫画源 |

## 说明

- 规则与图标均为自用整理，按需取用；第三方图标版权归原作者（[Qure](https://github.com/Koolson/Qure)、[TypingMind](https://custom.typingmind.com)、simple-icons 等）。
- Quantumult X 的规则必须带策略，转换时用的是 `proxy` / `direct`，可在 `[filter_remote]` 用 `force-policy` 覆盖。
- 机场与中转站域名轮换频繁，规则会每天自动补新，但不自动删除失效条目。
