# UI 组件库文档

基于 Radix UI 和 Tailwind CSS 构建的现代化 React 组件库，提供完整的无障碍功能支持和可定制的设计系统。

## 📚 组件目录

### 🎨 基础UI组件 (ui/)

```
accordion         # 手风琴组件
alert            # 警告提示
alert-dialog     # 警告对话框
aspect-ratio     # 宽高比容器
avatar           # 头像组件
badge            # 徽章标签
breadcrumb       # 面包屑导航
button           # 按钮组件
calendar         # 日历组件
card             # 卡片容器
checkbox         # 复选框
collapsible      # 可折叠容器
command          # 命令面板
context-menu     # 右键菜单
dialog           # 对话框
dropdown-menu    # 下拉菜单
form             # 表单组件
hover-card       # 悬浮卡片
input            # 输入框
label            # 标签文本
menubar          # 菜单栏
navigation-menu  # 导航菜单
pagination       # 分页组件
popover          # 弹出层
progress         # 进度条
radio-group      # 单选按钮组
resizable        # 可调整大小容器
scroll-area      # 滚动区域
select           # 选择器
separator        # 分隔线
sheet            # 侧边抽屉
skeleton         # 骨架屏
slider           # 滑块组件
sonner           # Toast通知
switch           # 开关组件
table            # 表格组件
tabs             # 标签页
textarea         # 多行文本框
tooltip          # 工具提示
```

### 🔧 元素组件 (elements/)

```
QuickActionButton    # 快速操作按钮
SentimentIndicator   # 情感指示器
SourceTag           # 来源标签
StatusIndicator     # 状态指示器
TimelineMarker      # 时间线标记
TrendArrow          # 趋势箭头
UrgencyLevel        # 紧急程度指示器
```

### 📱 布局组件 (layouts/)

```
MonitoringCenterLayout     # 监控中心布局
ReportGeneratorLayout      # 报告生成器布局
SentimentDashboardLayout   # 情感分析仪表板布局
```

### 🧩 复合组件 (widgets/)

```
AdvancedSearchPanel        # 高级搜索面板
AlertManagementWidget      # 告警管理组件
DataExplorerTable         # 数据探索表格
GeographicDistributionMap  # 地理分布图
SentimentOverviewWidget    # 情感概览组件
TrendAnalysisChart        # 趋势分析图表
```

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
