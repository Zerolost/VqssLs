# Surge 规则集

**这里是规则的源文件**：改规则只改这个目录，`rule/convert.py` 会生成 `rule/Loon` 与 `rule/Qx`。

一行一条，不含策略，引用时自行指定；域名规则在前，IP 规则在后。

| 文件 | 条数 | 内容 | 建议策略 |
|---|---:|---|---|
| `API.list` | 194 | AI API 中转站：OpenAI / Claude 二次转发的服务商官网与 API 端点 | `PROXY` |
| `Airport.list` | 202 | 机场与中转站：官网、订阅入口、导航与测评站 | `DIRECT` |
| `LSP.list` | 210 | 紳士漫畫、喜漫、18漫画、HAnime、JMComic、Pica 六站群 | `PROXY` |
| `Exhentai.list` | 23 | E-Hentai / ExHentai 生态：画廊、论坛、Wiki、图片 CDN、上传服、H@H | `PROXY` |
| `Simular.list` | 10 | Simular box 云端桌面与 MCP 端点 | `PROXY` |

## 引用

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Airport.list,DIRECT
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/API.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/LSP.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Exhentai.list,PROXY
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/Simular.list,PROXY
```

机场官网走 `DIRECT` 比较好：订阅管理和续费不该被代理绕一圈，也避免代理失效时进不去后台。

## 结构

每个文件都按 `# ============ 分区 ============` 划分，通常包含：

- **域名区**：`DOMAIN-SUFFIX` 为主，共用托管后缀用 `DOMAIN` 精确匹配
- **IP 区**：能确认归属的 `/32` 或小网段，全部带 `no-resolve`

## 约定

| 约定 | 原因 |
|---|---|
| 域名规则放前面 | 命中即结束，不必触发 DNS 查询 |
| IP 规则加 `no-resolve` | 避免为未解析域名查询，也避免解析失败中断整条规则链 |
| 不收 Cloudflare / Fastly 大段地址池 | 共享 IP，整段收录会误伤正常站点 |
| 托管后缀用 `DOMAIN` | `*.pages.dev`、`*.qzz.io` 这类后缀下住着大量无关站点 |

## 更新

- `Airport.list` 由 `sync-airport.yml` 每天从 Telegram `@jichang_list` 抓取新域名，DoH 校验后追加，不自动删除。
- 其余规则集按需手动维护。
- 本目录任何改动推送后，`sync-rule-formats.yml` 会自动重新生成 Loon 与 Quantumult X 版本。
