# Quantumult X 规则集

Quantumult X 用**小写关键字**，并且每条规则都要带策略。由 `rule/convert.py` 从 `rule/Surge` 转换而来。

| 文件 | 条数 | 内容 | 默认策略 |
|---|---:|---|---|
| `API.list` | 194 | AI API 中转站 | `proxy` |
| `Airport.list` | 202 | 机场与中转站 | `direct` |
| `Exhentai.list` | 23 | E-Hentai / ExHentai 生态 | `proxy` |
| `LSP.list` | 210 | 紳士漫畫、喜漫、18漫画、HAnime、JMComic、Pica | `proxy` |
| `Simular.list` | 10 | Simular box | `proxy` |
| `Music.list` | — | 自用音乐规则 | `Music` |
| `txsp.list` | — | 腾讯视频去广告 | `reject` |

## 引用

```ini
[filter_remote]
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Airport.list, tag=机场, force-policy=direct, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/API.list, tag=API中转, force-policy=proxy, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/LSP.list, tag=站点群, force-policy=proxy, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Exhentai.list, tag=ExHentai, force-policy=proxy, enabled=true
https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Qx/Simular.list, tag=Simular, force-policy=proxy, enabled=true
```

`force-policy` 可以覆盖文件里的策略；策略名换成你自己的（如 `节点选择`、`香港`）。

## 类型对照

| Surge | Quantumult X |
|---|---|
| `DOMAIN` | `host` |
| `DOMAIN-SUFFIX` | `host-suffix` |
| `DOMAIN-KEYWORD` | `host-keyword` |
| `IP-CIDR` | `ip-cidr`（`no-resolve` 保留） |
| `IP-CIDR6` | `ip6-cidr` |
| `GEOIP` | `geoip` |

## 更新

由 `rule/convert.py` 从 `rule/Surge` 生成，改规则请改 Surge 那份，Actions 会自动同步。
