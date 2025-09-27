# Select 组件

基于 `@radix-ui/react-select` 构建的下拉选择组件，提供完整的选择器功能和美观的样式。

## 组件导出

### Select

主容器组件，管理选择状态。

**类型:** 直接导出 `@radix-ui/react-select` 的 `Root` 组件

### SelectGroup

选项分组容器。

**类型:** 直接导出 `@radix-ui/react-select` 的 `Group` 组件

### SelectValue

显示当前选中值的组件。

**类型:** 直接导出 `@radix-ui/react-select` 的 `Value` 组件

### SelectTrigger

触发器按钮，点击展开下拉菜单。

**Props:**

- 继承 `@radix-ui/react-select` 的 `Trigger` 所有属性
- `className?: string` - 额外的CSS类名
- `children: React.ReactNode` - 触发器内容

**默认样式:**

- `h-10 w-full` - 高度和宽度设置
- `border border-input bg-background` - 边框和背景
- `rounded-md px-3 py-2` - 圆角和内边距
- 包含焦点状态和禁用状态样式
- 右侧自动添加 ChevronDown 图标

### SelectContent

下拉内容容器，包含所有选项。

**Props:**

- 继承 `@radix-ui/react-select` 的 `Content` 所有属性
- `className?: string` - 额外的CSS类名
- `children: React.ReactNode` - 下拉内容
- `position?: "item-aligned" | "popper"` - 定位模式，默认 "popper"

**特性:**

- 自动包装在 Portal 中
- 包含上下滚动按钮
- 支持动画进入/退出效果
- 响应式定位

### SelectLabel

选项组标签。

**Props:**

- 继承 `@radix-ui/react-select` 的 `Label` 所有属性
- `className?: string` - 额外的CSS类名

**默认样式:**

- `py-1.5 pl-8 pr-2 text-sm font-semibold` - 内边距和字体

### SelectItem

单个选项组件。

**Props:**

- 继承 `@radix-ui/react-select` 的 `Item` 所有属性
- `className?: string` - 额外的CSS类名
- `children: React.ReactNode` - 选项文本内容

**特性:**

- 左侧显示选中状态指示器（Check 图标）
- 支持焦点和禁用状态
- 自动处理选中状态

### SelectSeparator

选项分割线。

**Props:**

- 继承 `@radix-ui/react-select` 的 `Separator` 所有属性
- `className?: string` - 额外的CSS类名

### SelectScrollUpButton / SelectScrollDownButton

滚动按钮，当选项过多时显示。

**特性:**

- 自动显示/隐藏
- 包含 ChevronUp/ChevronDown 图标

## 使用示例

### 基础选择器

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BasicSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="选择一个选项" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">苹果</SelectItem>
        <SelectItem value="banana">香蕉</SelectItem>
        <SelectItem value="orange">橙子</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### 受控选择器

```jsx
import { useState } from 'react';

export function ControlledSelect() {
  const [value, setValue] = useState('');

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="选择主题" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">浅色主题</SelectItem>
        <SelectItem value="dark">深色主题</SelectItem>
        <SelectItem value="system">跟随系统</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### 分组选择器

```jsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function GroupedSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="选择编程语言" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>前端</SelectLabel>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="react">React</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>后端</SelectLabel>
          <SelectItem value="nodejs">Node.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

### 带分割线的选择器

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectWithSeparator() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="选择操作" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="view">查看</SelectItem>
        <SelectItem value="edit">编辑</SelectItem>
        <SelectSeparator />
        <SelectItem value="delete">删除</SelectItem>
        <SelectItem value="archive">归档</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### 禁用选项

```jsx
export function SelectWithDisabled() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="选择状态" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">活跃</SelectItem>
        <SelectItem value="inactive">未激活</SelectItem>
        <SelectItem value="pending" disabled>
          待审核（不可选）
        </SelectItem>
        <SelectItem value="blocked">已屏蔽</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### 表单中的选择器

```jsx
import { Label } from '@/components/ui/label';

export function FormSelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">分类</Label>
      <Select name="category">
        <SelectTrigger id="category" className="w-full">
          <SelectValue placeholder="请选择分类" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tech">技术</SelectItem>
          <SelectItem value="design">设计</SelectItem>
          <SelectItem value="business">商业</SelectItem>
          <SelectItem value="other">其他</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### 多级选择器

```jsx
export function CascadeSelect() {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

  const cities = {
    guangdong: ['广州', '深圳', '东莞'],
    jiangsu: ['南京', '苏州', '无锡'],
    zhejiang: ['杭州', '宁波', '温州'],
  };

  return (
    <div className="flex space-x-4">
      <Select
        value={province}
        onValueChange={value => {
          setProvince(value);
          setCity(''); // 重置城市选择
        }}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="选择省份" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="guangdong">广东省</SelectItem>
          <SelectItem value="jiangsu">江苏省</SelectItem>
          <SelectItem value="zhejiang">浙江省</SelectItem>
        </SelectContent>
      </Select>

      <Select value={city} onValueChange={setCity} disabled={!province}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="选择城市" />
        </SelectTrigger>
        <SelectContent>
          {province &&
            cities[province]?.map(city => (
              <SelectItem key={city} value={city.toLowerCase()}>
                {city}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
```

## 注意事项

1. **值管理:** 使用 `value` 和 `onValueChange` 进行受控，或使用 `defaultValue` 进行非受控
2. **占位符:** 通过 `SelectValue` 的 `placeholder` 属性设置占位文本
3. **定位:** `SelectContent` 支持 `position` 属性控制下拉框定位方式
4. **滚动:** 当选项过多时，自动显示滚动按钮
5. **无障碍性:** 内置完整的键盘导航和屏幕阅读器支持
6. **表单集成:** 支持原生表单 `name` 属性和表单验证

## 依赖

- `@radix-ui/react-select`
- `lucide-react` (Check, ChevronDown, ChevronUp 图标)
- `@/lib/utils` (cn 函数)
