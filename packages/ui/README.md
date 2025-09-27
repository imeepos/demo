# UI 组件库文档

基于 Radix UI 和 Tailwind CSS 构建的现代化 React 组件库，提供完整的无障碍功能支持和可定制的设计系统。

## 📚 组件目录

### 🔧 基础组件

- [Accordion](src/components/ui/accordion.md) - 可折叠内容容器组件
- [Alert](src/components/ui/alert.md) - 警告和通知组件
- [Alert Dialog](src/components/ui/alert-dialog.md) - 警告对话框组件
- [Avatar](src/components/ui/avatar.md) - 用户头像组件
- [Badge](src/components/ui/badge.md) - 标识徽章组件
- [Button](src/components/ui/button.md) - 功能全面的按钮组件

### 📝 表单组件

- [Checkbox](src/components/ui/checkbox.md) - 复选框组件
- [Form](src/components/ui/form.md) - 表单容器组件
- [Input](src/components/ui/input.md) - 输入框组件
- [Label](src/components/ui/label.md) - 标签组件
- [Radio Group](src/components/ui/radio-group.md) - 单选按钮组
- [Select](src/components/ui/select.md) - 下拉选择组件
- [Slider](src/components/ui/slider.md) - 滑动选择器
- [Switch](src/components/ui/switch.md) - 开关切换组件
- [Textarea](src/components/ui/textarea.md) - 多行文本输入框

### 🗂️ 布局组件

- [Aspect Ratio](src/components/ui/aspect-ratio.md) - 宽高比容器
- [Breadcrumb](src/components/ui/breadcrumb.md) - 面包屑导航
- [Calendar](src/components/ui/calendar.md) - 日历组件
- [Card](src/components/ui/card.md) - 卡片容器组件
- [Collapsible](src/components/ui/collapsible.md) - 可折叠容器
- [Resizable](src/components/ui/resizable.md) - 可调整大小的面板
- [Scroll Area](src/components/ui/scroll-area.md) - 滚动区域组件
- [Separator](src/components/ui/separator.md) - 分隔线组件
- [Sheet](src/components/ui/sheet.md) - 侧滑面板组件
- [Skeleton](src/components/ui/skeleton.md) - 骨架屏组件
- [Table](src/components/ui/table.md) - 表格组件
- [Tabs](src/components/ui/tabs.md) - 标签页组件

### 🎯 交互组件

- [Command](src/components/ui/command.md) - 命令面板组件
- [Context Menu](src/components/ui/context-menu.md) - 右键菜单
- [Dialog](src/components/ui/dialog.md) - 对话框组件
- [Dropdown Menu](src/components/ui/dropdown-menu.md) - 下拉菜单
- [Hover Card](src/components/ui/hover-card.md) - 悬浮卡片
- [Menubar](src/components/ui/menubar.md) - 菜单栏组件
- [Navigation Menu](src/components/ui/navigation-menu.md) - 导航菜单
- [Popover](src/components/ui/popover.md) - 弹出层组件
- [Tooltip](src/components/ui/tooltip.md) - 工具提示组件

### 📊 数据展示

- [Pagination](src/components/ui/pagination.md) - 分页组件
- [Progress](src/components/ui/progress.md) - 进度条组件
- [Sonner](src/components/ui/sonner.md) - Toast 通知组件

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 基本使用

```tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

function App() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>打开对话框</Button>
      </DialogTrigger>
      <DialogContent>
        <p>这是一个对话框</p>
      </DialogContent>
    </Dialog>
  );
}
```

## 🎨 设计原则

- **无障碍优先** - 所有组件都遵循 WAI-ARIA 标准
- **响应式设计** - 适配各种设备尺寸
- **主题定制** - 基于 CSS 变量的灵活主题系统
- **TypeScript 支持** - 完整的类型定义
- **模块化设计** - 按需导入，优化包大小

## 🛠️ 技术栈

- **React** - 组件框架
- **Radix UI** - 无头 UI 组件库
- **Tailwind CSS** - 实用程序优先的 CSS 框架
- **Class Variance Authority** - 样式变体管理
- **TypeScript** - 类型安全

## 📖 文档说明

每个组件的文档包含：

- 🎯 **功能特性** - 组件的主要功能
- 🏗️ **组件结构** - 子组件说明
- 💡 **使用示例** - 基础和高级用法
- 📋 **API 接口** - 完整的属性说明
- 🎨 **样式定制** - 自定义样式方法
- ♿ **无障碍功能** - 键盘导航和辅助功能
- 💼 **最佳实践** - 使用建议和注意事项

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个组件库！

## 📄 许可证

MIT License
