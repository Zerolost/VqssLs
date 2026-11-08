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
| `make_text_icons.py` | 为没有现成图标的协议/策略生成占位图标 |

## 新增或删除图标

1. 把 PNG 放进 `icons/`（命名用英文、驼峰或下划线，如 `IEPL_CN2.png`），或删掉不需要的。
2. 提交并推送到 `main`。
3. GitHub Actions（`.github/workflows/sync-icons.yml`）会自动重建 `icons.json` 并提交回来，无需手动改 JSON。

工作流也会在每周一自动跑一次，顺带校验：JSON 里的每个条目都有对应文件、没有重名。

## 图标来源

- [Qure](https://github.com/Koolson/Qure)：主体彩色图标集（MIT 授权，保留原作者署名）
- 自绘占位图标：协议名（SS / VM / VL / TR / H2 / TUIC …）、策略组名（Airport / Transit / Direct …）
