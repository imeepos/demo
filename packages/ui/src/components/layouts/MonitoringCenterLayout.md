# MonitoringCenterLayout - 监测中心布局

## 📋 组件概述

MonitoringCenterLayout 是专为舆情实时监测设计的布局组件，提供多标签页面板和侧滑预警信息流。适用于需要同时监控多个信息源和处理实时预警的场景。

### 核心业务场景

- 实时舆情监测中心
- 多信息源同步监控
- 预警信息快速响应
- 24/7 监控值班系统

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Sheet: 侧滑预警面板
- Tabs: 多标签页监测面板
- Card: 监测内容容器
- Badge: 预警等级标识
- Button: 操作控制按钮
- Scroll Area: 滚动区域
- Alert: 重要提醒信息
- Separator: 内容分隔
```

### 视觉一致性要求

- 深色主题优先（适合长时间监控）
- 高对比度设计确保信息清晰
- 预警色彩系统（红/橙/黄/绿）
- 最小化视觉干扰元素

### 交互行为规范

- 标签页快速切换（支持键盘快捷键）
- 侧滑面板自动收纳
- 实时数据流平滑更新
- 预警信息置顶显示

## 🔧 核心用途

### 主要功能

1. **多源监测**: 同时监控多个信息源
2. **实时预警**: 即时显示和处理预警信息
3. **快速响应**: 提供快捷操作和处理流程
4. **全屏专注**: 支持全屏监控模式

### 适用业务场景

- 政府应急指挥中心
- 企业危机监控室
- 媒体监测工作站
- 安全运营中心

### 用户交互流程

1. 选择监测源标签页
2. 查看实时数据流
3. 接收预警通知
4. 快速处理和标记
5. 切换到其他监测源

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
```

### TypeScript 接口定义

```typescript
interface MonitoringCenterLayoutProps {
  children?: React.ReactNode;
  tabs: MonitoringTab[];
  alerts?: AlertItem[];
  className?: string;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  onAlertAction?: (alertId: string, action: string) => void;
  enableFullscreen?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface MonitoringTab {
  id: string;
  label: string;
  content: React.ReactNode;
  badge?: number;
  urgent?: boolean;
  disabled?: boolean;
}

interface AlertItem {
  id: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  source: string;
  timestamp: Date;
  status: 'new' | 'processing' | 'resolved';
  actions?: AlertAction[];
}

interface AlertAction {
  id: string;
  label: string;
  variant?: 'default' | 'destructive' | 'outline';
  onClick: () => void;
}
```

### 关键实现逻辑

```typescript
const MonitoringCenterLayout = forwardRef<HTMLDivElement, MonitoringCenterLayoutProps>(
  ({
    children,
    tabs = [],
    alerts = [],
    defaultTab,
    onTabChange,
    onAlertAction,
    enableFullscreen = true,
    autoRefresh = true,
    refreshInterval = 30000,
    className,
    ...props
  }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [alertsOpen, setAlertsOpen] = useState(false);

    // 自动刷新逻辑
    useEffect(() => {
      if (!autoRefresh) return;

      const interval = setInterval(() => {
        // 触发数据刷新
        onRefresh?.();
      }, refreshInterval);

      return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval]);

    // 新预警提醒
    useEffect(() => {
      const newAlerts = alerts.filter(alert => alert.status === 'new');
      if (newAlerts.length > 0) {
        setAlertsOpen(true);
      }
    }, [alerts]);

    const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    };

    const criticalAlerts = alerts.filter(alert =>
      alert.level === 'critical' && alert.status === 'new'
    );

    return (
      <div
        className={cn(
          "h-screen flex flex-col bg-background",
          isFullscreen && "fixed inset-0 z-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* 顶部控制栏 */}
        <Card className="rounded-none border-x-0 border-t-0">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">监测中心</h1>
              {criticalAlerts.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {criticalAlerts.length} 紧急预警
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Sheet open={alertsOpen} onOpenChange={setAlertsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    预警中心
                    {alerts.filter(a => a.status === 'new').length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                      >
                        {alerts.filter(a => a.status === 'new').length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-96">
                  <SheetHeader>
                    <SheetTitle>预警信息</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full mt-4">
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <Alert key={alert.id} className="relative">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge
                                  variant={
                                    alert.level === 'critical' ? 'destructive' :
                                    alert.level === 'high' ? 'destructive' :
                                    alert.level === 'medium' ? 'default' : 'secondary'
                                  }
                                >
                                  {alert.level}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {alert.source}
                                </span>
                              </div>
                              <h4 className="font-medium">{alert.title}</h4>
                              <AlertDescription>{alert.description}</AlertDescription>
                              <div className="flex space-x-2 mt-2">
                                {alert.actions?.map((action) => (
                                  <Button
                                    key={action.id}
                                    size="sm"
                                    variant={action.variant}
                                    onClick={() => {
                                      action.onClick();
                                      onAlertAction?.(alert.id, action.id);
                                    }}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {enableFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? '退出全屏' : '全屏'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 主要监测区域 */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
            <div className="border-b bg-muted/50">
              <TabsList className="h-12 p-1 bg-transparent">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    disabled={tab.disabled}
                    className="relative data-[state=active]:bg-background"
                  >
                    {tab.label}
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <Badge
                        variant={tab.urgent ? "destructive" : "secondary"}
                        className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                      >
                        {tab.badge > 99 ? '99+' : tab.badge}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      {tab.content}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
);
```

### 样式和动画规范

```css
/* 预警动画效果 */
@keyframes alert-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.alert-critical {
  @apply animate-pulse border-destructive;
}

/* 标签切换动画 */
.tab-content-enter {
  @apply opacity-0 transform translate-y-2;
}

.tab-content-enter-active {
  @apply opacity-100 transform translate-y-0 transition-all duration-200;
}

/* 全屏模式样式 */
.fullscreen-mode {
  @apply fixed inset-0 z-50 bg-background;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { MonitoringCenterLayout } from "@/components/layouts";

function MonitoringPage() {
  const tabs = [
    {
      id: 'news',
      label: '新闻监测',
      content: <NewsMonitoring />,
      badge: 12
    },
    {
      id: 'social',
      label: '社媒监测',
      content: <SocialMonitoring />,
      badge: 8,
      urgent: true
    },
    {
      id: 'forums',
      label: '论坛监测',
      content: <ForumMonitoring />,
      badge: 3
    }
  ];

  const alerts = [
    {
      id: '1',
      level: 'critical',
      title: '负面舆情激增',
      description: '检测到某品牌相关负面信息大幅增加',
      source: '微博监测',
      timestamp: new Date(),
      status: 'new',
      actions: [
        { id: 'handle', label: '立即处理', variant: 'destructive' },
        { id: 'ignore', label: '忽略', variant: 'outline' }
      ]
    }
  ];

  return (
    <MonitoringCenterLayout
      tabs={tabs}
      alerts={alerts}
      defaultTab="news"
      onTabChange={(tabId) => console.log('切换到:', tabId)}
      onAlertAction={(alertId, action) => console.log('处理预警:', alertId, action)}
    />
  );
}
```

### 高级配置示例

```typescript
function AdvancedMonitoring() {
  const [alerts, setAlerts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // 刷新监测数据
    await fetchLatestData();
    setRefreshing(false);
  };

  return (
    <MonitoringCenterLayout
      tabs={tabs}
      alerts={alerts}
      autoRefresh={true}
      refreshInterval={15000}
      enableFullscreen={true}
      onRefresh={handleRefresh}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性             | 类型                                      | 默认值 | 描述             |
| ---------------- | ----------------------------------------- | ------ | ---------------- |
| tabs             | MonitoringTab[]                           | []     | 监测标签页配置   |
| alerts           | AlertItem[]                               | []     | 预警信息列表     |
| defaultTab       | string                                    | -      | 默认激活的标签页 |
| onTabChange      | (tabId: string) => void                   | -      | 标签页切换回调   |
| onAlertAction    | (alertId: string, action: string) => void | -      | 预警操作回调     |
| enableFullscreen | boolean                                   | true   | 是否启用全屏功能 |
| autoRefresh      | boolean                                   | true   | 是否自动刷新     |
| refreshInterval  | number                                    | 30000  | 刷新间隔（毫秒） |

### 事件回调

- `onTabChange`: 标签页切换时触发
- `onAlertAction`: 预警操作时触发
- `onRefresh`: 自动刷新时触发

## 🎨 最佳实践

### 设计建议

1. 预警信息使用明确的视觉层级
2. 标签页数量控制在 3-6 个为宜
3. 合理使用颜色编码区分优先级
4. 确保在高频更新下的性能表现

### 性能优化

1. 预警列表使用虚拟滚动
2. 标签页内容懒加载
3. 合理的数据缓存策略
4. 避免频繁的全量刷新
