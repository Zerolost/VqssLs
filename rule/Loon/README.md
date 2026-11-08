# Loon 规则集

Loon 的远程规则列表**不带策略**，内容与 `rule/Surge` 完全一致，扩展名为 `.lsr`。
策略在配置里引用时指定，所以同一份文件可以被不同策略组复用。

| 文件 | 条数 | 内容 |
|---|---:|---|
| `API.lsr` | 194 | AI API 中转站 |
| `Airport.lsr` | 202 | 机场与中转站 |
| `Exhentai.lsr` | 23 | E-Hentai / ExHentai 生态 |
| `LSP.lsr` | 210 | 紳士漫畫、喜漫、18漫画、HAnime、JMComic、Pica |
| `Simular.lsr` | 10 | Simular box |

## 引用

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/Airport.lsr,DIRECT
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/API.lsr,Proxy
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/LSP.lsr,Proxy
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/Exhentai.lsr,Proxy
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Loon/Simular.lsr,Proxy
```

`DIRECT` / `Proxy` 换成你自己的策略或策略组名。

## 更新

由 `rule/convert.py` 从 `rule/Surge` 生成，改规则请改 Surge 那份，Actions 会自动同步。
