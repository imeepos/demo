# Breadcrumb 组件文档

基于 Radix UI Slot 的面包屑导航组件，用于显示页面层级关系和导航路径。

## 组件结构

- `Breadcrumb`: 根导航容器组件
- `BreadcrumbList`: 面包屑列表容器
- `BreadcrumbItem`: 单个面包屑项
- `BreadcrumbLink`: 面包屑链接
- `BreadcrumbPage`: 当前页面标识
- `BreadcrumbSeparator`: 分隔符组件
- `BreadcrumbEllipsis`: 省略号组件

## 基本用法

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">产品</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>当前页面</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

## 使用 React Router

```tsx
import { Link } from 'react-router-dom';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/">首页</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to="/category">分类</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>产品详情</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

## 带省略号的长路径

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/parent">父级</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>当前页面</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## 自定义分隔符

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">产品</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>></BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>详情</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## 样式特点

- 自动间距：列表项之间有 `gap-1.5` 或 `gap-2.5`（响应式）
- 文字颜色：默认为 `text-muted-foreground`
- 悬停效果：链接有 `hover:text-foreground` 效果
- 当前页面：`BreadcrumbPage` 有 `text-foreground` 和 `font-normal`
- 分隔符：默认使用 ChevronRight 图标，尺寸 3.5x3.5

## 可访问性

- 使用语义化的 `nav` 标签和 `aria-label="breadcrumb"`
- `BreadcrumbPage` 具有适当的 ARIA 属性：
  - `role="link"`
  - `aria-disabled="true"`
  - `aria-current="page"`
- 分隔符有 `aria-hidden="true"` 防止屏幕阅读器读取

## 响应式设计

```tsx
// 移动端隐藏中间项
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem className="hidden md:block">
      <BreadcrumbLink href="/category">分类</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator className="hidden md:block" />
    <BreadcrumbItem>
      <BreadcrumbPage>当前页</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## 自定义样式

```tsx
<Breadcrumb>
  <BreadcrumbList className="text-sm">
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="text-blue-600 hover:text-blue-800">
        首页
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator className="text-gray-400" />
    <BreadcrumbItem>
      <BreadcrumbPage className="font-semibold">当前页面</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
