# TailwindCSS v4 配置与使用文档

## 概述

Tailwind CSS v4.0 是一个全新版本的框架，专为性能和灵活性而优化，具有重新设计的配置和自定义体验。它发布于2025年，带来了显著的性能改进和现代化的开发体验。

## 主要特性

### 🚀 性能提升

- 全量构建速度提升高达 5x
- 增量构建在微秒级完成
- 基于现代 CSS 特性构建（cascade layers、custom properties）

### 🎨 CSS优先配置

- 从 JavaScript 配置迁移到基于 CSS 的配置
- 设计令牌自动作为 CSS 变量暴露
- 减少项目中需要管理的文件

### 🔧 简化安装

- 单行 CSS 导入：`@import "tailwindcss"`
- 零配置要求
- 无需外部插件

### 🌈 现代化色彩系统

- 从 RGB 升级到 OKLCH 色彩空间
- 在更广泛的显示技术上实现更鲜艳的颜色

## 浏览器兼容性

Tailwind CSS v4.0 面向现代浏览器：

- Safari 16.4+
- Chrome 111+
- Firefox 128+

依赖现代 CSS 特性如 `@property` 和 `color-mix()`。

## 安装与设置

### 新项目安装

```bash
npm install tailwindcss@next
```

### CSS 文件配置

在你的主 CSS 文件中：

```css
@import 'tailwindcss';
```

### 自动内容检测

v4.0 自动检测所有内容，无需手动配置。会自动忽略 `.gitignore` 文件中的内容，避免扫描依赖项或生成的文件。

## 配置方式

### CSS 优先配置（推荐）

使用 `@theme` 指令配置主题：

```css
@import 'tailwindcss';

@theme {
  --color-primary: hsl(49, 100%, 7%);
  --color-link: hsl(49, 100%, 7%);
  --color-line: hsl(49, 23%, 90%);
  --color-tag: hsl(49, 22%, 88%);

  --font-family-display: 'Inter', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;

  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

### JavaScript 配置文件（向后兼容）

如果仍需使用 JavaScript 配置文件，需要通过 `@config` 指令显式加载：

```css
@import 'tailwindcss';
@config "./tailwind.config.js";
```

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(49, 100%, 7%)',
      },
    },
  },
};
```

## 从 v3 升级到 v4

### 自动升级工具

```bash
npx @tailwindcss/upgrade@next
```

升级工具会自动：

- 更新依赖项
- 将配置文件迁移到 CSS
- 处理模板文件的更改

### 主要破坏性变更

#### 指令变更

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import 'tailwindcss';
```

#### 工具类重命名

- `shadow-sm` → `shadow-xs`
- `outline-none` → `outline-hidden`
- 移除特定不透明度工具类，改用不透明度修饰符

#### 颜色和样式变更

- 边框、环形和轮廓的默认颜色和样式更改
- `space-between` 选择器实现更新

### 手动迁移步骤

1. **更新导入**

   ```css
   /* 替换 */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* 为 */
   @import 'tailwindcss';
   ```

2. **迁移主题配置**

   ```css
   @theme {
     --color-primary: theme(colors.blue.500);
     --font-family-sans: system-ui, sans-serif;
   }
   ```

3. **更新工具类**
   使用升级工具或手动替换已弃用的工具类

## 新功能和工具类

### 动态网格和间距工具

```html
<div class="grid grid-cols-[200px_1fr_100px]">
  <!-- 自定义网格列 -->
</div>

<div class="space-x-[10px]">
  <!-- 自定义间距 -->
</div>
```

### 3D 变换功能

```html
<div class="transform-3d rotate-x-45 rotate-y-30">
  <!-- 3D 变换 -->
</div>
```

### 扩展的渐变 API

```html
<div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  <!-- 多色渐变 -->
</div>
```

### 容器查询支持

```html
<div class="@container">
  <div class="@md:text-lg">
    <!-- 基于容器的响应式设计 -->
  </div>
</div>
```

## 最佳实践

### 1. 使用 CSS 变量进行主题化

```css
@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #ef4444;
}
```

### 2. 利用自动内容检测

无需手动配置 `content` 路径，让 Tailwind 自动检测。

### 3. 使用现代 CSS 特性

```css
@theme {
  --color-dynamic: color-mix(in oklch, var(--color-primary) 80%, white);
}
```

### 4. 组织配置文件

```css
@import 'tailwindcss';

/* 基础主题 */
@theme {
  /* 颜色 */
  --color-primary: oklch(0.5 0.2 250);
  --color-secondary: oklch(0.7 0.15 280);

  /* 字体 */
  --font-family-sans: 'Inter', system-ui, sans-serif;

  /* 间距 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
}

/* 自定义组件 */
@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90;
  }
}
```

## 性能优化建议

1. **利用增量构建**：v4 的增量构建极快，适合开发环境
2. **使用现代浏览器特性**：充分利用 cascade layers 和 custom properties
3. **避免过度配置**：让自动检测处理大部分工作
4. **使用 CSS 优先配置**：比 JavaScript 配置性能更好

## 调试和开发工具

### 开发模式

```bash
# 监听模式
npx tailwindcss --watch

# 开发构建
npx tailwindcss --dev
```

### 生产构建

```bash
# 优化构建
npx tailwindcss --minify
```

## 常见问题解决

### 1. 样式不生效

- 检查 CSS 导入顺序
- 确认浏览器兼容性
- 验证 CSS 变量语法

### 2. 配置不工作

- 使用 `@config` 指令加载 JS 配置
- 检查 CSS 变量命名约定
- 确认主题配置语法

### 3. 性能问题

- 利用自动内容检测
- 避免不必要的自定义配置
- 使用增量构建

## 迁移检查清单

- [ ] 运行升级工具 `npx @tailwindcss/upgrade@next`
- [ ] 更新 CSS 导入为 `@import "tailwindcss"`
- [ ] 迁移主题配置到 CSS 变量
- [ ] 更新已弃用的工具类
- [ ] 测试所有页面和组件
- [ ] 验证浏览器兼容性
- [ ] 检查构建性能
- [ ] 更新文档和团队指南

## 参考资源

- [官方文档](https://tailwindcss.com/docs)
- [v4 发布博客](https://tailwindcss.com/blog/tailwindcss-v4)
- [升级指南](https://tailwindcss.com/docs/upgrade-guide)
- [GitHub 仓库](https://github.com/tailwindlabs/tailwindcss)

---

_最后更新：2025年9月_
