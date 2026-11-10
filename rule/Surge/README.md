# VqssLs Surge 规则集

由 Surge 主配置中的内联规则整理下沉而来，供 `RULE-SET` 直接引用。

| 文件 | 规则数 | 用途 |
| --- | --- | --- |
| `VqssLs_AdBlock.list` | 625 | 广告 / 追踪域名（REJECT） |
| `VqssLs_Direct.list` | 13 | 指定直连 |
| `VqssLs_Apple.list` | 2043 | Apple 服务 |
| `VqssLs_Microsoft.list` | 781 | Microsoft / Office / 游戏 |
| `VqssLs_Google.list` | 1121 | Google 全家桶 |
| `VqssLs_YouTube.list` | 187 | YouTube |
| `VqssLs_Netflix.list` | 34 | Netflix |
| `VqssLs_Disney.list` | 248 | Disney+ |
| `VqssLs_Spotify.list` | 38 | Spotify |
| `VqssLs_BiliBili.list` | 118 | 哔哩哔哩 |
| `VqssLs_Telegram.list` | 26 | Telegram |
| `VqssLs_Twitter.list` | 27 | X / Twitter |
| `VqssLs_Instagram.list` | 76 | Instagram |
| `VqssLs_Facebook.list` | 482 | Facebook / Meta |
| `VqssLs_TikTok.list` | 60 | TikTok |
| `VqssLs_GitHub.list` | 66 | GitHub |
| `VqssLs_AI.list` | 391 | OpenAI / Claude / Gemini / Copilot 等 AI 服务 |
| `VqssLs_Game.list` | 298 | Steam / Epic / PlayStation / Xbox / Nintendo |
| `VqssLs_Streaming.list` | 2 | 其他流媒体 |
| `VqssLs_ChinaApps.list` | 6334 | 国内 App 与服务 |
| `VqssLs_Global.list` | 5985 | 未分类 / 走代理兜底 |

合计 18955 条。

## 引用

```ini
RULE-SET,https://raw.githubusercontent.com/Zerolost/VqssLs/main/rule/Surge/VqssLs_Global.list,漏网之鱼
```

顺序建议：广告 → 国内直连 → 应用与流媒体分流 → 漏网之鱼。
