# Collapsible 组件

一个简洁的可折叠内容组件集合，基于 Radix UI 构建，提供流畅的展开/收起动画和完整的无障碍功能支持。

## 功能特性

- 🔄 流畅的展开/收起动画
- ♿ 完整的无障碍功能和键盘导航支持
- 🎯 灵活的触发器和内容组合
- 📱 响应式设计，适配各种设备
- 🎨 可完全自定义样式
- 🔧 简单的API设计

## 组件结构

- `Collapsible` - 根组件，管理折叠状态
- `CollapsibleTrigger` - 触发器组件，控制展开/收起
- `CollapsibleContent` - 内容容器，可折叠的内容区域

## 使用示例

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// 基础用法
function BasicCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-100 rounded-lg hover:bg-gray-200">
        <span className="font-medium">点击展开更多信息</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white border border-t-0 rounded-b-lg">
        <p>这里是可折叠的内容。当用户点击触发器时，这部分内容会展开或收起。</p>
        <p>你可以在这里放置任何内容，包括文本、图片、表单等。</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

// 非受控模式
function UncontrolledCollapsible() {
  return (
    <Collapsible defaultOpen={true}>
      <CollapsibleTrigger asChild>
        <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded">
          默认展开的折叠面板
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 bg-blue-25">
        这个面板默认是展开状态的。
      </CollapsibleContent>
    </Collapsible>
  );
}

// FAQ 手风琴效果
function FAQCollapsible() {
  const faqs = [
    {
      question: '什么是React？',
      answer:
        'React是一个用于构建用户界面的JavaScript库，特别适合构建单页应用程序。',
    },
    {
      question: '如何学习React？',
      answer:
        '可以从官方文档开始，然后通过实际项目练习，逐步掌握React的核心概念和最佳实践。',
    },
    {
      question: 'React和Vue有什么区别？',
      answer:
        'React使用JSX和虚拟DOM，更偏向函数式编程；Vue则提供了更简单的模板语法和渐进式的学习曲线。',
    },
  ];

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => (
        <Collapsible key={index}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-white border rounded-lg hover:bg-gray-50">
            <span className="font-medium">{faq.question}</span>
            <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-gray-50 border border-t-0 rounded-b-lg">
            {faq.answer}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

// 嵌套折叠面板
function NestedCollapsible() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full text-left p-4 bg-gray-100 rounded">
        主分类
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 bg-white border rounded-b">
        <Collapsible>
          <CollapsibleTrigger className="w-full text-left p-3 bg-gray-50 rounded">
            子分类 1
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 bg-white">
            子分类 1 的内容
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="w-full text-left p-3 bg-gray-50 rounded mt-2">
            子分类 2
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 bg-white">
            子分类 2 的内容
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  );
}

// 带动画的自定义样式
function AnimatedCollapsible() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="group flex items-center justify-between w-full p-4 text-left border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
        <span className="font-semibold text-blue-700">动画折叠面板</span>
        <ChevronDown className="h-5 w-5 text-blue-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand">
        <div className="p-4 border-2 border-t-0 border-blue-200 rounded-b-lg bg-blue-50">
          <p>这个面板有自定义的展开/收起动画效果。</p>
          <p>使用了CSS动画来创建流畅的过渡效果。</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## API 接口

### Collapsible Props

继承 Radix UI CollapsiblePrimitive.Root 的所有属性：

| 属性         | 类型                      | 默认值  | 描述                       |
| ------------ | ------------------------- | ------- | -------------------------- |
| open         | `boolean`                 | -       | 受控模式下的展开状态       |
| defaultOpen  | `boolean`                 | `false` | 非受控模式下的默认展开状态 |
| onOpenChange | `(open: boolean) => void` | -       | 状态改变时的回调函数       |
| disabled     | `boolean`                 | `false` | 是否禁用组件               |

### CollapsibleTrigger Props

继承 Radix UI CollapsiblePrimitive.CollapsibleTrigger 的所有属性：

| 属性     | 类型      | 默认值  | 描述               |
| -------- | --------- | ------- | ------------------ |
| asChild  | `boolean` | `false` | 是否作为子元素渲染 |
| disabled | `boolean` | `false` | 是否禁用触发器     |

### CollapsibleContent Props

继承 Radix UI CollapsiblePrimitive.CollapsibleContent 的所有属性：

| 属性       | 类型      | 默认值  | 描述                     |
| ---------- | --------- | ------- | ------------------------ |
| forceMount | `boolean` | `false` | 强制挂载内容（用于动画） |

## 状态管理

### 受控模式

```tsx
function ControlledCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {/* ... */}
    </Collapsible>
  );
}
```

### 非受控模式

```tsx
function UncontrolledCollapsible() {
  return <Collapsible defaultOpen={false}>{/* ... */}</Collapsible>;
}
```

## 样式定制

### 数据属性

组件通过 `data-*` 属性表示状态：

- `data-state="open"` - 展开状态
- `data-state="closed"` - 收起状态
- `data-disabled` - 禁用状态

### CSS动画示例

```css
/* 展开动画 */
@keyframes expand {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
    opacity: 1;
  }
}

/* 收起动画 */
@keyframes collapse {
  from {
    height: var(--radix-collapsible-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

.animate-expand {
  animation: expand 200ms ease-out;
}

.animate-collapse {
  animation: collapse 200ms ease-out;
}
```

## 键盘导航

- `Space/Enter` - 激活触发器，切换展开/收起状态
- `Tab` - 在可获得焦点的元素间导航
- `Shift + Tab` - 反向导航

## 无障碍功能

- 自动设置 `aria-expanded` 属性
- 正确的 `aria-controls` 关联
- 支持屏幕阅读器
- 完整的键盘导航支持

## 最佳实践

1. **视觉指示器**：使用图标（如箭头）指示展开/收起状态
2. **平滑动画**：添加适当的过渡动画提升用户体验
3. **内容预览**：可以显示部分内容作为预览
4. **性能考虑**：对于大量内容，考虑使用懒加载
5. **语义化**：为触发器提供清晰的标签文本

## 常见用例

- **FAQ页面** - 问题答案的折叠展示
- **导航菜单** - 子菜单的展开收起
- **内容详情** - 详细信息的按需显示
- **设置面板** - 高级选项的折叠隐藏
- **数据表格** - 行详情的展开查看

## 注意事项

- 内容区域在收起状态下会完全隐藏，不占用DOM空间
- 如需保持内容在DOM中（用于SEO或其他目的），使用 `forceMount` 属性
- 嵌套使用时要注意层级关系和样式继承
- 在移动端确保触发器有足够的点击区域（推荐最小44px）
