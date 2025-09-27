# Checkbox 组件

一个基于 Radix UI 构建的现代化复选框组件，提供完整的无障碍功能支持和自定义样式。

## 功能特性

- ✅ 完整的复选框功能（选中/未选中/不确定状态）
- ♿ 完整的无障碍功能和键盘导航支持
- 🎨 现代化的视觉设计，支持主题定制
- 🔄 流畅的状态切换动画
- 🎯 内置对焦状态和禁用状态样式
- 📱 响应式设计，适配各种设备

## 使用示例

```tsx
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

// 基础用法
function BasicCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        同意服务条款
      </label>
    </div>
  );
}

// 不确定状态
function IndeterminateCheckbox() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(
    'indeterminate'
  );

  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <label className="text-sm">
        部分选择 (
        {checked === 'indeterminate' ? '不确定' : checked ? '全选' : '未选'})
      </label>
    </div>
  );
}

// 禁用状态
function DisabledCheckbox() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox disabled checked />
      <label className="text-sm text-muted-foreground">禁用的复选框</label>
    </div>
  );
}

// 复选框组
function CheckboxGroup() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items = [
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
    { id: 'angular', label: 'Angular' },
    { id: 'svelte', label: 'Svelte' },
  ];

  const handleCheckedChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">选择你喜欢的框架：</h3>
      {items.map(item => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            id={item.id}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={checked =>
              handleCheckedChange(item.id, checked as boolean)
            }
          />
          <label htmlFor={item.id} className="text-sm">
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}

// 自定义样式
function CustomStyledCheckbox() {
  return (
    <Checkbox className="border-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white" />
  );
}
```

## API 接口

```tsx
// 继承 Radix UI CheckboxPrimitive.Root 的所有属性
interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
}
```

### 主要 Props

| 属性            | 类型                                            | 默认值  | 描述               |
| --------------- | ----------------------------------------------- | ------- | ------------------ |
| checked         | `boolean \| "indeterminate"`                    | -       | 复选框状态         |
| defaultChecked  | `boolean \| "indeterminate"`                    | -       | 默认状态（非受控） |
| onCheckedChange | `(checked: boolean \| "indeterminate") => void` | -       | 状态改变回调       |
| disabled        | `boolean`                                       | `false` | 是否禁用           |
| required        | `boolean`                                       | `false` | 是否必选           |
| name            | `string`                                        | -       | 表单字段名称       |
| value           | `string`                                        | `"on"`  | 表单提交值         |
| id              | `string`                                        | -       | HTML id 属性       |
| className       | `string`                                        | -       | 自定义CSS类名      |

### 状态属性

复选框通过 `data-*` 属性表示不同状态：

- `data-state="checked"` - 选中状态
- `data-state="unchecked"` - 未选中状态
- `data-state="indeterminate"` - 不确定状态
- `data-disabled` - 禁用状态

## 样式定制

### 默认样式类

```css
.checkbox-root {
  @apply h-4 w-4 shrink-0 rounded-sm border border-primary 
         ring-offset-background focus-visible:outline-none 
         focus-visible:ring-2 focus-visible:ring-ring 
         focus-visible:ring-offset-2 disabled:cursor-not-allowed 
         disabled:opacity-50 data-[state=checked]:bg-primary 
         data-[state=checked]:text-primary-foreground;
}
```

### 自定义样式示例

```tsx
// 改变颜色主题
<Checkbox className="border-green-500 data-[state=checked]:bg-green-500" />

// 改变尺寸
<Checkbox className="h-6 w-6" />

// 圆形复选框
<Checkbox className="rounded-full" />

// 自定义对焦样式
<Checkbox className="focus-visible:ring-blue-500" />
```

## 表单集成

### 与React Hook Form集成

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

function FormWithCheckbox() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      agree: false,
      notifications: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="agree"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <label>我同意服务条款</label>
          </div>
        )}
      />

      <Controller
        name="notifications"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <label>接收邮件通知</label>
          </div>
        )}
      />

      <button type="submit">提交</button>
    </form>
  );
}
```

### 原生表单

```tsx
<form>
  <Checkbox name="newsletter" value="yes" />
  <label>订阅新闻</label>
</form>
```

## 键盘导航

- `Space` - 切换复选框状态
- `Tab` - 移动到下一个可获得焦点的元素
- `Shift + Tab` - 移动到上一个可获得焦点的元素

## 无障碍功能

- 支持屏幕阅读器
- 完整的键盘导航
- 正确的ARIA属性
- 与label元素的关联支持

## 最佳实践

1. **始终提供标签**：使用label元素或aria-label属性
2. **合理使用不确定状态**：用于表示部分选择的情况
3. **表单验证**：在required字段上提供适当的错误提示
4. **视觉层次**：使用间距和字体大小建立清晰的层次
5. **响应式设计**：确保在移动设备上有足够的点击区域

## 注意事项

- 复选框的最小推荐点击区域为44x44像素（移动端）
- 不确定状态通常用于表示"部分选择"，不是第三种独立状态
- 禁用状态下复选框不会响应用户交互
- 在表单中使用时，建议提供name和value属性以便表单提交
