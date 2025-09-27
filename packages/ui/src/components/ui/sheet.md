# Sheet 组件文档

Sheet 组件是基于 Radix UI 的 Dialog 组件构建的侧边抽屉组件，用于在页面侧边展示内容。

## 组件导出

```typescript
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
```

## 基本用法

```tsx
<Sheet>
  <SheetTrigger>打开抽屉</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>标题</SheetTitle>
      <SheetDescription>描述文字</SheetDescription>
    </SheetHeader>
    <div>抽屉内容</div>
    <SheetFooter>
      <SheetClose>关闭</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## 组件说明

- **Sheet**: 根组件，包装整个抽屉
- **SheetTrigger**: 触发器，点击时打开抽屉
- **SheetContent**: 抽屉内容容器，支持 `side` 属性
- **SheetOverlay**: 背景遮罩层
- **SheetHeader**: 头部区域，用于放置标题和描述
- **SheetTitle**: 标题组件
- **SheetDescription**: 描述文字组件
- **SheetFooter**: 底部区域，通常放置操作按钮
- **SheetClose**: 关闭按钮

## SheetContent 属性

| 属性 | 类型                                   | 默认值  | 描述           |
| ---- | -------------------------------------- | ------- | -------------- |
| side | "top" \| "right" \| "bottom" \| "left" | "right" | 抽屉出现的位置 |

## 使用示例

### 不同位置的抽屉

```tsx
// 右侧抽屉（默认）
<Sheet>
  <SheetTrigger>右侧抽屉</SheetTrigger>
  <SheetContent side="right">内容</SheetContent>
</Sheet>

// 左侧抽屉
<Sheet>
  <SheetTrigger>左侧抽屉</SheetTrigger>
  <SheetContent side="left">内容</SheetContent>
</Sheet>

// 顶部抽屉
<Sheet>
  <SheetTrigger>顶部抽屉</SheetTrigger>
  <SheetContent side="top">内容</SheetContent>
</Sheet>

// 底部抽屉
<Sheet>
  <SheetTrigger>底部抽屉</SheetTrigger>
  <SheetContent side="bottom">内容</SheetContent>
</Sheet>
```

### 带表单的抽屉

```tsx
<Sheet>
  <SheetTrigger>编辑用户</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>编辑用户信息</SheetTitle>
      <SheetDescription>在这里修改用户的基本信息</SheetDescription>
    </SheetHeader>
    <form className="space-y-4">
      <div>
        <label>姓名</label>
        <input type="text" />
      </div>
      <div>
        <label>邮箱</label>
        <input type="email" />
      </div>
    </form>
    <SheetFooter>
      <SheetClose>取消</SheetClose>
      <button type="submit">保存</button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## 样式自定义

所有组件都支持通过 `className` 属性进行样式自定义，样式会与默认样式合并。
