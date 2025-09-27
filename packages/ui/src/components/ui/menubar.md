# Menubar 组件

基于 Radix UI 构建的菜单栏组件集合，提供了完整的桌面风格菜单栏功能，支持嵌套菜单、快捷键、复选框和单选按钮等特性。

## 组件列表

### Menubar

```tsx
import { Menubar } from '@/components/ui/menubar';
```

菜单栏的根容器组件。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `@radix-ui/react-menubar` Root 组件的所有属性

**默认样式:**

- 高度: 40px (h-10)
- 布局: 弹性布局，居中对齐
- 间距: 水平间距 4px (space-x-1)
- 圆角: 中等 (rounded-md)
- 边框: 默认边框
- 背景: 背景色
- 内边距: 4px (p-1)

### MenubarMenu

```tsx
import { MenubarMenu } from '@/components/ui/menubar';
```

单个菜单的容器组件，等同于 `MenubarPrimitive.Menu`。

### MenubarTrigger

```tsx
import { MenubarTrigger } from '@/components/ui/menubar';
```

菜单触发器按钮。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `@radix-ui/react-menubar` Trigger 组件的所有属性

**默认样式:**

- 弹性布局，居中对齐
- 默认鼠标样式，不可选择
- 圆角: 小 (rounded-sm)
- 内边距: 水平 12px，垂直 6px
- 字体: 小号，中等字重
- 悬停和聚焦状态: 强调背景和文字色
- 打开状态: 强调背景和文字色

### MenubarContent

```tsx
import { MenubarContent } from '@/components/ui/menubar';
```

菜单内容容器。

**Props:**

- `className?`: 额外的 CSS 类名
- `align?`: 对齐方式，默认为 "start"
- `alignOffset?`: 对齐偏移，默认为 -4
- `sideOffset?`: 侧边偏移，默认为 8
- 继承自 `@radix-ui/react-menubar` Content 组件的所有属性

**默认样式:**

- 最小宽度: 192px (min-w-[12rem])
- 圆角: 中等 (rounded-md)
- 边框和阴影
- 背景: popover 背景色
- 内边距: 4px (p-1)
- 入场和退场动画

### MenubarItem

```tsx
import { MenubarItem } from '@/components/ui/menubar';
```

菜单项组件。

**Props:**

- `className?`: 额外的 CSS 类名
- `inset?`: 是否内嵌显示（左边距增加）
- 继承自 `@radix-ui/react-menubar` Item 组件的所有属性

### MenubarCheckboxItem

```tsx
import { MenubarCheckboxItem } from '@/components/ui/menubar';
```

复选框菜单项。

**Props:**

- `className?`: 额外的 CSS 类名
- `children`: 子元素
- `checked?`: 选中状态
- 继承自 `@radix-ui/react-menubar` CheckboxItem 组件的所有属性

### MenubarRadioGroup

```tsx
import { MenubarRadioGroup } from '@/components/ui/menubar';
```

单选按钮组容器，等同于 `MenubarPrimitive.RadioGroup`。

### MenubarRadioItem

```tsx
import { MenubarRadioItem } from '@/components/ui/menubar';
```

单选按钮菜单项。

**Props:**

- `className?`: 额外的 CSS 类名
- `children`: 子元素
- 继承自 `@radix-ui/react-menubar` RadioItem 组件的所有属性

### MenubarSub

```tsx
import { MenubarSub } from '@/components/ui/menubar';
```

子菜单容器，等同于 `MenubarPrimitive.Sub`。

### MenubarSubTrigger

```tsx
import { MenubarSubTrigger } from '@/components/ui/menubar';
```

子菜单触发器。

**Props:**

- `className?`: 额外的 CSS 类名
- `inset?`: 是否内嵌显示
- `children`: 子元素
- 继承自 `@radix-ui/react-menubar` SubTrigger 组件的所有属性

**特性:**

- 自动显示右箭头图标

### MenubarSubContent

```tsx
import { MenubarSubContent } from '@/components/ui/menubar';
```

子菜单内容容器。

### MenubarLabel

```tsx
import { MenubarLabel } from '@/components/ui/menubar';
```

菜单标签组件。

**Props:**

- `className?`: 额外的 CSS 类名
- `inset?`: 是否内嵌显示
- 继承自 `@radix-ui/react-menubar` Label 组件的所有属性

### MenubarSeparator

```tsx
import { MenubarSeparator } from '@/components/ui/menubar';
```

菜单分隔线组件。

### MenubarShortcut

```tsx
import { MenubarShortcut } from '@/components/ui/menubar';
```

菜单快捷键显示组件。

**Props:**

- `className?`: 额外的 CSS 类名
- 继承自 `React.HTMLAttributes<HTMLSpanElement>`

## 基础用法

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            新建 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            打开 <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            保存 <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>编辑</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            撤销 <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            重做 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## 复选框和单选按钮

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function MenubarWithCheckbox() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>显示书签栏</MenubarCheckboxItem>
          <MenubarCheckboxItem>显示完整网址</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="pedro">
            <MenubarRadioItem value="pedro">开发者工具</MenubarRadioItem>
            <MenubarRadioItem value="colm">网络检查器</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## 嵌套子菜单

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function MenubarWithSubmenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>新建</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>最近打开</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>document.pdf</MenubarItem>
              <MenubarItem>image.png</MenubarItem>
              <MenubarItem>presentation.pptx</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>退出</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## 带标签和分组

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function MenubarWithLabels() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>编辑</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>基础操作</MenubarLabel>
          <MenubarItem>复制</MenubarItem>
          <MenubarItem>粘贴</MenubarItem>
          <MenubarSeparator />
          <MenubarLabel>高级操作</MenubarLabel>
          <MenubarItem>查找和替换</MenubarItem>
          <MenubarItem>转到行</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## 完整应用菜单栏

```tsx
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function AppMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            新建标签页 <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            新建窗口 <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>新建隐身窗口</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>分享</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>邮件链接</MenubarItem>
              <MenubarItem>消息</MenubarItem>
              <MenubarItem>备忘录</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            打印... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>编辑</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            撤销 <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            重做 <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            查找 <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>视图</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>始终显示书签栏</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>始终显示完整网址</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            重新加载 <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            强制重新加载 <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>切换全屏</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>隐藏侧边栏</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>配置</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>编辑...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>添加配置...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## 事件处理

```tsx
import { toast } from 'sonner';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';

export function MenubarWithEvents() {
  const handleNewFile = () => {
    toast('创建新文件');
  };

  const handleOpenFile = () => {
    toast('打开文件');
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={handleNewFile}>
            新建 <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleOpenFile}>
            打开 <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## 特性

- **完整的菜单栏功能**: 支持嵌套菜单、复选框、单选按钮等
- **键盘导航**: 完整的键盘操作支持
- **快捷键显示**: 内置快捷键显示组件
- **可访问性**: 基于 Radix UI 的完整无障碍访问支持
- **响应式**: 自适应不同屏幕尺寸
- **动画效果**: 流畅的打开和关闭动画
- **主题支持**: 支持深色和浅色主题

## 依赖项

- `@radix-ui/react-menubar`: Menubar 原语组件
- `lucide-react`: 图标组件 (Check, ChevronRight, Circle)
- `../../lib/utils`: 工具函数 (cn)
