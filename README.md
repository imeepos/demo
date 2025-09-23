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
├── apps/             # 应用程序 (Monorepo)
├── public/           # 静态资源
└── docs/             # 文档
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
