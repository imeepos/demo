# ContextMenu 组件

一个功能完整的右键上下文菜单组件集合，基于 Radix UI 构建，支持多级嵌套、复选框、单选按钮等丰富的菜单项类型。

## 功能特性

- 🖱️ 右键点击触发的上下文菜单
- 📁 支持多级子菜单嵌套
- ✅ 内置复选框和单选按钮菜单项
- ⌨️ 完整的键盘导航支持
- 🎯 智能位置定位，防止溢出
- ♿ 完整的无障碍功能支持
- 🎨 可完全自定义样式和主题

## 组件结构

- `ContextMenu` - 根上下文菜单容器
- `ContextMenuTrigger` - 触发器，响应右键点击
- `ContextMenuContent` - 菜单内容容器
- `ContextMenuItem` - 基础菜单项
- `ContextMenuCheckboxItem` - 复选框菜单项
- `ContextMenuRadioItem` - 单选菜单项
- `ContextMenuRadioGroup` - 单选组容器
- `ContextMenuSub` - 子菜单容器
- `ContextMenuSubTrigger` - 子菜单触发器
- `ContextMenuSubContent` - 子菜单内容
- `ContextMenuSeparator` - 分隔线
- `ContextMenuLabel` - 标签文本
- `ContextMenuShortcut` - 快捷键显示

## 使用示例

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuRadioGroup,
  ContextMenuLabel,
} from '@/components/ui/context-menu';

// 基础右键菜单
function BasicContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed text-sm">
        右键点击这里
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          复制
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          粘贴
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          删除
          <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// 多级子菜单
function NestedContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed text-sm">
        右键查看更多选项
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>打开</ContextMenuItem>
        <ContextMenuItem>重命名</ContextMenuItem>
        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger>发送到</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>邮件</ContextMenuItem>
            <ContextMenuItem>蓝牙设备</ContextMenuItem>
            <ContextMenuItem>压缩文件夹</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>桌面（创建快捷方式）</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger>打开方式</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>记事本</ContextMenuItem>
            <ContextMenuItem>VS Code</ContextMenuItem>
            <ContextMenuItem>浏览器</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>选择其他应用</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />
        <ContextMenuItem>属性</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// 带复选框和单选的菜单
function CheckboxRadioContextMenu() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [view, setView] = useState('list');

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed text-sm">
        右键查看选项
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>查看选项</ContextMenuLabel>
        <ContextMenuSeparator />

        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          显示书签栏
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={setShowFullUrls}
        >
          显示完整网址
        </ContextMenuCheckboxItem>

        <ContextMenuSeparator />
        <ContextMenuLabel>视图模式</ContextMenuLabel>
        <ContextMenuRadioGroup value={view} onValueChange={setView}>
          <ContextMenuRadioItem value="list">列表视图</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grid">网格视图</ContextMenuRadioItem>
          <ContextMenuRadioItem value="card">卡片视图</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// 文件管理器风格菜单
function FileManagerContextMenu() {
  const handleAction = (action: string) => {
    console.log(`执行操作: ${action}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-60 w-60 items-center justify-center rounded-md border border-dashed text-sm bg-gray-50">
        <div className="text-center">
          <FolderIcon className="mx-auto h-8 w-8 mb-2" />
          <div>我的文档</div>
          <div className="text-xs text-gray-500 mt-1">右键查看操作</div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem onSelect={() => handleAction('打开')}>
          <FolderOpenIcon className="mr-2 h-4 w-4" />
          打开
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleAction('新窗口打开')}>
          <ExternalLinkIcon className="mr-2 h-4 w-4" />
          在新窗口中打开
        </ContextMenuItem>
        <ContextMenuSeparator />

        <ContextMenuItem onSelect={() => handleAction('复制')}>
          <CopyIcon className="mr-2 h-4 w-4" />
          复制
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleAction('剪切')}>
          <ScissorsIcon className="mr-2 h-4 w-4" />
          剪切
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleAction('重命名')}>
          <PencilIcon className="mr-2 h-4 w-4" />
          重命名
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={() => handleAction('删除')}
          className="text-red-600 focus:text-red-600"
        >
          <TrashIcon className="mr-2 h-4 w-4" />
          删除
          <ContextMenuShortcut>Del</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => handleAction('属性')}>
          <InfoIcon className="mr-2 h-4 w-4" />
          属性
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

// 图像编辑器风格菜单
function ImageEditorContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="relative">
        <img
          src="/demo-image.jpg"
          alt="示例图片"
          className="h-48 w-48 rounded-md object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-sm opacity-0 hover:opacity-100 transition-opacity">
          右键编辑
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          <CropIcon className="mr-2 h-4 w-4" />
          裁剪
        </ContextMenuItem>
        <ContextMenuItem>
          <RotateIcon className="mr-2 h-4 w-4" />
          旋转
        </ContextMenuItem>
        <ContextMenuItem>
          <FlipIcon className="mr-2 h-4 w-4" />
          翻转
        </ContextMenuItem>
        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FilterIcon className="mr-2 h-4 w-4" />
            滤镜
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>黑白</ContextMenuItem>
            <ContextMenuItem>复古</ContextMenuItem>
            <ContextMenuItem>暖色调</ContextMenuItem>
            <ContextMenuItem>冷色调</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <AdjustmentsIcon className="mr-2 h-4 w-4" />
            调整
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>亮度/对比度</ContextMenuItem>
            <ContextMenuItem>色彩平衡</ContextMenuItem>
            <ContextMenuItem>饱和度</ContextMenuItem>
            <ContextMenuItem>色调</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />
        <ContextMenuItem>
          <SaveIcon className="mr-2 h-4 w-4" />
          另存为
          <ContextMenuShortcut>⌘⇧S</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## API 接口

### ContextMenu Props

继承 Radix UI ContextMenuPrimitive.Root 的所有属性：

| 属性         | 类型                      | 默认值 | 描述                  |
| ------------ | ------------------------- | ------ | --------------------- |
| onOpenChange | `(open: boolean) => void` | -      | 菜单开启/关闭时的回调 |
| modal        | `boolean`                 | `true` | 是否为模态模式        |

### ContextMenuTrigger Props

| 属性     | 类型        | 默认值  | 描述               |
| -------- | ----------- | ------- | ------------------ |
| children | `ReactNode` | -       | 触发器内容         |
| asChild  | `boolean`   | `false` | 是否作为子元素渲染 |

### ContextMenuItem Props

| 属性      | 类型                     | 默认值  | 描述          |
| --------- | ------------------------ | ------- | ------------- |
| onSelect  | `(event: Event) => void` | -       | 选择时的回调  |
| disabled  | `boolean`                | `false` | 是否禁用      |
| inset     | `boolean`                | `false` | 是否缩进显示  |
| className | `string`                 | -       | 自定义CSS类名 |

### ContextMenuCheckboxItem Props

| 属性            | 类型                         | 默认值  | 描述         |
| --------------- | ---------------------------- | ------- | ------------ |
| checked         | `boolean \| "indeterminate"` | -       | 选中状态     |
| onCheckedChange | `(checked: boolean) => void` | -       | 状态改变回调 |
| disabled        | `boolean`                    | `false` | 是否禁用     |

### ContextMenuRadioItem Props

| 属性     | 类型      | 默认值  | 描述       |
| -------- | --------- | ------- | ---------- |
| value    | `string`  | -       | 单选项的值 |
| disabled | `boolean` | `false` | 是否禁用   |

## 键盘导航

- `↑↓` - 在菜单项间导航
- `←→` - 在子菜单间导航
- `Enter/Space` - 激活菜单项
- `Escape` - 关闭菜单
- `Tab` - 移动到下一个可获得焦点的元素

## 位置定位

组件会自动处理菜单位置，避免溢出：

- 自动检测边界并调整位置
- 支持多级子菜单的智能定位
- 在移动设备上适应屏幕尺寸

## 样式定制

### 默认样式类

```css
/* 菜单内容 */
.context-menu-content {
  @apply z-50 min-w-[8rem] overflow-hidden rounded-md border 
         bg-popover p-1 text-popover-foreground shadow-md;
}

/* 菜单项 */
.context-menu-item {
  @apply relative flex cursor-default select-none items-center 
         rounded-sm px-2 py-1.5 text-sm outline-none 
         focus:bg-accent focus:text-accent-foreground 
         data-[disabled]:pointer-events-none data-[disabled]:opacity-50;
}

/* 子菜单触发器 */
.context-menu-sub-trigger {
  @apply flex cursor-default select-none items-center rounded-sm 
         px-2 py-1.5 text-sm outline-none focus:bg-accent 
         data-[state=open]:bg-accent;
}
```

### 自定义主题

```tsx
<ContextMenuContent className="border-blue-200 bg-blue-50">
  <ContextMenuItem className="focus:bg-blue-100">
    自定义主题菜单项
  </ContextMenuItem>
</ContextMenuContent>
```

## 最佳实践

1. **合理分组**：使用分隔线和标签组织相关功能
2. **快捷键显示**：为常用操作添加快捷键提示
3. **图标使用**：添加图标提高可识别性
4. **状态反馈**：使用复选框和单选按钮反映当前状态
5. **层级控制**：避免过深的子菜单嵌套（建议不超过3层）

## 实际应用场景

- **文件管理器** - 文件/文件夹操作菜单
- **图像编辑器** - 图片编辑操作菜单
- **代码编辑器** - 代码操作和重构菜单
- **数据表格** - 行/列操作菜单
- **设计工具** - 元素操作和属性设置

## 注意事项

- 移动设备上右键菜单可能不可用，考虑提供替代方案
- 菜单项过多时考虑使用搜索或分页
- 确保菜单在各种屏幕尺寸下都能正常显示
- 子菜单的触发区域要足够大，便于用户操作
- 考虑为重要操作添加确认对话框
