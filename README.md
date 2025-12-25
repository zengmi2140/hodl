# 比特币自主保管模拟器

一个帮助用户了解比特币自主保管方案的教育工具。通过交互式界面，用户可以探索硬件签名器、软件钱包和区块链节点的组合，理解不同配置的安全性和便利性权衡。

## 功能特点

- **单签/多签模式**：支持传统单签名 (1-of-1) 和多签名 (2-of-3、3-of-5) 配置
- **组件兼容性展示**：自动筛选并高亮兼容的硬件签名器、软件钱包和节点组合
- **数据传输方式可视化**：展示 USB、QR 码、microSD、蓝牙等连接方式
- **进度评估系统**：根据选择的组件计算安全性得分，帮助用户理解各配置的优劣
- **响应式设计**：完整支持桌面端和移动端体验
- **初始引导**：帮助新用户根据设备类型和偏好开始探索

## 技术栈

- React 18 + TypeScript
- Vite 5
- TailwindCSS 3
- react-markdown（用于 FAQ 渲染）
- react-router-dom（路由管理）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 8080）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
├── public/
│   ├── custody-data.json    # 组件数据与兼容性配置
│   └── images/logos/        # 品牌 Logo 资源
├── src/
│   ├── components/
│   │   ├── mobile/          # 移动端专用组件
│   │   ├── multisig/        # 多签模式组件
│   │   ├── shared/          # 共享组件（钱包列、节点列等）
│   │   └── singlesig/       # 单签模式组件
│   ├── content/
│   │   └── FAQ.md           # FAQ 内容
│   ├── hooks/               # 自定义 Hooks
│   ├── data.ts              # 备用数据
│   ├── dataLoader.ts        # 数据加载逻辑
│   ├── types.ts             # TypeScript 类型定义
│   └── main.tsx             # 应用入口
├── tailwind.config.js
├── vite.config.ts
└── index.html
```

## 数据配置

所有组件数据存储在 `public/custody-data.json`，包括：

- **硬件签名器**：Coldcard、Ledger、Jade、Keystone、Seedsigner、Trezor、BitBox02
- **软件钱包**：Sparrow、Blue Wallet、Electrum、Green、Liana、Nunchuk
- **区块链节点**：electrs、公共节点、Bitcoin Core、Bitcoin Knots
- **兼容性映射**：签名器与钱包的连接方式

如需自定义数据，直接修改该 JSON 文件即可。

## 进度计算规则

### 单签模式
- 仅硬件签名器：50%
- 无签名器 + 钱包：60%
- 无签名器 + 钱包 + 私有节点：80%
- 硬件签名器 + 钱包：100%
- 硬件签名器 + 钱包 + 私有节点：120%（最优配置）

### 多签模式 (2-of-3)
- 每个签名器槽位：+20%（最多 60%）
- 钱包：+50%
- 私有节点：+20%
- 最高：130%

### 多签模式 (3-of-5)
- 每个签名器槽位：+15%（全部填满额外 +5%）
- 钱包：+50%
- 私有节点：+20%
- 最高：150%

## 注意事项

- Logo 及品牌素材位于 `public/images/logos/`，请确保使用符合对应品牌的授权要求
- 本项目为纯前端静态站点，无需后端服务

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。
