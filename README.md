# Sker

一个现代化的前端项目模板，配置了完整的开发工具链。

## 特性

- 🚀 TypeScript + React 支持
- 📦 pnpm + Monorepo 结构
- 🔧 ESLint + Prettier 代码规范
- 🧪 Vitest 测试框架
- 🎣 Git Hooks (husky + lint-staged)
- 🔄 GitHub Actions CI/CD
- 📁 合理的目录结构

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 测试

```bash
pnpm test
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## 目录结构

```
├── .github/          # GitHub Actions 配置
├── .vscode/          # VSCode 配置
├── src/              # 源代码
│   ├── components/   # React 组件
│   ├── hooks/        # 自定义 Hooks
│   ├── utils/        # 工具函数
│   ├── types/        # TypeScript 类型定义
│   ├── styles/       # 样式文件
│   └── test/         # 测试配置
├── packages/         # 共享包 (Monorepo)
│   └── ui/           # UI 组件库
│       └── src/
│           └── components/
│               ├── ui/        # 基础UI组件
│               ├── elements/  # 元素组件
│               ├── layouts/   # 布局组件
│               └── widgets/   # 复合组件
├── apps/             # 应用程序 (Monorepo)
├── public/           # 静态资源
└── docs/             # 文档
```

## UI 组件库

### 🎨 基础UI组件 (ui/)

```
accordion         # 手风琴组件
alert            # 警告提示
alert-dialog     # 警告对话框
aspect-ratio     # 宽高比容器
avatar           # 头像组件
badge            # 徽章标签
breadcrumb       # 面包屑导航
button           # 按钮组件
calendar         # 日历组件
card             # 卡片容器
checkbox         # 复选框
collapsible      # 可折叠容器
command          # 命令面板
context-menu     # 右键菜单
dialog           # 对话框
dropdown-menu    # 下拉菜单
form             # 表单组件
hover-card       # 悬浮卡片
input            # 输入框
label            # 标签文本
menubar          # 菜单栏
navigation-menu  # 导航菜单
pagination       # 分页组件
popover          # 弹出层
progress         # 进度条
radio-group      # 单选按钮组
resizable        # 可调整大小容器
scroll-area      # 滚动区域
select           # 选择器
separator        # 分隔线
sheet            # 侧边抽屉
skeleton         # 骨架屏
slider           # 滑块组件
sonner           # Toast通知
switch           # 开关组件
table            # 表格组件
tabs             # 标签页
textarea         # 多行文本框
tooltip          # 工具提示
```

### 🔧 元素组件 (elements/)

```
QuickActionButton    # 快速操作按钮
SentimentIndicator   # 情感指示器
SourceTag           # 来源标签
StatusIndicator     # 状态指示器
TimelineMarker      # 时间线标记
TrendArrow          # 趋势箭头
UrgencyLevel        # 紧急程度指示器
```

### 📱 布局组件 (layouts/)

```
MonitoringCenterLayout     # 监控中心布局
ReportGeneratorLayout      # 报告生成器布局
SentimentDashboardLayout   # 情感分析仪表板布局
```

### 🧩 复合组件 (widgets/)

```
AdvancedSearchPanel        # 高级搜索面板
AlertManagementWidget      # 告警管理组件
DataExplorerTable         # 数据探索表格
GeographicDistributionMap  # 地理分布图
SentimentOverviewWidget    # 情感概览组件
TrendAnalysisChart        # 趋势分析图表
```

## 脚本命令

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建项目
- `pnpm typecheck` - TypeScript 类型检查
- `pnpm lint` - ESLint 检查
- `pnpm lint:fix` - 自动修复 ESLint 错误
- `pnpm format` - Prettier 格式化
- `pnpm format:check` - 检查代码格式
- `pnpm test` - 运行测试 (watch 模式)
- `pnpm test:run` - 运行测试 (单次)
- `pnpm test:ui` - 运行测试 (UI 模式)
- `pnpm test:coverage` - 运行测试并生成覆盖率报告
- `pnpm clean` - 清理构建产物

## 环境配置

复制 `.env.example` 文件为 `.env` 并配置相应的环境变量。

## 许可证

ISC
