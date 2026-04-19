

# 方案 C — Architectural Blueprint 实施计划

把整个网站重构为一张"自托管系统蓝图"。用户不是在选 UI，而是在**绘制属于自己的安全架构图**。

---

## 一、设计 Token 重构（`src/index.css`）

替换当前的 Paper × Ink × Signal 系统为 **Blueprint × Drafting × Signal**：

```text
Light（草稿纸模式 / 默认）         Dark（蓝图模式 / 主打）
─────────────────────────         ─────────────────────────
背景  奶白 #F5F1E8 网格底         背景  普鲁士蓝 #0E2A47 网格底
线条  深褐 #3A2E1F 0.5px          线条  白 #F4F4F0 0.5px
辅助  浅褐 30% alpha               辅助  青 #6FB3D2 30% alpha
信号  比特币橙 #F7931A             信号  比特币橙 #FFB347
高亮  奶黄填充                     高亮  白色填充 / 蓝底反白
```

- 全局背景叠加 **24px × 24px 网格 SVG**（细线 + 每 5 格一条加粗）
- 引入坐标字号系统：`H1 = 标注尺寸字`、`H2 = 模块标题字`、`正文 = 注释字`
- 新增字体：**Recursive Mono**（Google Fonts）替代 JetBrains Mono，线条更接近技术制图

---

## 二、组件视觉改造清单

### 1. 三列容器 → 蓝图分区
- 每列变成一个标注框：左上角 `MODULE A / SIGNER`、`MODULE B / WALLET`、`MODULE C / NODE`
- 框边为 1px 实线 + 四角小十字标记 `+`
- 列间增加比例尺 `├──── 1:1 ────┤`

### 2. 选项卡片 → 工程零件图
- 每个 signer/wallet/node 用线框风格呈现：1px 边框、零阴影、零圆角
- 左侧保留 logo（去色 / 描边化处理 via `filter: grayscale(1) contrast(1.2)`）
- 右侧加技术标注 `// air-gapped`、`// open-source`
- 选中态 = **底色翻转**（深蓝底白字 / 白底深蓝字）+ 四角十字变橙色

### 3. 数据传输箭头 → 真实接线图
- 当前的方向箭头改为**带接口符号的连线**：`◉═══[ USB ]═══◉`、`◉╌╌╌[ QR ]╌╌╌◉`
- QR 用虚线（无线/光学），USB/SD 用实线（物理），蓝牙/NFC 用点线
- 连线两端加端子符号 `◉ / ◍ / ▣`
- 多签时多条线汇聚到 wallet，呈现真实多输入接线感

### 4. 进度条 → 工程进度尺
- 横向标尺样式：刻度 + 数字 `0  20  40  60  80  100  120`
- 当前进度用橙色三角游标 `▼` 指示
- 满配位置（120/130/150）标 `◉ OPTIMAL`

### 5. 底部 Feature Dock → 规格表（Spec Sheet）
- 改为表格风格：左列 attribute、右列 value
- 特性列表前缀改为 `[+] / [-] / [!]` 替代 emoji
- 标题改为 `SPECIFICATION — COLDCARD MK4`

### 6. Header → 图纸标题栏（Title Block）
- 模仿建筑图纸右下角的 title block：
  ```
  ┌─────────────────────────────────────┐
  │ HODL — SELF-CUSTODY BLUEPRINT       │
  │ SHEET 01/01    SCALE 1:1    REV.A   │
  └─────────────────────────────────────┘
  ```
- 语言切换 / FAQ / 主题切换以小图标排布在 title block 右侧

### 7. FAQ 抽屉 → 技术说明文档
- 标题 `TECHNICAL NOTES`
- 每个 Q&A 编号 `§01 / §02`
- 保留 Noto Serif 衬线字带来"文档感"

---

## 三、移动端同步

- 保持白天模式 + 草稿纸底
- 卡片改为线框零件图风格（去除阴影 / 直角 / 1px 实线）
- bottom sheet 顶部加 `─── DRAWER · MODULE A ───` 制图风分隔线
- 进度条采用同款工程标尺

---

## 四、文件改动范围

| 文件 | 改动 |
|---|---|
| `src/index.css` | 设计 token 全量替换 + 网格背景 + 字体引入 |
| `src/App.css` | header / 进度条 / 三列容器 → 蓝图风 |
| `src/components/multisig/MultisigPage.css` | 选项卡片 / 传输标签 / dock → 蓝图风 |
| `src/components/mobile/Mobile.css` | 移动端同步 |
| `src/components/Header.tsx` | 改为 title block 结构 |
| `src/components/shared/TransferMethodDisplay.tsx` | 接口符号化 |
| `src/components/multisig/TransferMethodDisplay.tsx` | 接口符号化 |
| `index.html` | 引入 Recursive Mono 字体 |

---

## 五、分阶段落地（建议）

**P1 基础层**（1 步完成）
设计 token + 网格背景 + 字体 + body 全局样式

**P2 结构层**
header title block + 三列模块标注框 + 进度尺

**P3 细节层**
选项卡片线框化 + 接线图传输方式 + dock 规格表

**P4 移动端 + FAQ**
移动端同步 + FAQ 技术文档化

---

## 六、风险与取舍

- **可读性**：深蓝底长时间阅读有疲劳风险 → 默认仍为浅色草稿纸底，深色模式才进入"蓝图态"
- **字体加载**：新增 Recursive Mono 会增加 ~30KB → 用 `font-display: swap` 避免阻塞
- **国际化**：所有英文制图标注（MODULE / SHEET / SCALE）保留英文不翻译，强化"工程图纸"气质（与项目"中文沟通、英文代码/网站内容"偏好一致）

确认后我会按 P1 → P4 顺序落地。

