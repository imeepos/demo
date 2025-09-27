# UI 组件库文档

基于 Radix UI 和 Tailwind CSS 构建的现代化 React 组件库，提供完整的无障碍功能支持和可定制的设计系统。

## 📚 组件目录

### 🎨 基础UI组件 (ui/)

- [accordion](src/components/ui/accordion.md) - 手风琴组件
- [alert](src/components/ui/alert.md) - 警告提示
- [alert-dialog](src/components/ui/alert-dialog.md) - 警告对话框
- [aspect-ratio](src/components/ui/aspect-ratio.md) - 宽高比容器
- [avatar](src/components/ui/avatar.md) - 头像组件
- [badge](src/components/ui/badge.md) - 徽章标签
- [breadcrumb](src/components/ui/breadcrumb.md) - 面包屑导航
- [button](src/components/ui/button.md) - 按钮组件
- [calendar](src/components/ui/calendar.md) - 日历组件
- [card](src/components/ui/card.md) - 卡片容器
- [checkbox](src/components/ui/checkbox.md) - 复选框
- [collapsible](src/components/ui/collapsible.md) - 可折叠容器
- [command](src/components/ui/command.md) - 命令面板
- [context-menu](src/components/ui/context-menu.md) - 右键菜单
- [dialog](src/components/ui/dialog.md) - 对话框
- [dropdown-menu](src/components/ui/dropdown-menu.md) - 下拉菜单
- [form](src/components/ui/form.md) - 表单组件
- [hover-card](src/components/ui/hover-card.md) - 悬浮卡片
- [input](src/components/ui/input.md) - 输入框
- [label](src/components/ui/label.md) - 标签文本
- [menubar](src/components/ui/menubar.md) - 菜单栏
- [navigation-menu](src/components/ui/navigation-menu.md) - 导航菜单
- [pagination](src/components/ui/pagination.md) - 分页组件
- [popover](src/components/ui/popover.md) - 弹出层
- [progress](src/components/ui/progress.md) - 进度条
- [radio-group](src/components/ui/radio-group.md) - 单选按钮组
- [resizable](src/components/ui/resizable.md) - 可调整大小容器
- [scroll-area](src/components/ui/scroll-area.md) - 滚动区域
- [select](src/components/ui/select.md) - 选择器
- [separator](src/components/ui/separator.md) - 分隔线
- [sheet](src/components/ui/sheet.md) - 侧边抽屉
- [skeleton](src/components/ui/skeleton.md) - 骨架屏
- [slider](src/components/ui/slider.md) - 滑块组件
- [sonner](src/components/ui/sonner.md) - Toast通知
- [switch](src/components/ui/switch.md) - 开关组件
- [table](src/components/ui/table.md) - 表格组件
- [tabs](src/components/ui/tabs.md) - 标签页
- [textarea](src/components/ui/textarea.md) - 多行文本框
- [tooltip](src/components/ui/tooltip.md) - 工具提示

### 🔧 元素组件 (elements/)

- [QuickActionButton](src/components/elements/QuickActionButton.md) - 快速操作按钮
- [SentimentIndicator](src/components/elements/SentimentIndicator.md) - 情感指示器
- [SourceTag](src/components/elements/SourceTag.md) - 来源标签
- [StatusIndicator](src/components/elements/StatusIndicator.md) - 状态指示器
- [TimelineMarker](src/components/elements/TimelineMarker.md) - 时间线标记
- [TrendArrow](src/components/elements/TrendArrow.md) - 趋势箭头
- [UrgencyLevel](src/components/elements/UrgencyLevel.md) - 紧急程度指示器

### 📱 布局组件 (layouts/)

- [MonitoringCenterLayout](src/components/layouts/MonitoringCenterLayout.md) - 监控中心布局
- [ReportGeneratorLayout](src/components/layouts/ReportGeneratorLayout.md) - 报告生成器布局
- [SentimentDashboardLayout](src/components/layouts/SentimentDashboardLayout.md) - 情感分析仪表板布局

### 🧩 复合组件 (widgets/)

- [AdvancedSearchPanel](src/components/widgets/AdvancedSearchPanel.md) - 高级搜索面板
- [AlertManagementWidget](src/components/widgets/AlertManagementWidget.md) - 告警管理组件
- [DataExplorerTable](src/components/widgets/DataExplorerTable.md) - 数据探索表格
- [GeographicDistributionMap](src/components/widgets/GeographicDistributionMap.md) - 地理分布图
- [SentimentOverviewWidget](src/components/widgets/SentimentOverviewWidget.md) - 情感概览组件
- [TrendAnalysisChart](src/components/widgets/TrendAnalysisChart.md) - 趋势分析图表

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 基本使用

```tsx
import { Button } from '@sker/ui';
import { Dialog, DialogContent, DialogTrigger } from '@sker/ui';

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
