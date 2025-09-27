# AlertDialog 组件文档

基于 Radix UI 的模态对话框组件，用于显示重要的确认或警告信息。

## 组件结构

- `AlertDialog`: 根容器组件
- `AlertDialogTrigger`: 触发器组件，用于打开对话框
- `AlertDialogPortal`: 传送门组件，将内容渲染到 body
- `AlertDialogOverlay`: 遮罩层，半透明黑色背景
- `AlertDialogContent`: 对话框主体内容
- `AlertDialogHeader`: 头部区域容器
- `AlertDialogFooter`: 底部区域容器
- `AlertDialogTitle`: 对话框标题
- `AlertDialogDescription`: 对话框描述文本
- `AlertDialogAction`: 确认按钮
- `AlertDialogCancel`: 取消按钮

## 基本用法

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger>删除文件</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>确认删除</AlertDialogTitle>
      <AlertDialogDescription>
        此操作无法撤销。这将永久删除您的文件。
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>取消</AlertDialogCancel>
      <AlertDialogAction>确认删除</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

## 样式特点

- 遮罩层：半透明黑色背景 (`bg-black/80`)
- 内容区域：居中显示，最大宽度 `max-w-lg`
- 动画效果：支持淡入淡出和缩放动画
- 响应式设计：在小屏幕上适配移动端布局

## 按钮样式

- `AlertDialogAction`: 使用默认按钮样式
- `AlertDialogCancel`: 使用 outline 变体样式，在移动端有顶部间距

## 布局特点

- `AlertDialogHeader`: 居中对齐，在大屏幕上左对齐
- `AlertDialogFooter`: 移动端垂直排列，桌面端水平排列并右对齐

## 自定义样式

```tsx
<AlertDialogContent className="max-w-md">
  <AlertDialogTitle className="text-red-600">危险操作</AlertDialogTitle>
  <AlertDialogDescription className="text-gray-500">
    请仔细考虑此操作的后果
  </AlertDialogDescription>
</AlertDialogContent>
```

## 可访问性

- 自动管理焦点
- 支持键盘导航
- 包含适当的 ARIA 属性
- 遵循模态对话框的最佳实践
