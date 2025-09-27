# Accordion 组件文档

基于 Radix UI 的可折叠内容容器组件，支持单个或多个面板的展开与收起。

## 组件结构

- `Accordion`: 根容器组件，基于 `@radix-ui/react-accordion`
- `AccordionItem`: 单个折叠项容器，默认带有底部边框
- `AccordionTrigger`: 触发器按钮，包含标题和箭头图标
- `AccordionContent`: 可折叠的内容区域，支持平滑动画

## 基本用法

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>第一个标题</AccordionTrigger>
    <AccordionContent>这里是第一个面板的内容</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>第二个标题</AccordionTrigger>
    <AccordionContent>这里是第二个面板的内容</AccordionContent>
  </AccordionItem>
</Accordion>;
```

## 多选模式

```tsx
<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>可同时展开的项目1</AccordionTrigger>
    <AccordionContent>内容1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>可同时展开的项目2</AccordionTrigger>
    <AccordionContent>内容2</AccordionContent>
  </AccordionItem>
</Accordion>
```

## 样式特点

- 触发器支持悬停下划线效果
- 箭头图标支持180度旋转动画（展开时）
- 内容区域支持平滑的展开收起动画
- 使用 Tailwind CSS 的动画类：`animate-accordion-up` 和 `animate-accordion-down`

## 自定义样式

所有组件都支持 `className` 属性进行样式自定义：

```tsx
<AccordionItem className="border-red-200">
  <AccordionTrigger className="text-blue-600">自定义样式标题</AccordionTrigger>
  <AccordionContent className="text-gray-600">自定义样式内容</AccordionContent>
</AccordionItem>
```
