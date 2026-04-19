

用户不喜欢 Blueprint 风，要换 **方案 A — Terminal Console（终端原教旨）**。

回顾方案 A 的视觉语言：
- 深黑底 #0A0A0A + 磷光绿 #00FF41（主）/ 琥珀色 #FFB000（辅助）
- 全站等宽字（JetBrains Mono / IBM Plex Mono）
- ASCII 边框替代圆角和阴影：`┌─┐ │ └─┘`
- 闪烁光标 `▊`、命令提示符 `$ select signer >`
- 选中态 = 反白高亮（绿底黑字）

策略：和上次一样，**追加覆盖式重写**。这次需要把蓝图的 token 全部替换为终端 token，把蓝图的 primitive（bp-frame、bp-terminal、bp-ruler、bp-title-block）保留 DOM 结构但替换样式，新增终端特有的命令提示符、扫描线、闪烁光标。

## 改动范围
1. **src/index.css** — 完全重写为终端 token：黑底 + 磷光绿/琥珀，单字体（保留 Recursive Mono 也行，但纯终端感建议 IBM Plex Mono / JetBrains Mono），扫描线背景纹理，闪烁光标全局动画
2. **src/App.css** — 把蓝图的 .bp-* 覆盖再覆盖一层为终端样式（title-block 改为 `[ HODL@SELF-CUSTODY:~$ ]` shell prompt 风格，ruler 改为 ASCII 进度条 `[████████░░░░] 80%`）
3. **src/components/multisig/MultisigPage.css** — 选项卡片改为 ASCII 列表项，选中=反白绿底黑字，传输标签改为 `[USB]` `[QR]` 方括号纯文字风
4. **src/components/mobile/Mobile.css** — 同上
5. **Header.tsx** — 把 title block 改为 prompt + 闪烁光标；ruler 改为 ASCII 进度条（用文字字符 `█░` 或 CSS 阶梯填充）
6. **TransferMethodDisplay** 系列 — 把 `◉` 端子改为 `[*]`，箭头线改为 `─` 字符或保留 CSS 实线但加端点 `>`
7. **WalletNodeArrows** 系列 — 同上

不改 React 业务逻辑，只换视觉。重点：
- 默认进入 Dark mode（终端天生就是黑底）—— 这个改动需要在 App.tsx 里改默认主题。但用户之前明确说"移动端默认白天模式"，所以我应该保留主题切换，只是把 dark 做成终端、light 做成"打印输出"白底等宽字版本（兼容）。
- 实际上更纯粹的方案：light 也是终端风，但用浅色终端配色（cream bg + 深绿 fg），保留可读性。我采取这个方案。

## 关键视觉决策
- **字体**：Recursive 我已经加载了 variable font，可以继续用（设 MONO=1）。或者引入 JetBrains Mono 让"终端感"更纯。我选保留 Recursive 但全局强制 MONO=1，这样省一次字体加载。
- **背景纹理**：把蓝图的网格换成水平扫描线（CRT 效果）+ 微弱的暗角
- **光标**：全局 `▊` 闪烁，title 后跟一个
- **ASCII 边框**：用 1px solid border 模拟即可，关键是在角落用 `+` 字符（保留蓝图的 `.bp-frame::before/after`，把 `+` 换为 `┌┐└┘` 之一）
- **进度条 ASCII 化**：用 monospace 字符 `[████████░░░░░░░░░░░░] 80%` 渲染，每 5% 一个字符块，CSS background-image 不好做，直接 React 字符串生成
- **选中态**：纯反白（前景色背景 + 背景色文字），不要橙色描边了，更纯粹

执行。

