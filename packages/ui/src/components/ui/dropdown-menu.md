# DropdownMenu 组件

一个功能丰富的下拉菜单组件集合，基于 Radix UI 构建，支持多级嵌套、复选框、单选按钮等多种菜单项类型，适用于构建各种下拉操作菜单。

## 功能特性

- 🔽 点击触发的下拉菜单
- 📁 支持多级子菜单嵌套
- ✅ 内置复选框和单选按钮菜单项
- ⌨️ 完整的键盘导航支持
- 🎯 智能位置定位，防止边界溢出
- ♿ 完整的无障碍功能支持
- 🎨 可完全自定义样式和主题
- 📱 响应式设计，适配移动端

## 组件结构

- `DropdownMenu` - 根下拉菜单容器
- `DropdownMenuTrigger` - 触发器按钮
- `DropdownMenuContent` - 菜单内容容器
- `DropdownMenuItem` - 基础菜单项
- `DropdownMenuCheckboxItem` - 复选框菜单项
- `DropdownMenuRadioItem` - 单选菜单项
- `DropdownMenuRadioGroup` - 单选组容器
- `DropdownMenuSub` - 子菜单容器
- `DropdownMenuSubTrigger` - 子菜单触发器
- `DropdownMenuSubContent` - 子菜单内容
- `DropdownMenuSeparator` - 分隔线
- `DropdownMenuLabel` - 标签文本
- `DropdownMenuShortcut` - 快捷键显示

## 使用示例

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// 基础下拉菜单
function BasicDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">打开菜单</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>我的账户</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>个人资料</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon className="mr-2 h-4 w-4" />
          <span>账单</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>设置</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>退出登录</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 多级子菜单
function NestedDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">文件操作</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <PlusIcon className="mr-2 h-4 w-4" />
          新建文件
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FolderIcon className="mr-2 h-4 w-4" />
          新建文件夹
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShareIcon className="mr-2 h-4 w-4" />
            <span>分享</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <MailIcon className="mr-2 h-4 w-4" />
              <span>邮件</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              <span>短信</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>复制链接</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <DownloadIcon className="mr-2 h-4 w-4" />
            <span>导出</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF格式</DropdownMenuItem>
            <DropdownMenuItem>Excel格式</DropdownMenuItem>
            <DropdownMenuItem>Word格式</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>自定义格式</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <TrashIcon className="mr-2 h-4 w-4" />
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 带复选框和单选的菜单
function CheckboxRadioDropdownMenu() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState('light');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">视图选项</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>界面显示</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          状态栏
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          活动栏
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          面板
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>主题设置</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">浅色主题</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">深色主题</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">跟随系统</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 用户头像菜单
function UserAvatarMenu() {
  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '/avatar.jpg',
  };

  const handleSignOut = () => {
    console.log('用户退出登录');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <img
            className="h-8 w-8 rounded-full"
            src={user.avatar}
            alt={user.name}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>个人资料</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon className="mr-2 h-4 w-4" />
            <span>账单信息</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>设置</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>退出登录</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 表格行操作菜单
function TableRowActionsMenu({ row }: { row: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">打开菜单</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>操作</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>
          复制ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <EditIcon className="mr-2 h-4 w-4" />
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon className="mr-2 h-4 w-4" />
          复制
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <TrashIcon className="mr-2 h-4 w-4" />
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// 带搜索功能的菜单
function SearchableDropdownMenu() {
  const [searchTerm, setSearchTerm] = useState('');
  const items = [
    '苹果',
    '香蕉',
    '橙子',
    '葡萄',
    '草莓',
    '蓝莓',
    '柠檬',
    '西瓜',
    '菠萝',
    '芒果',
  ];

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">选择水果</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="p-2">
          <input
            type="text"
            placeholder="搜索水果..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded"
          />
        </div>
        <DropdownMenuSeparator />
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>没有找到匹配的水果</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## API 接口

### DropdownMenu Props

继承 Radix UI DropdownMenuPrimitive.Root 的所有属性：

| 属性         | 类型                      | 默认值  | 描述                       |
| ------------ | ------------------------- | ------- | -------------------------- |
| open         | `boolean`                 | -       | 菜单开启状态（受控模式）   |
| defaultOpen  | `boolean`                 | `false` | 默认开启状态（非受控模式） |
| onOpenChange | `(open: boolean) => void` | -       | 状态改变时的回调函数       |
| modal        | `boolean`                 | `true`  | 是否为模态模式             |

### DropdownMenuContent Props

| 属性        | 类型                           | 默认值     | 描述                 |
| ----------- | ------------------------------ | ---------- | -------------------- |
| sideOffset  | `number`                       | `4`        | 相对触发器的偏移距离 |
| align       | `"start" \| "center" \| "end"` | `"center"` | 对齐方式             |
| alignOffset | `number`                       | `0`        | 对齐偏移量           |
| className   | `string`                       | -          | 自定义CSS类名        |

### DropdownMenuItem Props

| 属性      | 类型                     | 默认值  | 描述             |
| --------- | ------------------------ | ------- | ---------------- |
| onSelect  | `(event: Event) => void` | -       | 选择时的回调函数 |
| disabled  | `boolean`                | `false` | 是否禁用         |
| inset     | `boolean`                | `false` | 是否缩进显示     |
| className | `string`                 | -       | 自定义CSS类名    |

### DropdownMenuCheckboxItem Props

| 属性            | 类型                         | 默认值  | 描述         |
| --------------- | ---------------------------- | ------- | ------------ |
| checked         | `boolean \| "indeterminate"` | -       | 选中状态     |
| onCheckedChange | `(checked: boolean) => void` | -       | 状态改变回调 |
| disabled        | `boolean`                    | `false` | 是否禁用     |

### DropdownMenuRadioItem Props

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

### 对齐选项

```tsx
// 右对齐
<DropdownMenuContent align="end">

// 左对齐
<DropdownMenuContent align="start">

// 居中对齐（默认）
<DropdownMenuContent align="center">
```

### 偏移设置

```tsx
// 设置距离触发器的距离
<DropdownMenuContent sideOffset={8}>

// 设置对齐偏移量
<DropdownMenuContent alignOffset={-4}>
```

## 样式定制

### 默认样式类

```css
/* 菜单内容 */
.dropdown-menu-content {
  @apply z-50 min-w-[8rem] overflow-hidden rounded-md border 
         bg-popover p-1 text-popover-foreground shadow-md;
}

/* 菜单项 */
.dropdown-menu-item {
  @apply relative flex cursor-default select-none items-center 
         gap-2 rounded-sm px-2 py-1.5 text-sm outline-none 
         transition-colors focus:bg-accent focus:text-accent-foreground 
         data-[disabled]:pointer-events-none data-[disabled]:opacity-50;
}

/* 子菜单触发器 */
.dropdown-menu-sub-trigger {
  @apply flex cursor-default select-none items-center gap-2 
         rounded-sm px-2 py-1.5 text-sm outline-none 
         focus:bg-accent data-[state=open]:bg-accent;
}
```

### 自定义主题

```tsx
<DropdownMenuContent className="border-green-200 bg-green-50">
  <DropdownMenuItem className="focus:bg-green-100">
    自定义绿色主题
  </DropdownMenuItem>
</DropdownMenuContent>
```

## 最佳实践

1. **合理分组**：使用DropdownMenuLabel和DropdownMenuSeparator组织相关功能
2. **图标使用**：添加图标提高菜单项的可识别性
3. **快捷键提示**：为常用操作添加快捷键显示
4. **状态指示**：使用复选框和单选按钮显示当前状态
5. **层级控制**：避免过深的子菜单嵌套（建议不超过3层）
6. **响应式设计**：在移动端考虑手指操作的便利性

## 实际应用场景

- **用户菜单** - 用户头像点击后的个人操作菜单
- **表格操作** - 数据表格中的行操作菜单
- **文件管理** - 文件/文件夹的操作菜单
- **设置选项** - 应用设置和配置选项
- **工具栏按钮** - 编辑器工具栏的扩展功能

## 注意事项

- 菜单项过多时考虑使用搜索功能或分页
- 在移动设备上确保菜单项有足够的点击区域
- 重要的破坏性操作（如删除）建议使用不同颜色突出显示
- 子菜单的触发区域要足够大，便于用户操作
- 考虑为菜单提供键盘快捷键支持
