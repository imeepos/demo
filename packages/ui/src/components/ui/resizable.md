# Resizable 组件

基于 `react-resizable-panels` 构建的可调整大小面板组件，提供灵活的布局分割功能。

## 组件导出

### ResizablePanelGroup

主容器组件，管理所有可调整大小的面板。

**Props:**

- 继承 `react-resizable-panels` 的 `PanelGroup` 所有属性
- `className?: string` - 额外的CSS类名

**默认样式:**

- `flex h-full w-full` - 全尺寸弹性布局
- `data-[panel-group-direction=vertical]:flex-col` - 垂直方向时使用列布局

### ResizablePanel

面板组件，代表可调整大小的单个面板区域。

**类型:**
直接导出 `react-resizable-panels` 的 `Panel` 组件

### ResizableHandle

调整手柄组件，用于拖拽调整面板大小。

**Props:**

- 继承 `react-resizable-panels` 的 `PanelResizeHandle` 所有属性
- `withHandle?: boolean` - 是否显示可视手柄图标
- `className?: string` - 额外的CSS类名

**默认样式:**

- 水平方向: `w-px` - 1像素宽度分割线
- 垂直方向: `h-px w-full` - 1像素高度分割线
- 包含焦点状态样式和动画效果

**可视手柄:**
当 `withHandle=true` 时，显示带有 `GripVertical` 图标的手柄。

## 使用示例

### 基础水平布局

```jsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

export function HorizontalResize() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <div>左侧面板</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div>右侧面板</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### 垂直布局

```jsx
export function VerticalResize() {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={30}>
        <div>顶部面板</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div>底部面板</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### 带可视手柄

```jsx
export function ResizeWithHandle() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>
        <div>左侧内容</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div>右侧内容</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### 复杂布局

```jsx
export function ComplexLayout() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      <ResizablePanel defaultSize={25} minSize={15}>
        <div>侧边栏</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div>主内容区</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div>底部面板</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## 注意事项

1. **方向性:** 组件会根据 `direction` 属性自动调整样式
2. **响应式:** 支持垂直和水平方向的自动样式切换
3. **可访问性:** 内置焦点管理和键盘导航支持
4. **尺寸限制:** 可通过 `minSize` 和 `maxSize` 属性限制面板大小
5. **持久化:** 支持通过 `id` 属性保存和恢复布局状态

## 依赖

- `react-resizable-panels`
- `lucide-react` (GripVertical 图标)
- `@/lib/utils` (cn 函数)
