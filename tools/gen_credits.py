#!/usr/bin/env python3
"""根据 archive/ 的实际内容生成 CREDITS.md。"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.path.join(ROOT, 'archive')

# 作者 → (显示名, 一句话说明)
META = {
    'blackmatrix7': ('blackmatrix7', 'Surge / Loon / QX / Clash 全平台规则集，按 App 分类'),
    'Hackl0us': ('Hackl0us', 'SS-Rule-Snippet 规则片段，Surge / Quantumult / Loon 三份'),
    'geekdada': ('geekdada', 'surge-list，AI 与流媒体分流'),
    'scomper': ('scomper', 'surge-list，常用规则整理'),
    'Orz-3': ('Orz-3', 'Quantumult X 规则与配置'),
    'zqzess': ('zqzess', 'rule_for_quantumultX，规则 + 模块，每周自动更新'),
    'Koolson': ('Koolson', 'Qure 图标库，图标分类 JSON'),
    'NobyDa': ('NobyDa', 'Script，签到与工具箱脚本'),
    'chavyleung': ('chavyleung', 'scripts，各类 App 签到脚本'),
    'Peng-YM': ('Peng-YM', 'QuanX，QX 任务脚本'),
    'yichahucha': ('yichahucha', 'surge，Surge / QX 脚本'),
    'Tartarus2014': ('Tartarus2014', 'Loon-Script，Loon 脚本与插件'),
    'app2smile': ('app2smile', 'rules，Loon 插件与 QX 重写'),
    'fmz200': ('fmz200', 'wool_scripts，插件与重写合集'),
    'KOP-XIAO': ('KOP-XIAO', 'QuantumultX，QX 重写、脚本与配置'),
    'VirgilClyne': ('VirgilClyne', 'GetSomeFries，三端通用模块组件'),
    'Semporia': ('Semporia', 'TikTok-Unlock，三端解锁模块'),
    'ddgksf2013': ('ddgksf2013', 'Scripts，常用 JS 脚本'),
}

NOT_ARCHIVED = [
    ('lhie1', 'Rules', '经典 Surge / Loon 规则整理，API 访问受限未存档，仅作参考'),
]


def count(repo_dir):
    n = 0
    exts = {}
    for base, _, files in os.walk(repo_dir):
        for f in files:
            if f == 'ARCHIVE.md':
                continue
            n += 1
            e = f.rsplit('.', 1)[-1].lower() if '.' in f else '-'
            exts[e] = exts.get(e, 0) + 1
    return n, exts


def main():
    rows = []
    for owner in sorted(os.listdir(ARCHIVE)):
        odir = os.path.join(ARCHIVE, owner)
        if not os.path.isdir(odir) or owner.startswith('.'):
            continue
        for repo in sorted(os.listdir(odir)):
            rdir = os.path.join(odir, repo)
            if not os.path.isdir(rdir):
                continue
            n, exts = count(rdir)
            if not n:
                continue
            kinds = ', '.join(f'{e}' for e, _ in sorted(exts.items(), key=lambda kv: -kv[1])[:4])
            rows.append((owner, repo, n, kinds))

    lines = ['# 致谢', '',
             '本仓库的规则、脚本、模块和图标大量参考了社区公开项目。',
             '以下项目按**用户名分类**快照在 [`archive/`](archive)，仅供本地留档与对照，版权归原作者，使用时请以各上游仓库为准。',
             '',
             '| 作者 | 仓库 | 文件 | 内容 |',
             '|---|---|---:|---|']
    for owner, repo, n, kinds in rows:
        desc = META.get(owner, ('', ''))[1]
        lines.append(f'| [{owner}](https://github.com/{owner}) | [{repo}](https://github.com/{owner}/{repo}) | {n} | {desc} |')

    if NOT_ARCHIVED:
        lines += ['', '## 其他参考', '']
        for owner, repo, desc in NOT_ARCHIVED:
            lines.append(f'- [{owner}/{repo}](https://github.com/{owner}/{repo})：{desc}')

    lines += ['- [simple-icons](https://simpleicons.org)、[Iconify](https://iconify.design)：图标集里的品牌矢量图标。',
              '- [TypingMind](https://custom.typingmind.com)：AI 模型与厂商图标。',
              '',
              '## 关于存档', '',
              '- 存档是**某一时点的快照**，不会跟随上游更新，也不参与本仓库的规则生成。',
              '- 每个作者目录有 `README.md`，每个仓库目录有 `ARCHIVE.md`，记录来源、分支、快照日期与许可。',
              '- 如果原作者不希望被收录，开个 issue 说明，会立刻删除对应目录。', '']

    open(os.path.join(ROOT, 'CREDITS.md'), 'w', encoding='utf-8').write('\n'.join(lines))
    print(f'CREDITS.md: {len(rows)} 个仓库')


if __name__ == '__main__':
    main()
