# VqssLs

自用的代理客户端资源库：**分流规则**（Surge / Loon / Quantumult X 三端同步）、**501 个图标**，以及社区项目的**存档与致谢**。

![Surge](https://img.shields.io/badge/Surge-5-black?style=flat-square)
![Loon](https://img.shields.io/badge/Loon-✓-black?style=flat-square)
![Quantumult X](https://img.shields.io/badge/Quantumult%20X-✓-black?style=flat-square)
![rules](https://img.shields.io/badge/规则-634条-blue?style=flat-square)
![icons](https://img.shields.io/badge/图标-40250个-purple?style=flat-square)

---

## 目录

- [分流规则](#分流规则) · [图标集](#图标集) · [存档与致谢](#存档与致谢) · [工具](#工具) · [自动化](#自动化)
- [目录结构](#目录结构) · [编写约定](#编写约定)

---

## 分流规则

规则只维护 `rule/Surge` 一份，另外两端的格式由 `rule/convert.py` 生成，改一处三端同步。

| 规则集 | 条数 | 内容 | 建议策略 |
|---|---:|---|---|
| `API` | 712 | AI API 中转站：OpenAI / Claude 二次转发的服务商官网与 API 端点 | `PROXY` |
| `Airport` | 229 | 机场与中转站官网、订阅入口、导航测评站 | `DIRECT` |
| `LSP` | 210 | 紳士漫畫、喜漫、18漫画、HAnime、JMComic、Pica 六站群 | `PROXY` |
| `Exhentai` | 23 | E-Hentai / ExHentai 生态：画廊、论坛、Wiki、图片 CDN、上传服、H@H | `PROXY` |
| `Simular` | 9 | Simular box 云端桌面与 MCP 端点 | `PROXY` |

<details>
<summary><b>Surge</b></summary>

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Airport.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/API.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/LSP.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Exhentai.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Simular.list,PROXY
```
</details>

<details>
<summary><b>Loon</b></summary>

Loon 的远程规则列表不带策略，内容与 Surge 一致，扩展名为 `.lsr`。

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/Airport.lsr,DIRECT
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/API.lsr,Proxy
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/LSP.lsr,Proxy
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/Exhentai.lsr,Proxy
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/Simular.lsr,Proxy
```
</details>

<details>
<summary><b>Quantumult X</b></summary>

QX 用小写关键字且每条必带策略，转换时默认机场走 `direct`、其余走 `proxy`，可用 `force-policy` 覆盖。

```ini
[filter_remote]
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Airport.list, tag=机场, force-policy=direct, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/API.list, tag=API中转, force-policy=proxy, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/LSP.list, tag=站点群, force-policy=proxy, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Exhentai.list, tag=ExHentai, force-policy=proxy, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Simular.list, tag=Simular, force-policy=proxy, enabled=true
```
</details>

各客户端目录另有说明：[`rule/Surge`](rule/Surge/README.md) · [`rule/Loon`](rule/Loon/README.md) · [`rule/Qx`](rule/Qx/README.md)

---

## 图标集

```
https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons.json
```

40250 个图标，按用途拆成 **12 个分类集**，App Store 部分再按品类细分成 26 个子集。
全部图标见 [预览图](icon/preview.jpg)，分类与子集见 [icon/README.md](icon/README.md)。

| 分类 | 数量 | 示例 |
|---|---:|---|
| `appstore` | 38248 | App Store 图标，按 Games / Social / Productivity 等品类分目录 |
| `emby` | 557 | Emby 服务器 |
| `app` | 379 | Telegram、GitHub、Steam、PayPal、Notion、Discord |
| `brand` | 344 | 机场与代理品牌 |
| `tool` | 257 | Clash、Stash、Shadowrocket 等代理软件 |
| `region` | 125 | HK、TW、JP、SG、US、UK、DE、CN |
| `ai` | 123 | OpenAI、Claude、Gemini、DeepSeek、Qwen、Cohere、Groq |
| `media` | 101 | Netflix、YouTube、Disney+、Bilibili、Spotify |
| `policy` | 67 | Direct、Proxy、Reject、机场、专线、中转、订阅 |
| `service` | 24 | Apple、Google、Amazon、Microsoft |
| `protocol` | 14 | SS、VMess、VLESS、Trojan、Hysteria2、TUIC |
| `server` | 11 | IEPL、IPLC、BGP、GIA、CN2、5G、WiFi |

分类图标集（`icon/sets/`）：`ai` `app` `appstore` `brand` `emby` `media` `policy` `protocol` `region` `server` `service` `tool`，App Store 另有 `appstore-games`、`appstore-social` 等 26 个子集。

```ini
[Proxy Group]
🇭🇰 香港 = select, policy-path=..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/region/HK.png
🤖 ChatGPT = select, ..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/ai/OpenAI.png
🎮 游戏 = select, ..., icon-url=https://raw.githubusercontent.com/Zerolost/VqssLs/main/icon/icons/appstore/Games/王者荣耀_989673964.png
```

新增或删除 `icon/icons/<分类>/` 下的 PNG 后，Actions 会自动重建 `icons.json` 与 `sets/`。

---

## 存档与致谢

社区作者的规则、脚本、模块与重写按**用户名分类**快照在 [`archive/`](archive)，18 个仓库、约 290 个文件。

| 作者 | 内容 |
|---|---|
| blackmatrix7 | Surge / Loon / QX / Clash 全平台规则集 |
| Hackl0us | SS-Rule-Snippet，三端规则片段 |
| zqzess | 规则 + 模块，每周自动更新 |
| geekdada · scomper | Surge 规则整理 |
| Orz-3 · KOP-XIAO | Quantumult X 规则、重写与脚本 |
| NobyDa · chavyleung · Peng-YM · yichahucha · Tartarus2014 · ddgksf2013 | 签到、任务与工具箱脚本 |
| app2smile · fmz200 · VirgilClyne · Semporia | Loon 插件、Surge 模块、QX 重写 |
| Koolson | Qure 图标分类 JSON |

完整名单、仓库链接与许可见 [`CREDITS.md`](CREDITS.md)；存档说明见 [`archive/README.md`](archive/README.md)。

> 存档是某一时点的快照，不参与规则生成、不随上游更新；版权归原作者，如不希望被收录，开 issue 即删。

---

## 工具

```sh
python3 rule/convert.py                    # Surge → Loon / Quantumult X
python3 tools/lint_rules.py                # 规则检查
python3 tools/lint_rules.py --fix          # 修重复、被更宽规则覆盖的条目
GITHUB_TOKEN=xxx python3 tools/archive_upstream.py   # 抓取上游存档
python3 tools/gen_credits.py               # 重新生成 CREDITS.md
python3 icon/build_icons.py --rebuild      # 重建 icons.json 与 sets/
GITHUB_TOKEN=xxx python3 tools/import_lige.py        # 导入 lige_icon 图标
python3 tools/crawl_appstore.py --max 3000           # 爬 App Store 图标
python3 tools/sync_api_relay.py                      # 抓 API 中转站榜单
python3 tools/check_health.py --sample 150           # 规则体检
```

`lint_rules.py` 检查：语法、重复行、`DOMAIN` 被 `DOMAIN-SUFFIX` 覆盖、IP 段被更宽网段覆盖、CIDR 主机位、域名误写成 keyword。

---

## 自动化

| 工作流 | 触发 | 作用 |
|---|---|---|
| `sync-rule-formats.yml` | 改动 `rule/Surge/**` | 生成 Loon 与 QX 规则 |
| `sync-airport.yml` | 每天 21:43 UTC | 从 Telegram `@jichang_list` 抓新机场域名，校验后追加 |
| `sync-icons.yml` | 改动 `icon/icons/**`、每周一 | 重建 `icons.json` 并校验条目完整性 |
| `lint-rules.yml` | 改动 `rule/**`、`tools/**` | 规则语法与冗余检查 |
| `sync-api-relay.yml` | 每周三 | 从 API 中转站榜单抓新服务商，生成域名与 IP 规则 |
| `rule-health.yml` | 每周一 | 抽查规则域名的可解析率，输出体检报告（不改规则） |
| `sync-appstore.yml` | 每月 1 日 | 增量抓取 App Store 图标 |
| `sync-venera-sources.yml` | 每周一 | 同步上游漫画源 |

---

## 目录结构

```
rule/
  Surge/            规则源文件（改这里）
  Loon/             Loon 规则（自动生成）
  Qx/               Quantumult X 规则（自动生成）
  convert.py        Surge → Loon / QX 转换
icon/
  icons/<分类>/     40250 个图标源文件（appstore 按品类分子目录）
  sets/             12 个分类图标集 + 26 个 App Store 品类子集
  icons.json        Surge 图标索引（自动生成）
  categories.json   图标名 → 分类
  preview.jpg       全部图标预览
  build_icons.py    重建索引
  make_*.py         品牌 / 文字 / TypingMind 图标生成
archive/<作者>/<仓库>/   上游快照 + ARCHIVE.md
tools/
  lint_rules.py     规则检查
  import_lige.py    导入 lige_icon 图标
  crawl_appstore.py 爬取 App Store 图标
  archive_upstream.py  上游抓取
  gen_credits.py    生成致谢名单
Script/Loon/        Loon 脚本与插件
Venera/             漫画源镜像（自动同步）
```

---

## 编写约定

| 约定 | 原因 |
|---|---|
| 先域名、后 IP | 域名规则命中即结束，不必触发 DNS 查询 |
| IP 规则一律带 `no-resolve` | 避免为未解析域名查询，也避免解析失败中断整条规则链 |
| 不收 Cloudflare / Fastly 大段地址池 | 共享 IP，整段收录会误伤正常站点 |
| 托管后缀用 `DOMAIN,` 精确匹配 | `*.pages.dev`、`*.qzz.io` 这类后缀下住着大量无关站点 |
| 规则只改 `rule/Surge` | 另外两份由脚本生成，手改会被覆盖 |

---

## 说明

- 规则与图标为自用整理，按需取用，不保证覆盖所有场景。
- 第三方图标与规则版权归原作者，见 [`CREDITS.md`](CREDITS.md)。
- 机场与中转站域名轮换频繁，规则每天自动补新，但不自动删除失效条目。
