# Command 组件

一个功能强大的命令面板组件集合，基于 cmdk 库构建，提供快速搜索、命令执行和键盘导航功能，适用于构建现代化的命令调色板界面。

## 功能特性

- 🔍 实时搜索和过滤功能
- ⌨️ 完整的键盘导航支持
- 🎯 可组合的模块化设计
- 📱 支持对话框模式显示
- 🔧 灵活的分组和分隔功能
- ♿ 完整的无障碍功能支持
- 🎨 可完全自定义样式

## 组件结构

- `Command` - 根命令容器
- `CommandDialog` - 对话框模式的命令面板
- `CommandInput` - 搜索输入框
- `CommandList` - 命令列表容器
- `CommandEmpty` - 空状态显示
- `CommandGroup` - 命令分组
- `CommandItem` - 单个命令项
- `CommandSeparator` - 分隔线
- `CommandShortcut` - 快捷键显示

## 使用示例

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useState } from 'react';

// 基础命令面板
function BasicCommand() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="搜索命令..." />
      <CommandList>
        <CommandEmpty>未找到相关命令</CommandEmpty>
        <CommandGroup heading="建议">
          <CommandItem>
            <span>新建文件</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>打开文件</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>保存文件</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="设置">
          <CommandItem>
            <span>偏好设置</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>键盘快捷键</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

// 对话框模式
function CommandDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="p-2 border rounded">
        打开命令面板 (⌘K)
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="输入命令或搜索..." />
        <CommandList>
          <CommandEmpty>未找到结果</CommandEmpty>
          <CommandGroup heading="页面导航">
            <CommandItem
              onSelect={() => {
                console.log('导航到首页');
                setOpen(false);
              }}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              <span>首页</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                console.log('导航到设置');
                setOpen(false);
              }}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>设置</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// 复杂的命令搜索
function AdvancedCommand() {
  const [searchValue, setSearchValue] = useState('');

  const commands = [
    {
      group: '文件操作',
      items: [
        { name: '新建文件', shortcut: '⌘N', action: () => console.log('新建') },
        { name: '打开文件', shortcut: '⌘O', action: () => console.log('打开') },
        { name: '保存文件', shortcut: '⌘S', action: () => console.log('保存') },
        {
          name: '另存为',
          shortcut: '⌘⇧S',
          action: () => console.log('另存为'),
        },
      ],
    },
    {
      group: '编辑操作',
      items: [
        { name: '撤销', shortcut: '⌘Z', action: () => console.log('撤销') },
        { name: '重做', shortcut: '⌘⇧Z', action: () => console.log('重做') },
        { name: '复制', shortcut: '⌘C', action: () => console.log('复制') },
        { name: '粘贴', shortcut: '⌘V', action: () => console.log('粘贴') },
      ],
    },
  ];

  return (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput
        placeholder="搜索命令..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>没有找到 "{searchValue}" 相关的命令</CommandEmpty>
        {commands.map((group, index) => (
          <div key={group.group}>
            <CommandGroup heading={group.group}>
              {group.items.map(item => (
                <CommandItem
                  key={item.name}
                  onSelect={() => {
                    item.action();
                    setSearchValue('');
                  }}
                >
                  <span>{item.name}</span>
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            {index < commands.length - 1 && <CommandSeparator />}
          </div>
        ))}
      </CommandList>
    </Command>
  );
}

// 带图标的命令
function IconCommand() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="搜索功能..." />
      <CommandList>
        <CommandEmpty>未找到匹配项</CommandEmpty>
        <CommandGroup heading="应用功能">
          <CommandItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>用户管理</span>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>系统设置</span>
          </CommandItem>
          <CommandItem>
            <DocumentIcon className="mr-2 h-4 w-4" />
            <span>文档中心</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

// 全局快捷键
function GlobalCommandPalette() {
  const [open, setOpen] = useState(false);

  // 监听全局快捷键
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="快速搜索或执行命令..." />
      <CommandList>
        <CommandEmpty>未找到相关命令</CommandEmpty>
        <CommandGroup heading="快速操作">
          <CommandItem onSelect={() => (window.location.href = '/')}>
            回到首页
          </CommandItem>
          <CommandItem onSelect={() => (window.location.href = '/settings')}>
            打开设置
          </CommandItem>
          <CommandItem onSelect={() => window.open('/help', '_blank')}>
            帮助文档
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
```

## API 接口

### Command Props

继承 cmdk Command 组件的所有属性：

| 属性          | 类型                                        | 默认值 | 描述               |
| ------------- | ------------------------------------------- | ------ | ------------------ |
| value         | `string`                                    | -      | 当前选中项的值     |
| onValueChange | `(value: string) => void`                   | -      | 选中项改变时的回调 |
| filter        | `(value: string, search: string) => number` | -      | 自定义过滤函数     |
| shouldFilter  | `boolean`                                   | `true` | 是否启用内置过滤   |
| className     | `string`                                    | -      | 自定义CSS类名      |

### CommandDialog Props

继承 Dialog 组件的所有属性：

| 属性         | 类型                      | 默认值 | 描述           |
| ------------ | ------------------------- | ------ | -------------- |
| open         | `boolean`                 | -      | 对话框开启状态 |
| onOpenChange | `(open: boolean) => void` | -      | 状态改变回调   |
| children     | `ReactNode`               | -      | 对话框内容     |

### CommandInput Props

继承 cmdk CommandInput 的所有属性：

| 属性          | 类型                      | 默认值 | 描述          |
| ------------- | ------------------------- | ------ | ------------- |
| placeholder   | `string`                  | -      | 输入框占位符  |
| value         | `string`                  | -      | 输入值        |
| onValueChange | `(value: string) => void` | -      | 输入改变回调  |
| className     | `string`                  | -      | 自定义CSS类名 |

### CommandItem Props

继承 cmdk CommandItem 的所有属性：

| 属性      | 类型                      | 默认值  | 描述          |
| --------- | ------------------------- | ------- | ------------- |
| value     | `string`                  | -       | 项目的值      |
| onSelect  | `(value: string) => void` | -       | 选择时的回调  |
| disabled  | `boolean`                 | `false` | 是否禁用      |
| className | `string`                  | -       | 自定义CSS类名 |

## 键盘导航

- `↑↓` - 在命令项间导航
- `Enter` - 选择当前高亮的命令项
- `Escape` - 关闭命令面板（对话框模式）
- `⌘K / Ctrl+K` - 通常用作打开命令面板的快捷键

## 搜索和过滤

### 内置过滤

组件默认使用内置的模糊搜索功能：

```tsx
<Command shouldFilter={true}>
  <CommandInput placeholder="搜索..." />
  {/* 会根据输入自动过滤 */}
</Command>
```

### 自定义过滤

```tsx
<Command
  filter={(value, search) => {
    // 返回0-1之间的匹配分数
    if (value.includes(search)) return 1;
    return 0;
  }}
>
  {/* ... */}
</Command>
```

### 禁用过滤

```tsx
<Command shouldFilter={false}>{/* 需要手动控制显示的项目 */}</Command>
```

## 样式定制

### 默认样式类

```css
/* 命令容器 */
.command-root {
  @apply flex h-full w-full flex-col overflow-hidden 
         rounded-md bg-popover text-popover-foreground;
}

/* 搜索输入 */
.command-input {
  @apply flex h-11 w-full rounded-md bg-transparent py-3 text-sm 
         outline-none placeholder:text-muted-foreground 
         disabled:cursor-not-allowed disabled:opacity-50;
}

/* 命令项 */
.command-item {
  @apply relative flex cursor-default select-none items-center 
         rounded-sm px-2 py-1.5 text-sm outline-none 
         data-[selected=true]:bg-accent 
         data-[selected=true]:text-accent-foreground 
         data-[disabled=true]:pointer-events-none 
         data-[disabled=true]:opacity-50;
}
```

### 自定义主题

```tsx
<Command className="border-blue-200 bg-blue-50">
  <CommandInput className="border-b border-blue-200" />
  <CommandList>
    <CommandItem className="data-[selected=true]:bg-blue-100">
      自定义蓝色主题
    </CommandItem>
  </CommandList>
</Command>
```

## 实际应用场景

### 1. 应用内搜索

```tsx
function AppSearch() {
  return (
    <Command>
      <CommandInput placeholder="搜索页面、功能或文档..." />
      <CommandList>
        <CommandGroup heading="页面">
          <CommandItem>用户管理</CommandItem>
          <CommandItem>数据分析</CommandItem>
        </CommandGroup>
        <CommandGroup heading="功能">
          <CommandItem>导出数据</CommandItem>
          <CommandItem>生成报告</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### 2. 代码编辑器命令

```tsx
function EditorCommands() {
  return (
    <Command>
      <CommandInput placeholder="输入命令..." />
      <CommandList>
        <CommandGroup heading="文件">
          <CommandItem>
            新建文件 <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            保存 <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="编辑">
          <CommandItem>
            查找替换 <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            格式化代码 <CommandShortcut>⌥⇧F</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## 最佳实践

1. **快速访问**：提供全局快捷键（如⌘K）快速打开
2. **分组组织**：使用CommandGroup将相关命令分组
3. **视觉提示**：添加图标和快捷键显示
4. **响应式设计**：在移动端考虑触摸友好的设计
5. **性能优化**：大量命令时考虑虚拟化或懒加载

## 注意事项

- 组件依赖于cmdk库，确保正确安装依赖
- 对话框模式需要配合Dialog组件使用
- 搜索功能区分大小写，可通过自定义filter函数调整
- 在大量数据时考虑性能优化，避免渲染过多DOM元素
