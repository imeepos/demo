# SentimentDashboardLayout - 舆情仪表板布局

## 📋 组件概述

SentimentDashboardLayout 是舆情管理系统的核心仪表板布局组件，提供完整的管理后台界面框架。设计用于展示舆情数据概览、实时监控和分析功能。

### 核心业务场景

- 舆情数据总览展示
- 实时监控大屏
- 多维度数据分析
- 管理员控制面板

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Card: 内容区域容器
- Resizable: 可调整大小的面板分割
- Scroll Area: 长内容滚动区域
- Navigation Menu: 顶部/侧边导航
- Sheet: 侧滑面板（移动端适配）
- Button: 操作按钮
- Separator: 区域分隔线
```

### 视觉一致性要求

- 极简主义设计，避免视觉干扰
- 统一的间距系统（4px 基准）
- 一致的圆角和阴影效果
- 支持深色/浅色主题切换

### 交互行为规范

- 侧边栏支持折叠/展开
- 主内容区域可调整大小
- 响应式布局适配移动端
- 平滑的动画过渡效果

## 🔧 核心用途

### 主要功能

1. **导航管理**: 提供清晰的页面导航结构
2. **内容展示**: 灵活的内容区域布局
3. **工具集成**: 搜索、筛选、设置等工具栏
4. **状态管理**: 全局状态和用户信息显示

### 适用业务场景

- 政府舆情监管平台
- 企业品牌监测系统
- 媒体数据分析平台
- 危机预警管理系统

### 用户交互流程

1. 用户登录进入仪表板
2. 通过侧边导航切换功能模块
3. 在主内容区查看和操作数据
4. 使用工具栏进行搜索和设置

## 📝 使用示例

### 基本使用

```typescript
import { SentimentDashboardLayout } from "@/components/layouts";

function DashboardPage() {
  const sidebar = (
    <nav className="p-4 space-y-2">
      <Button variant="ghost" className="w-full justify-start">
        舆情概览
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        数据分析
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        预警管理
      </Button>
    </nav>
  );

  const header = (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">舆情管理系统</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">设置</Button>
        <Button variant="outline" size="sm">用户</Button>
      </div>
    </div>
  );

  return (
    <SentimentDashboardLayout sidebar={sidebar} header={header}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">仪表板</h2>
        {/* 主要内容 */}
      </div>
    </SentimentDashboardLayout>
  );
}
```

### 高级配置示例

```typescript
function AdvancedDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SentimentDashboardLayout
      defaultCollapsed={false}
      enableResize={true}
      minSidebarWidth={200}
      maxSidebarWidth={350}
      onSidebarToggle={setSidebarCollapsed}
      sidebar={<CustomSidebar collapsed={sidebarCollapsed} />}
      header={<CustomHeader />}
    >
      <DashboardContent />
    </SentimentDashboardLayout>
  );
}
```

## 📖 API 文档

### Props 接口

| 属性             | 类型                         | 默认值 | 描述                 |
| ---------------- | ---------------------------- | ------ | -------------------- |
| children         | ReactNode                    | -      | 主要内容区域         |
| sidebar          | ReactNode                    | -      | 侧边栏内容           |
| header           | ReactNode                    | -      | 顶部导航内容         |
| defaultCollapsed | boolean                      | false  | 侧边栏默认折叠状态   |
| enableResize     | boolean                      | true   | 是否启用调整大小功能 |
| minSidebarWidth  | number                       | 240    | 侧边栏最小宽度       |
| maxSidebarWidth  | number                       | 400    | 侧边栏最大宽度       |
| onSidebarToggle  | (collapsed: boolean) => void | -      | 侧边栏状态变化回调   |

### 事件回调

- `onSidebarToggle`: 侧边栏折叠状态变化时触发
- `onResize`: 面板大小调整时触发

### ref 转发支持

组件支持 forwardRef，可以获取最外层 div 元素的引用。

## 🎨 最佳实践

### 设计建议

1. 侧边栏内容应保持简洁，避免层级过深
2. 主内容区域使用栅格系统布局
3. 合理使用加载状态和错误处理
4. 确保在不同屏幕尺寸下的可用性

### 性能优化

1. 使用 React.memo 优化不必要的重渲染
2. 大量数据使用虚拟滚动
3. 合理的懒加载策略
4. 避免在布局组件中进行复杂计算
