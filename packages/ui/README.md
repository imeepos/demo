# @sker/ui

舆情系统专用组件库 · 基于 shadcn/ui

## 组件目录

### 基础组件

**表单控件**
[button](src/components/ui/button.md) · [input](src/components/ui/input.md) · [checkbox](src/components/ui/checkbox.md) · [select](src/components/ui/select.md) · [textarea](src/components/ui/textarea.md) · [radio-group](src/components/ui/radio-group.md) · [switch](src/components/ui/switch.md) · [slider](src/components/ui/slider.md) · [form](src/components/ui/form.md) · [label](src/components/ui/label.md)

**导航组件**
[navigation-menu](src/components/ui/navigation-menu.md) · [menubar](src/components/ui/menubar.md) · [breadcrumb](src/components/ui/breadcrumb.md) · [pagination](src/components/ui/pagination.md) · [tabs](src/components/ui/tabs.md)

**数据展示**
[table](src/components/ui/table.md) · [card](src/components/ui/card.md) · [avatar](src/components/ui/avatar.md) · [badge](src/components/ui/badge.md) · [calendar](src/components/ui/calendar.md) · [skeleton](src/components/ui/skeleton.md) · [progress](src/components/ui/progress.md)

**弹层反馈**
[dialog](src/components/ui/dialog.md) · [alert-dialog](src/components/ui/alert-dialog.md) · [sheet](src/components/ui/sheet.md) · [popover](src/components/ui/popover.md) · [tooltip](src/components/ui/tooltip.md) · [hover-card](src/components/ui/hover-card.md) · [alert](src/components/ui/alert.md) · [sonner](src/components/ui/sonner.md)

**布局容器**
[accordion](src/components/ui/accordion.md) · [collapsible](src/components/ui/collapsible.md) · [resizable](src/components/ui/resizable.md) · [scroll-area](src/components/ui/scroll-area.md) · [separator](src/components/ui/separator.md) · [aspect-ratio](src/components/ui/aspect-ratio.md)

**交互工具**
[command](src/components/ui/command.md) · [dropdown-menu](src/components/ui/dropdown-menu.md) · [context-menu](src/components/ui/context-menu.md)

### 业务组件

**元数据组件**
[QuickActionButton](src/components/elements/QuickActionButton.md) · [SentimentIndicator](src/components/elements/SentimentIndicator.md) · [SourceTag](src/components/elements/SourceTag.md) · [StatusIndicator](src/components/elements/StatusIndicator.md) · [TimelineMarker](src/components/elements/TimelineMarker.md) · [TrendArrow](src/components/elements/TrendArrow.md) · [UrgencyLevel](src/components/elements/UrgencyLevel.md)

**布局模板**
[MonitoringCenterLayout](src/components/layouts/MonitoringCenterLayout.md) · [ReportGeneratorLayout](src/components/layouts/ReportGeneratorLayout.md) · [SentimentDashboardLayout](src/components/layouts/SentimentDashboardLayout.md)

**复合组件**
[AdvancedSearchPanel](src/components/widgets/AdvancedSearchPanel.md) · [AlertManagementWidget](src/components/widgets/AlertManagementWidget.md) · [DataExplorerTable](src/components/widgets/DataExplorerTable.md) · [GeographicDistributionMap](src/components/widgets/GeographicDistributionMap.md) · [SentimentOverviewWidget](src/components/widgets/SentimentOverviewWidget.md) · [TrendAnalysisChart](src/components/widgets/TrendAnalysisChart.md)

## 安装

```bash
npm install @sker/ui
```

## 使用

```tsx
import { Button, Dialog, DialogContent, DialogTrigger } from '@sker/ui';

export default function App() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>打开对话框</Button>
      </DialogTrigger>
      <DialogContent>舆情系统专用对话框</DialogContent>
    </Dialog>
  );
}
```

## 技术栈

React 19 · TypeScript 5.9 · Radix UI · Tailwind CSS 4 · Vite

## 设计原则

极简 · 统一 · 专业 · 性能

---

MIT License
