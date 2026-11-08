# 上游存档

社区作者的规则、脚本、模块与重写的**快照**，按 `作者/仓库/` 分类存放。

```
archive/
  blackmatrix7/
    ios_rule_script/
      ARCHIVE.md          ← 来源、分支、快照日期、许可、文件清单
      rule/Surge/...       ← 原样保留上游目录结构
  chavyleung/
    scripts/...
  ...
```

## 说明

- **只是留档**：这里的文件不参与本仓库的规则生成，也不会随上游更新，需要最新版请直接访问上游。
- **版权归原作者**：目录内保留原始文件内容，作者、仓库、许可见各自 `ARCHIVE.md` 与根目录 [`CREDITS.md`](../CREDITS.md)。
- **按作者分目录**：一个作者的多个仓库各自一个子目录，作者级索引在同级 `README.md`。
- 如果原作者不希望被收录，开 issue 说明即可删除。

## 重新抓取

```sh
GITHUB_TOKEN=xxx python3 tools/archive_upstream.py            # 全部更新
GITHUB_TOKEN=xxx python3 tools/archive_upstream.py --only blackmatrix7
```

抓取范围由 `tools/archive_upstream.py` 顶部的 `SOURCES` 决定，每个仓库按关键词挑文件：

| 类型 | 扩展名 | 数量上限 |
|---|---|---:|
| 规则 | `.list` `.lsr` `.conf` `.txt` `.sgmodule` `.snippet` | 18 |
| 脚本 | `.js` | 12 |
| 模块/重写 | `.plugin` `.sgmodule` `.snippet` `.conf` `.stoverride` | 12 |
| 图标 JSON | `.json`（Qure） | 12 |

规则优先取 Surge 版本，并按主题去重，避免同一个主题抓到 Clash / Loon / QX 四份。
