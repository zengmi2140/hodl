

## 用户疑问：设计改造是否会影响原有功能？

用户担心 Cypherpunk Atelier 设计改造会破坏现有的桌面端 + 移动端功能。这是一次澄清性回答，不是实施任务，无需 ask_questions，直接给出明确结论。

## 核心结论：**功能零影响，仅视觉层重构**

整个改造方案是**纯 CSS + 视觉层**的，不触碰任何业务逻辑、状态管理、数据流、交互行为。下面分维度逐一说明。

---

### 一、不会被影响的部分（100% 保留）

**1. 业务逻辑层（App.tsx）**
- 单签 / 多签模式切换逻辑
- 2-of-3 / 3-of-5 阈值切换
- 组件兼容性级联过滤（`getComponentState`、`getMultisigCompatibleSigners` 等）
- 进度计算系统（50% / 60% / 80% / 100% / 120% / 130% / 150% 全部规则保留）
- localStorage 用户偏好存储
- 多语言切换（i18n）
- 数据加载与 fallback 机制

**2. 数据结构**
- `custody-data.json`、`SLOT_COLORS` 常量、`transferMethods` 映射表全部保留
- `SLOT_COLORS` 仅替换**颜色值**（糖果色 → 矿物色），数组结构、索引、数量不变
- 类型定义（`UserPreference`、`ComponentState`、`CustodyData`）完全不动

**3. 交互行为**
- 所有点击、选中、取消选中行为不变
- 卡片的 inactive / breathing / active 三态机制保留（只是视觉表现升级）
- 兼容性灰显逻辑保留
- FAQ 抽屉的开关、Esc 关闭、Overlay 点击关闭保留

**4. 移动端**
- `useIsMobile(769)` 断点保留
- `MobileMainLayout` 整套移动端组件结构保留
- 底部抽屉（MobileBottomSheet）选择流程保留
- 移动端卡片布局、垂直数据流保留
- **移动端只继承新的颜色变量与字体**，布局结构不动

**5. 桌面端布局骨架**
- 三列布局保留
- Header + 进度条 + FAQ/Reset 按钮保留（仅视觉重设计）
- BottomFeatureDock 位置保留
- SignatureModeSelector 位置保留

---

### 二、会发生变化的部分（仅视觉/感受）

| 维度 | 变化内容 | 是否影响功能 |
|---|---|---|
| 字体 | 引入 Inter Tight / JetBrains Mono / Noto Serif SC | 否 |
| 配色 | CSS 变量值替换（paper/ink/signal） | 否 |
| 卡片样式 | 圆角→直角、阴影→边框+色带 | 否 |
| 进度条样式 | 填充条 → 刻度尺风格 | 否（计算逻辑不变） |
| 槽位颜色 | 糖果色 → 矿物色 | 否（仅 5 个颜色值替换） |
| 按钮样式 | 背景按钮 → 下划线文字按钮 | 否（onClick 不变） |
| 动效曲线 | 统一 cubic-bezier 时长 | 否 |
| Drawer 字体 | 无衬线 → 衬线（Noto Serif SC） | 否 |
| 暗色模式色调 | 蓝灰 → 碳黑 | 否（toggle 逻辑不变） |

---

### 三、唯一需要小心的两处「双向修改」

这两处涉及 TS 常量与 CSS 变量同步，但仍是**安全的非破坏性修改**：

1. **`SLOT_COLORS` 常量**（`src/App.tsx`）：替换 5 个颜色值时，需同步更新 `index.css` 的 `--slot-N-bg/border` 与 `TransferMethodDisplay.tsx` 的 `SLOT_COLORS` 常量。索引、数量、用法不变。

2. **CSS 变量名**：保留 `--primary` `--background` `--foreground` 等 shadcn 兼容变量名，仅替换值。新增 `--paper` `--ink` `--signal` 等新变量并存，避免破坏任何依赖原变量的组件。

---

### 四、风险评估与回滚策略

**风险等级：极低**
- 不修改任何 `.tsx` 业务逻辑（仅可能调整 className 字符串与极少量样式属性）
- 不修改任何 props、state、effect、handler
- 不修改任何 i18n key 或翻译文件
- 不修改任何数据 schema

**回滚成本：极低**
- 每个 P1/P2/P3 批次独立提交，任意阶段可回退
- 若某个视觉变化用户不满意，单独还原对应 CSS 文件即可
- 移动端可单独控制是否套用新视觉（通过 media query 隔离）

---

### 五、给用户的明确承诺

> ✅ 桌面端三列选择、级联过滤、进度计算、模式切换 —— **完全保留**  
> ✅ 移动端卡片布局、底部抽屉、垂直数据流 —— **完全保留**  
> ✅ 多语言、暗色模式、FAQ 抽屉、localStorage —— **完全保留**  
> ✅ 所有点击、选中、动画触发条件 —— **完全保留**  
> 🎨 只改：字体、颜色、卡片质感、进度条外观、按钮样式、动效曲线

如果你担心，我们可以采用**最保守的策略**：先只做 P1（字体 + 配色变量），观察一周；满意再推进 P2（卡片重设计）；最后才是 P3（仪式感与彩蛋）。每一步都可独立验证、独立回滚。

---

### 附加建议

注意到当前有一批 **TS build error**（`Property 'includes' does not exist on type 'string[]'`），是因为 `tsconfig.json` 的 `lib` 配置仍是 `["dom","dom.iterable","es6"]`，而 `target` 已升级到 `es2017`。建议在启动设计改造前，先把 `lib` 升级到 `["dom","dom.iterable","es2019"]`，让 `Array.includes` / `flatMap` 正常可用。这是一个独立的小修复，与设计无关，但会阻塞后续任何改动的编译。

---

**确认方向后，我会按 P1 → P2 → P3 顺序推进，每批完成后请你验收，再决定是否继续。**

