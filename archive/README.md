# 上游存档

社区作者的规则、脚本、模块与重写的**快照**，按 `作者/仓库/` 分类存放。

```
archive/
  blackmatrix7/
    ios_rule_script/
      ARCHIVE.md          ← 来源、分支、快照日期、许可、文件清单
      rule/Surge/...       ← 原样保留上游目录结构
      rule/Loon/...
      rule/QuantumultX/...
  chavyleung/
    scripts/...
  ...
```

## 说明

- **只是留档**：这里的文件不参与本仓库的规则生成，也不会随上游更新，需要最新版请直接访问上游。
- **版权归原作者**：目录内保留原始文件内容，作者、仓库、许可见各自 `ARCHIVE.md` 与根目录 [`CREDITS.md`](../CREDITS.md)。
- **按作者分目录**：一个作者的多个仓库各自一个子目录，作者级索引在同级 `README.md`。
- 如果原作者不希望被收录，开 issue 说明即可删除。

## 三端覆盖

规则按主题抓取，同一个主题会尽量把 **Surge / Loon / Quantumult X / Clash** 四个版本都留下，
上游只有某一端时则保留现有版本。

| 类型 | 扩展名 | 数量上限 |
|---|---|---:|
| 规则 | `.list` `.lsr` `.conf` `.txt` `.sgmodule` `.snippet` | 18 个主题 |
| 脚本 | `.js` | 12 |
| 模块/重写 | `.plugin` `.lpx` `.sgmodule` `.snippet` `.conf` `.stoverride` | 12 |
| 图标 JSON | `.json`（Qure） | 12 |

## 重新抓取

```sh
GITHUB_TOKEN=xxx python3 tools/archive_upstream.py            # 全部更新
GITHUB_TOKEN=xxx python3 tools/archive_upstream.py --only blackmatrix7
python3 tools/gen_credits.py                                  # 更新 CREDITS.md
```

抓取范围由 `tools/archive_upstream.py` 顶部的 `SOURCES` 决定，新增作者只需加一行
`('用户名', '仓库名', 'rule' | 'script' | 'module' | 'json' | ('rule', 'module'))`。
