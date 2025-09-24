# UI 开发指导规范和注意事项

## 项目概述

这是一个基于 Monorepo 架构的前端项目，使用 React 19 + TypeScript + Vite + TailwindCSS v4 构建。

### 项目结构

```
apps/web/              # 前端应用
├── src/
│   ├── components/    # 业务组件
│   ├── pages/         # 页面组件
│   ├── styles/        # 样式文件
│   ├── hooks/         # 自定义 Hooks
│   ├── lib/           # 工具库
│   ├── types/         # 类型定义
│   └── utils/         # 工具函数
└── package.json

packages/ui/           # 共享UI组件库
├── src/
│   ├── components/ui/ # shadcn/ui 组件
│   ├── lib/utils.ts   # 工具函数
│   └── styles.css     # 组件样式
└── package.json
```

## 技术栈

### 核心依赖

- **React 19.1.1**: 最新版本React
- **TypeScript**: 类型安全
- **Vite 7.1.7**: 构建工具
- **TailwindCSS v4.1.13**: 原子化CSS框架
- **@tanstack/react-query**: 数据获取和状态管理
- **@tanstack/react-router**: 路由管理

### UI组件库

- **@sker/ui**: 内部UI组件库，基于 shadcn/ui
- **@radix-ui**: 无样式组件基础库
- **Lucide React**: 图标库
- **class-variance-authority**: 组件变体管理
- **clsx + tailwind-merge**: 样式条件合并

## UI组件使用规范

### 1. 组件导入规范

```typescript
// ✅ 推荐：从 @sker/ui 导入组件
import { Button, Card, Input, Dialog } from '@sker/ui';
import { cn } from '@sker/ui';

// ❌ 避免：直接从内部路径导入
import { Button } from '@sker/ui/src/components/ui/button';
```

### 2. 样式编写规范

#### 使用 CSS 变量主题系统

```css
/* ✅ 推荐：使用主题变量 */
.my-component {
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}

/* ❌ 避免：硬编码颜色值 */
.my-component {
  background: #efefef;
  color: #000000;
}
```

#### TailwindCSS 类名使用

```typescript
// ✅ 推荐：使用 cn 函数合并样式
import { cn } from '@sker/ui'

const MyComponent = ({ className, variant }) => (
  <div className={cn(
    "base-styles",
    variant === "primary" && "primary-styles",
    className
  )}>
    Content
  </div>
)

// ✅ 推荐：使用主题相关的 Tailwind 类
<div className="bg-background text-foreground border-border">
  Content
</div>
```

### 3. 主题系统

#### 当前主题配置

- **主背景**: `--background: #efefef` (浅灰色)
- **前景文本**: `--foreground: #000000` (黑色)
- **主色**: `--primary: #88f5fa` (青色)
- **卡片背景**: `--card: #ffffff` (白色)

#### 主题切换支持

```typescript
// 系统自动支持暗黑模式切换
// 通过添加 .dark 类到根元素实现
document.documentElement.classList.add('dark');
```

### 4. 字体系统

项目使用 Rubik 字体家族，支持多种字重：

```css
/* 字体工具类 */
.font-rubik-light     /* font-weight: 300 */
.font-rubik-regular   /* font-weight: 400 */
.font-rubik-medium    /* font-weight: 500 */
.font-rubik-semibold  /* font-weight: 600 */
.font-rubik-bold      /* font-weight: 700 */
.font-rubik-extrabold /* font-weight: 800 */
.font-rubik-black     /* font-weight: 900 */
```

## 组件开发规范

### 1. 可用组件列表

当前 `@sker/ui` 提供以下组件：

- **Avatar**: 用户头像组件
- **Badge**: 标记组件
- **Button**: 按钮组件
- **Card**: 卡片容器组件
- **Checkbox**: 复选框组件
- **Dialog**: 对话框组件
- **Input**: 输入框组件
- **Label**: 标签组件
- **Select**: 选择器组件
- **Separator**: 分割线组件
- **Switch**: 开关组件
- **Textarea**: 多行文本输入组件

### 2. 添加新组件

```bash
# 进入 packages/ui 目录
cd packages/ui

# 使用 shadcn/ui CLI 添加组件
pnpm run add [组件名]

# 例如：添加表格组件
pnpm run add table
```

### 3. 组件开发最佳实践

#### 组件结构

```typescript
import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

// 定义组件变体
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 组件接口
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// 组件实现
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## 开发注意事项

### 1. 样式优先级

1. **组件库样式** > **业务组件样式** > **全局样式**
2. 使用 `!important` 需要谨慎，优先通过CSS特定性解决
3. 自定义样式请使用 `className` prop 传入

### 2. 响应式设计

```typescript
// ✅ 推荐：使用 Tailwind 响应式前缀
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive content
</div>

// ✅ 推荐：移动优先的设计原则
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### 3. 无障碍访问 (A11y)

```typescript
// ✅ 推荐：提供完整的无障碍属性
<Button
  aria-label="关闭对话框"
  aria-describedby="dialog-description"
  onClick={handleClose}
>
  <X className="h-4 w-4" />
</Button>
```

### 4. 性能优化

```typescript
// ✅ 推荐：使用 React.memo 优化重渲染
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})

// ✅ 推荐：合理使用 useMemo 和 useCallback
const memoizedValue = useMemo(() => expensiveCalculation(data), [data])
const memoizedCallback = useCallback(() => handleClick(id), [id])
```

### 5. TypeScript 使用

```typescript
// ✅ 推荐：为组件 props 定义明确的类型
interface MyComponentProps {
  title: string;
  isVisible?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// ✅ 推荐：使用泛型约束
interface SelectProps<T> {
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
}
```

## 调试与测试

### 1. 开发工具

- **React DevTools**: React 组件调试
- **TanStack Query DevTools**: 状态管理调试
- **Vite DevTools**: 构建过程调试

### 2. 测试命令

```bash
# 运行测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 3. 样式调试

```typescript
// 开发环境下启用样式调试
if (process.env.NODE_ENV === 'development') {
  import('why-did-you-render').then(whyDidYouRender => {
    whyDidYouRender.default(React);
  });
}
```

## 常见问题

### 1. 样式不生效

- 检查 TailwindCSS 配置文件
- 确认组件路径在 `content` 配置中
- 验证样式优先级问题

### 2. 主题切换问题

- 确保使用 CSS 变量而非硬编码颜色
- 检查 `:root` 和 `.dark` 类的变量定义

### 3. 组件导入错误

- 确认从 `@sker/ui` 正确导入
- 检查组件是否在 `components/index.ts` 中导出

### 4. 类型错误

- 更新 `@types/react` 到对应版本
- 检查组件 props 类型定义

---

## 硬性要求

- 单组件不得超过200行代码，超过必须拆分
- 务必保证每个文件 职责单一 只关注一件事情

**最后更新**: 2025-01-24
**维护者**: SKER Team
