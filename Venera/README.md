# VeneraNext 源列表

源列表地址：

`https://cdn.jsdelivr.net/gh/Zerolost/VqssLs@main/Venera/venera-next-all-sources.json`

`Venera/sources/` 保存上游源的镜像。GitHub Actions 会定期从 `venera-app/venera-configs` 同步，并把源内的更新地址统一改为本仓库地址。

## 修正源站新地址

编辑 `Venera/address-overrides.json`，按文件名添加精确文本替换：

```json
{
  "sources": {
    "example.js": [
      {
        "find": "https://old.example.com",
        "replace": "https://new.example.com",
        "bumpVersion": true
      }
    ]
  }
}
```

提交后可在 Actions 手动运行 `Sync Venera sources`，也会按计划自动运行。每次修正源地址时应将 `bumpVersion` 设为 `true`，让 VeneraNext 识别更新。
