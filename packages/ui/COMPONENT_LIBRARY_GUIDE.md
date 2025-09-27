# 舆情基本信息管理系统 UI 组件库使用指南

## 📚 概述

基于 shadcn/ui 构建的舆情管理系统专用组件库，提供完整的 UI 解决方案。追求极致简约的视觉效果，确保代码质量和用户体验。

## 🏗️ 组件架构

### 🔧 基础组件 (UI)

基于 shadcn/ui 的基础组件，**禁止修改**，作为高级组件的构建基础。

### 📐 布局组件 (Layouts)

用于构建页面整体结构的布局组件：

#### SentimentDashboardLayout - 舆情仪表板布局

```typescript
import { SentimentDashboardLayout } from "@sker/ui"

<SentimentDashboardLayout
  sidebar={<NavigationSidebar />}
  header={<TopNavigation />}
  defaultCollapsed={false}
  enableResize={true}
>
  <DashboardContent />
</SentimentDashboardLayout>
```

#### MonitoringCenterLayout - 监测中心布局

```typescript
import { MonitoringCenterLayout } from "@sker/ui"

<MonitoringCenterLayout
  tabs={monitoringTabs}
  alerts={alertData}
  autoRefresh={true}
  refreshInterval={15000}
  onTabChange={(tabId) => switchSource(tabId)}
  onAlertAction={(alertId, action) => handleAlert(alertId, action)}
/>
```

#### ReportGeneratorLayout - 报告生成器布局

```typescript
import { ReportGeneratorLayout } from "@sker/ui"

<ReportGeneratorLayout
  defaultConfig={reportConfig}
  templates={reportTemplates}
  onGenerate={(config, format) => generateReport(config, format)}
  onSaveTemplate={(template) => saveTemplate(template)}
  isGenerating={isGenerating}
  generationProgress={progress}
/>
```

### 🧩 业务组件 (Widgets)

专为舆情业务场景设计的复合组件：

#### SentimentOverviewWidget - 舆情概览组件

```typescript
import { SentimentOverviewWidget } from "@sker/ui"

<SentimentOverviewWidget
  data={{
    total: 15680,
    positive: 8920,
    negative: 3450,
    neutral: 3310,
    trend: { direction: 'up', percentage: 12.5, period: '昨日' },
    lastUpdated: new Date()
  }}
  onDataClick={(type) => filterBySentiment(type)}
  onRefresh={() => fetchLatestData()}
  showTrend={true}
  showComparison={true}
/>
```

#### TrendAnalysisChart - 趋势分析图表

```typescript
import { TrendAnalysisChart } from "@sker/ui"

<TrendAnalysisChart
  data={trendData}
  chartType="line"
  timeRange="7d"
  dataSources={[
    { id: 'positive', name: '正面', color: '#22c55e', enabled: true },
    { id: 'negative', name: '负面', color: '#ef4444', enabled: true }
  ]}
  showAnomalies={true}
  showPrediction={false}
  height={400}
  onExport={(format) => exportChart(format)}
/>
```

#### GeographicDistributionMap - 地理分布图

```typescript
import { GeographicDistributionMap } from "@sker/ui"

<GeographicDistributionMap
  data={geoData}
  viewMode="heatmap"
  mapLevel="province"
  dataMetric="total"
  colorScheme="viridis"
  onRegionClick={(region) => viewRegionDetails(region)}
  showLegend={true}
  height={600}
/>
```

#### AdvancedSearchPanel - 高级搜索面板

```typescript
import { AdvancedSearchPanel } from "@sker/ui"

<AdvancedSearchPanel
  searchConfig={{
    dataSources: [
      { id: 'news', name: '新闻', type: 'news', enabled: true, icon: '📰' },
      { id: 'weibo', name: '微博', type: 'social', enabled: true, icon: '📱' }
    ],
    timeRanges: [
      { id: '24h', name: '最近24小时' },
      { id: '7d', name: '最近7天' }
    ],
    sentimentTypes: [
      { id: 'positive', name: '正面' },
      { id: 'negative', name: '负面' }
    ]
  }}
  suggestions={searchSuggestions}
  recentSearches={recentSearches}
  onSearch={(filters) => performSearch(filters)}
  onSaveSearch={(search) => saveSearch(search)}
  showAdvanced={true}
  showHistory={true}
/>
```

#### AlertManagementWidget - 预警管理组件

```typescript
import { AlertManagementWidget } from "@sker/ui"

<AlertManagementWidget
  alerts={alertData}
  selectedAlerts={selectedAlerts}
  onAlertSelect={setSelectedAlerts}
  onAlertAction={(alertId, action) => handleAlertAction(alertId, action)}
  onBatchAction={(alertIds, action) => handleBatchAction(alertIds, action)}
  showBatchActions={true}
  showStatusFilter={true}
  pageSize={15}
/>
```

#### DataExplorerTable - 数据探索表格

```typescript
import { DataExplorerTable } from "@sker/ui"

<DataExplorerTable
  data={tableData}
  columns={[
    {
      id: 'title',
      key: 'title',
      title: '标题',
      sortable: true,
      filterable: true,
      type: 'text'
    },
    {
      id: 'sentiment',
      key: 'sentiment',
      title: '情感',
      type: 'custom',
      render: (sentiment) => <SentimentIndicator sentiment={sentiment} />
    },
    {
      id: 'timestamp',
      key: 'timestamp',
      title: '时间',
      sortable: true,
      type: 'date'
    }
  ]}
  selectedRows={selectedRows}
  onRowSelect={setSelectedRows}
  onExport={(format, data) => exportData(format, data)}
  enableContextMenu={true}
  showFilters={true}
/>
```

### 🎨 元数据组件 (Elements)

用于构建细节交互的小型组件：

#### SentimentIndicator - 情感指示器

```typescript
import { SentimentIndicator } from "@sker/ui"

<SentimentIndicator
  sentiment="positive"
  score={0.85}
  confidence={0.92}
  showScore={true}
  size="md"
  variant="default"
  onClick={(sentiment) => filterBySentiment(sentiment)}
  animated={true}
/>
```

#### UrgencyLevel - 紧急程度组件

```typescript
import { UrgencyLevel } from "@sker/ui"

<UrgencyLevel
  level="high"
  showProgress={true}
  showLabel={true}
  size="md"
  variant="combined"
  animated={true}
  onClick={(level) => filterByUrgency(level)}
/>
```

#### TrendArrow - 趋势箭头

```typescript
import { TrendArrow } from "@sker/ui"

<TrendArrow
  trend="up"
  percentage={12.5}
  showValue={true}
  size="md"
  animated={true}
/>
```

#### SourceTag - 信息来源标签

```typescript
import { SourceTag } from "@sker/ui"

<SourceTag
  source={{
    id: 'weibo-tech',
    name: '科技微博',
    type: 'social',
    verified: true,
    followers: 1250000,
    url: 'https://weibo.com/tech'
  }}
  showIcon={true}
  showDetails={true}
  onClick={(source) => filterBySource(source.id)}
/>
```

#### TimelineMarker - 时间轴标记

```typescript
import { TimelineMarker } from "@sker/ui"

<TimelineMarker
  event={{
    id: '1',
    timestamp: new Date(),
    title: '负面舆情出现',
    description: '某品牌相关负面信息开始传播',
    type: 'warning',
    icon: '⚠️'
  }}
  position="left"
  showTime={true}
  onClick={(event) => viewEventDetails(event.id)}
/>
```

#### QuickActionButton - 快捷操作按钮

```typescript
import { QuickActionButton } from "@sker/ui"

<QuickActionButton
  primaryAction={{
    id: 'process',
    label: '处理',
    icon: '✅',
    onClick: () => processAlert()
  }}
  secondaryActions={[
    {
      id: 'assign',
      label: '分配',
      icon: '👤',
      onClick: () => assignAlert(),
      shortcut: 'Ctrl+A'
    },
    {
      id: 'escalate',
      label: '升级',
      icon: '⬆️',
      onClick: () => escalateAlert()
    }
  ]}
  size="sm"
  loading={isProcessing}
/>
```

#### StatusIndicator - 状态指示器

```typescript
import { StatusIndicator } from "@sker/ui"

<StatusIndicator
  status="online"
  label="系统在线"
  showLabel={true}
  size="md"
  animated={true}
/>
```

## 🎯 设计原则

### 1. 极致简约

- 去除视觉干扰元素
- 统一的间距和圆角系统
- 最小化色彩使用
- 清晰的信息层级

### 2. 组件组装

- 基于 shadcn/ui 基础组件构建
- 避免重复造轮子
- 保持视觉一致性
- 支持主题定制

### 3. 数据驱动

- 所有数据通过 Props 传入
- 禁止硬编码和 mock 数据
- 支持实时数据更新
- 完整的类型定义

### 4. 响应式设计

- 移动端优先设计
- 自适应布局系统
- 触摸友好的交互
- 合理的断点设置

## 📖 使用最佳实践

### 1. 按需导入

```typescript
// ✅ 推荐：按需导入
import { SentimentIndicator, TrendAnalysisChart } from '@sker/ui';

// ❌ 避免：全量导入
import * as UI from '@sker/ui';
```

### 2. 类型安全

```typescript
// ✅ 使用完整的类型定义
import type { SentimentType, AlertInfo } from '@sker/ui/types';

const sentiment: SentimentType = 'positive';
const alert: AlertInfo = {
  id: '1',
  title: '预警标题',
  level: 'warning',
  status: 'new',
  // ... 其他必需属性
};
```

### 3. 主题一致性

```typescript
// ✅ 使用统一的主题系统
import { ThemeProvider } from "@sker/ui"

function App() {
  return (
    <ThemeProvider theme="dark">
      <YourApp />
    </ThemeProvider>
  )
}
```

### 4. 错误处理

```typescript
// ✅ 提供友好的错误状态
<SentimentOverviewWidget
  data={data}
  isLoading={isLoading}
  error={error}
  onRetry={() => refetchData()}
/>
```

### 5. 性能优化

```typescript
// ✅ 使用 memo 优化重渲染
const MemoizedChart = React.memo(TrendAnalysisChart);

// ✅ 懒加载大型组件
const DataExplorerTable = React.lazy(() =>
  import('@sker/ui').then(module => ({ default: module.DataExplorerTable }))
);
```

## 🛠️ 开发指南

### 添加新组件

1. **确定组件分类**
   - Layouts: 页面整体布局
   - Widgets: 业务功能组件
   - Elements: 原子级交互组件

2. **创建设计文档**

   ```markdown
   # ComponentName - 组件中文名

   ## 📋 组件概述

   ## 🎯 设计准则

   ## 🔧 核心用途

   ## 🛠️ 技术实现

   ## 📝 使用示例

   ## 📖 API 文档

   ## 🎨 最佳实践
   ```

3. **编写组件实现**

   ```typescript
   const ComponentName = forwardRef<HTMLDivElement, ComponentProps>(
     ({ ...props }, ref) => {
       // 组件实现
       return <div ref={ref} {...props} />
     }
   )
   ```

4. **更新导出文件**
   ```typescript
   // src/components/[category]/index.ts
   export { ComponentName } from './ComponentName';
   ```

### 测试组件

```typescript
// 组件测试示例
import { render, screen } from '@testing-library/react'
import { SentimentIndicator } from '@sker/ui'

test('renders sentiment indicator', () => {
  render(<SentimentIndicator sentiment="positive" />)
  expect(screen.getByText('正面')).toBeInTheDocument()
})
```

## 🎨 主题定制

### 内置主题

- `light` - 浅色主题
- `dark` - 深色主题
- `minimal` - 极简主题

### 自定义主题

```typescript
const customTheme = {
  name: 'custom',
  primaryColor: '#3b82f6',
  secondaryColor: '#64748b',
  successColor: '#22c55e',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',
  backgroundColor: '#ffffff',
  textColor: '#1e293b'
}

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

## 📱 响应式支持

所有组件均支持响应式设计：

```typescript
// 自动适配不同屏幕尺寸
<SentimentDashboardLayout
  defaultCollapsed={window.innerWidth < 768}
  enableResize={true}
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* 内容自动调整布局 */}
  </div>
</SentimentDashboardLayout>
```

## ♿ 无障碍访问

组件库遵循 WCAG 2.0 标准：

- 完整的键盘导航支持
- 屏幕阅读器兼容
- 高对比度模式
- 语义化 HTML 结构
- ARIA 属性支持

## 🔍 故障排除

### 常见问题

1. **样式不生效**

   ```typescript
   // 确保导入了样式文件
   import '@sker/ui/styles';
   ```

2. **TypeScript 类型错误**

   ```typescript
   // 确保安装了类型定义
   npm install @types/react @types/react-dom
   ```

3. **组件不显示**

   ```typescript
   // 检查必需的 Props 是否传入
   <SentimentIndicator sentiment="positive" /> // ✅
   <SentimentIndicator /> // ❌ 缺少必需的 sentiment prop
   ```

4. **主题不生效**
   ```typescript
   // 确保组件被 ThemeProvider 包裹
   <ThemeProvider theme="dark">
     <YourComponents />
   </ThemeProvider>
   ```

## 📚 参考资源

- [shadcn/ui 官方文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Radix UI 文档](https://www.radix-ui.com/docs)
- [React 官方文档](https://react.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

---

如有问题或建议，请提交 Issue 或 Pull Request。我们致力于构建最优秀的舆情管理系统 UI 组件库！
