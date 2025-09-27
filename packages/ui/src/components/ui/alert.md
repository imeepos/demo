# Alert 组件文档

基于 class-variance-authority 的警告提示组件，用于显示重要的状态信息。

## 组件结构

- `Alert`: 主容器组件，支持不同变体样式
- `AlertTitle`: 警告标题组件
- `AlertDescription`: 警告描述内容组件

## 变体类型

- `default`: 默认样式，浅色背景
- `destructive`: 危险样式，红色主题用于错误或警告

## 基本用法

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

<Alert>
  <AlertTitle>提示</AlertTitle>
  <AlertDescription>这是一条普通的提示信息。</AlertDescription>
</Alert>;
```

## 危险警告样式

```tsx
<Alert variant="destructive">
  <AlertTitle>错误</AlertTitle>
  <AlertDescription>操作失败，请检查您的输入并重试。</AlertDescription>
</Alert>
```

## 带图标的警告

```tsx
import { AlertTriangle } from 'lucide-react';

<Alert>
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>注意</AlertTitle>
  <AlertDescription>此操作可能会影响您的数据。</AlertDescription>
</Alert>;
```

## 样式特点

- 圆角边框设计 (`rounded-lg`)
- 内置图标支持，自动定位和样式
- 图标左侧定位，内容自动缩进
- 支持可访问性的 `role="alert"` 属性

## 图标样式规则

组件内置了图标样式规则：

- `[&>svg~*]:pl-7`: 图标后的内容左侧内边距
- `[&>svg+div]:translate-y-[-3px]`: 图标后的div元素微调位置
- `[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4`: 图标绝对定位

## 自定义样式

```tsx
<Alert className="border-blue-200 bg-blue-50">
  <AlertTitle className="text-blue-800">自定义标题</AlertTitle>
  <AlertDescription className="text-blue-600">
    自定义样式的警告内容
  </AlertDescription>
</Alert>
```

## 响应式设计

组件具有良好的响应式特性，在不同屏幕尺寸下都能正确显示。
