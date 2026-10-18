# Specter-DIY 数据核查

核查日期：2026-10-18。依据官方文档、官方源码和官方仓库问题记录；未进行实体硬件签名测试。

## 已采用的特性

- 开源固件、可自行组装：[官方仓库及 MIT 许可证](https://github.com/cryptoadvance/specter-diy)。
- 二维码隔离签名：[官方通信说明](https://github.com/cryptoadvance/specter-diy/blob/master/docs/communication.md)。USB 默认关闭，启用后不属于隔离通信。
- Miniscript、可选断电遗忘私钥模式：[安全模型](https://docs.specter.solutions/diy/security-model/)。不能写成“设备始终不存储私钥”，因为另有持久存储模式；不将可选扩展板的安全芯片当成所有 DIY 设备的标配。

## 本次录入的兼容关系

| 项目内钱包 | 录入的传输方式 | 官方依据 |
| --- | --- | --- |
| Sparrow | 二维码、microSD 卡 | [二维码指南](https://sparrowwallet.com/docs/airgapped-wallet-qr.html)、[SD 卡指南](https://sparrowwallet.com/docs/airgapped-wallet-sdcard.html) 均明确列出 Specter DIY；[多签导入实现](https://github.com/sparrowwallet/sparrow/blob/master/src/main/java/com/sparrowwallet/sparrow/io/SpecterDIYMultisig.java) |
| Specter Desktop | 二维码、microSD 卡、USB | [设备实现](https://github.com/cryptoadvance/specter-desktop/blob/master/src/cryptoadvance/specter/devices/specter.py) 明确支持 QR、SD、HWI；[官方介绍](https://docs.specter.solutions/diy/) 说明支持单签和多签 |
| Liana | USB | [硬件连接实现](https://github.com/wizardsardine/liana/blob/master/liana-gui/src/hw.rs) 使用 Specter SerialTransport；[变更记录](https://github.com/wizardsardine/liana/blob/master/CHANGELOG.md) 明确列出 Specter DIY。沿用本站 Liana 仅多签显示的现有规则 |

传输方式按具体钱包集成记录，不把设备支持的所有通信渠道自动复制到每个钱包。Sparrow 的 USB 集成本次未确认，不作录入。

## 未录入及限制

- BlueWallet：[Specter 官方 FAQ](https://docs.specter.solutions/desktop/faq/) 确认 watch-only 配合 Specter DIY 签名；但 [问题 #357](https://github.com/cryptoadvance/specter-diy/issues/357) 报告多签配置二维码不能直接导入。本站单签与多签共用 `compatibleSigners`，此次保守不录入，以免将局部支持展示为两种模式均兼容。这不是断言 BlueWallet 完全不支持该设备。
- Nunchuk：[官方 Miniscript 文章](https://nunchuk.io/blog/miniscript-programmable-bitcoin) 列出了 Specter DIY，但 [问题 #257](https://github.com/cryptoadvance/specter-diy/issues/257) 涉及多签配置和地址验证限制；没有充分确认不同客户端、固件版本的完整通信路径，本次不标为全面兼容。
- Electrum、Keeper、Wasabi：本次未获得足以确认直接集成与通信方式的一手依据，不根据“支持 PSBT”推断设备兼容。
- 若后续要呈现 BlueWallet 等局部兼容，应单独扩展数据模型以区分签名模式、版本及限制说明。

## 排序及素材

- 三种语言统一：Jade、Trezor、Keystone、Bitbox 02、SeedSigner、Passport、Krux、Tapsigner、Specter-DIY、Coldcard、Ledger、不使用签名器。
- 单签保留“不使用签名器”在最后；多签排除它，并保留兼容设备优先，Coldcard、Ledger 在各兼容性分组末尾。
- 图标来自 Specter Desktop 官方设备资源 [specter_icon.svg](https://github.com/cryptoadvance/specter-desktop/blob/master/src/cryptoadvance/specter/static/img/devices/specter_icon.svg)，将白色填充调整为橙色以适配浅色背景，并转换为透明背景 128×128 WebP；许可证保存在图标同目录的 `specter-diy.LICENSE`。

## 验收记录

- 三种语言：唯一 ID、统一顺序、签名器与钱包双向引用、传输方式及图标路径检查通过。
- `npm run build`、`git diff --check` 通过。
- Ego 完成桌面单签选择和手机多签列表观察；截图接口连续超时且模拟视口回退，改用已有应用内浏览器完成 1440px 桌面及 390px 手机验收，没有新增测试依赖。
- 桌面单签 Specter-DIY + Sparrow 显示二维码和 microSD；桌面多签 + Liana 显示 USB；手机单签 + Specter Desktop 显示二维码、microSD、USB。手机多签下拉选择成功，Liana 兼容组内 Coldcard、Ledger 在末尾；三种语言切换及新增特性显示正常。
- `tsc --noEmit` 未通过：当前 TypeScript 4.9 无法解析已安装 i18next / react-i18next 类型声明中的较新语法。此次没有改动 TypeScript 代码或依赖，此问题不在本次修改范围内。

## 同步远程后的复验

已将本地 main 从 `4e43ab5` 快进到远程 `803f51c`（96 个提交），恢复本次修改及用户原有 `.cursor/settings.json` 修改，无冲突。Git stash 保留同步前备份。

在新版本上重新执行生产构建和差异空白检查，均通过；重启 Vite 后确认显示远程新版界面。应用内浏览器重新验证桌面单签 Specter-DIY + Sparrow、多签 Specter-DIY + Liana、手机布局与新排序；新增特性兼容新版 FeatureIcon 展示。Ego 读取页面状态，视觉复验沿用本次已验证可用的应用内浏览器。


## 对照 SeedSigner 补充特性（2026-10-18）

| SeedSigner 现有特性 | Specter-DIY 核查与处理 |
| --- | --- |
| 自身不存储私钥 | 保留“可选断电遗忘私钥模式”；不是所有配置都无持久存储 |
| 掷骰子生成种子词 | 不录入：[官方功能请求 #375](https://github.com/cryptoadvance/specter-diy/issues/375) 仍开放，未确认实现 |
| 摄像生成种子词 | 不录入：官方安全模型列出的熵源是 MCU TRNG 与触屏；扫码器不等于摄像取熵 |
| Air-gapped 体验 | 已有，保留 |
| 自定义公钥派生路径 | 新增：[官方 XpubApp 源码](https://github.com/cryptoadvance/specter-diy/blob/master/src/apps/xpubs/xpubs.py) 明确提供 Enter custom derivation，并通过 DerivationScreen 接受输入 |
| 基于通用硬件 | 新增：[官方介绍](https://github.com/cryptoadvance/specter-diy) 明确使用现成通用元件搭建 |
| 无安全芯片 | 有条件录入为“基础配置无安全芯片，可选智能卡扩展”，避免忽略 Shield / Shield-Lite 搭配 JavaCard 的配置 |

另补充设备实际支持的“触屏输入增加种子词熵”。[官方安全模型](https://github.com/cryptoadvance/specter-diy/blob/master/docs/security-model.md) 的 Random number generation 章节说明触屏坐标和时间参与熵池；Secret storage 章节区分 RAM、智能卡和内部 flash 模式。三种语言同步更新，共 8 项特性，未更改钱包兼容关系。
