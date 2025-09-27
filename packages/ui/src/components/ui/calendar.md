# Calendar 组件

一个强大且可定制的日历组件，基于 react-day-picker 构建，支持日期选择、范围选择和多种显示格式。

## 功能特性

- 📅 完整的日历功能，支持单日和日期范围选择
- 🎨 现代化的UI设计，支持深色模式
- 🌍 国际化支持，可自定义日期格式
- ♿ 完整的键盘导航和无障碍支持
- 🎯 自定义按钮样式和颜色主题
- 📱 响应式设计，适配移动端

## 核心组件

### Calendar

主日历组件，提供完整的日期选择功能。

### CalendarDayButton

自定义的日期按钮组件，处理日期选择交互。

## 使用示例

```tsx
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

// 基础单日选择
function BasicCalendar() {
  const [date, setDate] = useState<Date>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}

// 日期范围选择
function RangeCalendar() {
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
    />
  );
}

// 自定义样式和按钮
function CustomCalendar() {
  return (
    <Calendar
      buttonVariant="outline"
      showOutsideDays={false}
      captionLayout="dropdown"
      className="rounded-md border shadow"
    />
  );
}

// 禁用特定日期
function RestrictedCalendar() {
  const [date, setDate] = useState<Date>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={date => date < new Date() || date < new Date('1900-01-01')}
    />
  );
}
```

## API 接口

### Calendar Props

继承 `react-day-picker` 的所有属性，并添加了以下自定义属性：

| 属性            | 类型                     | 默认值    | 描述                     |
| --------------- | ------------------------ | --------- | ------------------------ |
| buttonVariant   | `ButtonProps["variant"]` | `"ghost"` | 导航按钮的样式变体       |
| showOutsideDays | `boolean`                | `true`    | 是否显示当前月份外的日期 |
| captionLayout   | `"label" \| "dropdown"`  | `"label"` | 月份/年份标题的显示方式  |
| className       | `string`                 | -         | 自定义CSS类名            |
| classNames      | `object`                 | -         | 各个子组件的样式类名     |

### CalendarDayButton Props

| 属性      | 类型          | 描述           |
| --------- | ------------- | -------------- |
| day       | `CalendarDay` | 日期对象       |
| modifiers | `Modifiers`   | 日期状态修饰符 |
| className | `string`      | 自定义CSS类名  |

## 样式定制

### 主要样式类

- `.rdp` - 根容器
- `.rdp-month` - 月份容器
- `.rdp-day_button` - 日期按钮
- `.rdp-day_selected` - 选中的日期
- `.rdp-day_today` - 今天的日期
- `.rdp-day_outside` - 当前月份外的日期

### 自定义类名示例

```tsx
<Calendar
  classNames={{
    day_selected: 'bg-blue-500 text-white',
    day_today: 'bg-accent font-bold',
    nav_button: 'border-2',
  }}
/>
```

## 高级用法

### 多月份显示

```tsx
<Calendar numberOfMonths={2} className="flex" />
```

### 自定义格式化器

```tsx
<Calendar
  formatters={{
    formatMonthDropdown: date =>
      date.toLocaleString('zh-CN', { month: 'long' }),
    formatYearDropdown: date => `${date.getFullYear()}年`,
  }}
/>
```

### 自定义组件

```tsx
<Calendar
  components={{
    Chevron: ({ orientation }) =>
      orientation === 'left' ? <ChevronLeft /> : <ChevronRight />,
  }}
/>
```

## 状态管理

组件通过 `data-*` 属性管理各种状态：

- `data-selected-single` - 单选模式下的选中状态
- `data-range-start` - 范围选择的开始日期
- `data-range-end` - 范围选择的结束日期
- `data-range-middle` - 范围选择的中间日期

## 键盘导航

- `方向键` - 在日期间导航
- `Enter/Space` - 选择当前日期
- `Escape` - 关闭日历（如在弹窗中）
- `PageUp/PageDown` - 切换月份
- `Home/End` - 跳转到月初/月末

## 注意事项

- 组件需要在客户端渲染（使用 "use client" 指令）
- 日期范围选择时，点击已选范围内的日期会重新开始选择
- 外部日期（showOutsideDays=true）点击时不会被选中，仅作展示用途
- 组件会自动处理RTL（从右到左）语言的图标旋转
