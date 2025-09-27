import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SentimentDashboardLayout, TrendAnalysisChart } from '@sker/ui';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Separator,
  Switch,
  Slider,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@sker/ui';
import {
  Home,
  BarChart3,
  AlertTriangle,
  Settings,
  User,
  Search,
  Bell,
  Filter,
  TrendingUp,
  Activity,
  Keyboard,
  Smartphone,
  Monitor,
  Scale,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Maximize,
  Minimize,
  MousePointer,
  Zap,
  Shield,
} from 'lucide-react';

export const Route = createFileRoute('/layout-basic-demo')({
  component: LayoutBasicDemoPage,
});

function LayoutBasicDemoPage() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [enableResize, setEnableResize] = React.useState(true);
  const [minWidth, setMinWidth] = React.useState(240);
  const [maxWidth, setMaxWidth] = React.useState(400);
  const [logMessages, setLogMessages] = React.useState<string[]>([]);

  // 趋势图表数据
  const trendData = React.useMemo(
    () => [
      {
        timestamp: new Date('2024-01-01'),
        values: { positive: 120, negative: 45, neutral: 80 },
      },
      {
        timestamp: new Date('2024-01-02'),
        values: { positive: 150, negative: 38, neutral: 90 },
        metadata: {
          events: [
            {
              id: '1',
              timestamp: new Date('2024-01-02'),
              title: '正面新闻发布',
              description: '品牌形象得到提升',
              type: 'positive' as const,
              impact: 'medium' as const,
            },
          ],
        },
      },
      {
        timestamp: new Date('2024-01-03'),
        values: { positive: 135, negative: 52, neutral: 85 },
        metadata: {
          anomalies: [
            {
              timestamp: new Date('2024-01-03'),
              value: 52,
              expectedValue: 40,
              deviation: 12,
              severity: 'medium' as const,
            },
          ],
        },
      },
      {
        timestamp: new Date('2024-01-04'),
        values: { positive: 180, negative: 28, neutral: 95 },
      },
      {
        timestamp: new Date('2024-01-05'),
        values: { positive: 165, negative: 35, neutral: 88 },
        metadata: {
          events: [
            {
              id: '2',
              timestamp: new Date('2024-01-05'),
              title: '危机事件处理',
              description: '快速响应负面舆情',
              type: 'crisis' as const,
              impact: 'high' as const,
            },
          ],
        },
      },
      {
        timestamp: new Date('2024-01-06'),
        values: { positive: 145, negative: 42, neutral: 92 },
      },
      {
        timestamp: new Date('2024-01-07'),
        values: { positive: 170, negative: 30, neutral: 98 },
      },
    ],
    []
  );

  const dataSources = React.useMemo(
    () => [
      {
        id: 'positive',
        name: '正面',
        color: '#22c55e',
        enabled: true,
        type: 'sentiment' as const,
      },
      {
        id: 'negative',
        name: '负面',
        color: '#ef4444',
        enabled: true,
        type: 'sentiment' as const,
      },
      {
        id: 'neutral',
        name: '中性',
        color: '#6b7280',
        enabled: false,
        type: 'sentiment' as const,
      },
    ],
    []
  );

  const addLog = (message: string) => {
    setLogMessages(prev => [
      ...prev.slice(-9),
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/20">
        <h2 className="text-lg font-semibold text-foreground">舆情监控</h2>
        <p className="text-sm text-muted-foreground">高级功能演示</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10"
          aria-current="page"
        >
          <Home className="h-4 w-4" />
          <span>仪表板</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 h-10">
          <BarChart3 className="h-4 w-4" />
          <span>数据分析</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 h-10">
          <AlertTriangle className="h-4 w-4" />
          <span>预警管理</span>
          <Badge variant="destructive" className="ml-auto">
            3
          </Badge>
        </Button>

        <Separator className="my-4" />

        <Button variant="ghost" className="w-full justify-start gap-3 h-10">
          <Settings className="h-4 w-4" />
          <span>系统设置</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 h-10">
          <Shield className="h-4 w-4" />
          <span>无障碍功能</span>
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3 h-10">
          <Keyboard className="h-4 w-4" />
          <span>快捷键</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            Ctrl+B
          </Badge>
        </Button>
      </nav>

      <div className="p-4 border-t border-border/20">
        <Button variant="outline" className="w-full justify-start gap-3 h-10">
          <User className="h-4 w-4" />
          <span>用户中心</span>
        </Button>
      </div>
    </div>
  );

  const headerContent = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">
          SentimentDashboardLayout 高级功能演示
        </h1>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Activity className="h-3 w-3" />
          实时监控中
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          {collapsed ? '收起' : '展开'}模式
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">搜索</span>
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">筛选</span>
        </Button>

        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <Badge variant="secondary" className="hidden md:flex">
          <Scale className="h-3 w-3 mr-1" />
          280px
        </Badge>
      </div>
    </div>
  );

  const mainContent = (
    <div className="space-y-6">
      {/* 实时控制面板 */}
      <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            实时功能控制面板
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 侧边栏控制 */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <ToggleLeft className="h-4 w-4" />
                侧边栏控制
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">折叠状态</span>
                  <Switch
                    checked={collapsed}
                    onCheckedChange={checked => {
                      setCollapsed(checked);
                      addLog(`侧边栏${checked ? '折叠' : '展开'}`);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">启用拖拽调节</span>
                  <Switch
                    checked={enableResize}
                    onCheckedChange={checked => {
                      setEnableResize(checked);
                      addLog(`拖拽调节${checked ? '启用' : '禁用'}`);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 尺寸调节 */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Scale className="h-4 w-4" />
                尺寸调节
              </h4>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">拖拽调节宽度</span>
                    <span className="text-xs text-green-600">✅ 可用</span>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-xs text-green-800">
                    <strong>使用方法：</strong>{' '}
                    拖动侧边栏右边缘可以调节宽度。支持最小最大宽度限制。
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">最小宽度</span>
                    <span className="text-xs text-muted-foreground">
                      {minWidth}px
                    </span>
                  </div>
                  <Slider
                    value={[minWidth]}
                    onValueChange={value => {
                      setMinWidth(value[0]);
                      addLog(`最小宽度设置为 ${value[0]}px`);
                    }}
                    min={150}
                    max={300}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">最大宽度</span>
                    <span className="text-xs text-muted-foreground">
                      {maxWidth}px
                    </span>
                  </div>
                  <Slider
                    value={[maxWidth]}
                    onValueChange={value => {
                      setMaxWidth(value[0]);
                      addLog(`最大宽度设置为 ${value[0]}px`);
                    }}
                    min={300}
                    max={600}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 功能演示 */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                功能演示
              </h4>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setCollapsed(!collapsed);
                    addLog(`通过按钮${!collapsed ? '折叠' : '展开'}侧边栏`);
                  }}
                >
                  {collapsed ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  {collapsed ? '展开' : '折叠'}侧边栏
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    const randomWidth = 200 + Math.floor(Math.random() * 200);
                    addLog(`随机调整宽度至 ${randomWidth}px`);
                  }}
                >
                  <MousePointer className="h-4 w-4" />
                  随机调整宽度
                </Button>

                <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                  <div className="flex items-center gap-1 mb-1">
                    <Keyboard className="h-3 w-3" />
                    快捷键提示
                  </div>
                  <div>Ctrl + B: 切换侧边栏</div>
                  <div>Escape: 关闭移动端抽屉</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实时状态监控 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            实时状态监控
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">当前配置状态</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>侧边栏状态:</span>
                  <Badge variant={collapsed ? 'secondary' : 'default'}>
                    {collapsed ? '已折叠' : '已展开'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>拖拽调节:</span>
                  <Badge variant={enableResize ? 'default' : 'secondary'}>
                    {enableResize ? '已启用' : '已禁用'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>切换按钮:</span>
                  <Badge variant="default">显示</Badge>
                </div>
                <div className="flex justify-between">
                  <span>宽度范围:</span>
                  <span className="font-mono">
                    {minWidth}px - {maxWidth}px
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">操作日志</h4>
              <div className="h-32 overflow-auto bg-muted rounded p-2 text-xs font-mono">
                {logMessages.length === 0 ? (
                  <div className="text-muted-foreground">等待操作...</div>
                ) : (
                  logMessages.map((msg, i) => (
                    <div key={i} className="text-green-600">
                      {msg}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总监控数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> 较昨日
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃事件</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> 新增预警
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">情感指数</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">整体情感趋于正面</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">覆盖平台</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">媒体平台监控中</p>
          </CardContent>
        </Card>
      </div>

      {/* 趋势分析图表展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            TrendAnalysisChart 组件演示
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrendAnalysisChart
            data={trendData}
            dataSources={dataSources}
            chartType="line"
            timeRange="7d"
            showAnomalies={true}
            showPrediction={false}
            height={400}
            onChartTypeChange={type => addLog(`图表类型切换为: ${type}`)}
            onTimeRangeChange={range => addLog(`时间范围切换为: ${range}`)}
            onDataSourceChange={sources =>
              addLog(`数据源变更: ${sources.join(', ')}`)
            }
            onExport={format => addLog(`导出图表格式: ${format}`)}
          />
        </CardContent>
      </Card>

      {/* 响应式与移动端功能 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              响应式与移动端
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-500" />
                <span>桌面端: 可拖拽调节侧边栏</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-green-500" />
                <span>移动端: Sheet抽屉式导航</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-purple-500" />
                <span>自适应: 自动切换布局模式</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-orange-500" />
                <span>无障碍: 完整ARIA支持</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted rounded text-xs">
              <div className="font-medium mb-2">🔧 测试建议:</div>
              <div>• 调整浏览器窗口大小观察响应式变化</div>
              <div>• 使用开发者工具模拟移动设备</div>
              <div>• 使用Tab键测试键盘导航</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              高级功能特性
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-indigo-500" />
                <span>Ctrl+B: 快捷键切换侧边栏</span>
              </div>
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4 text-red-500" />
                <span>拖拽边缘: 实时调节宽度</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-cyan-500" />
                <span>渐变动画: 平滑的展开收起</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-pink-500" />
                <span>状态回调: 实时监听变化</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded text-xs">
              <div className="font-medium mb-2">⚡ 性能优化:</div>
              <div>• React.memo 防止不必要重渲染</div>
              <div>• useCallback 优化事件处理</div>
              <div>• CSS动画 硬件加速过渡</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API参数说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            API参数配置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <div className="text-muted-foreground mb-2">{`// 完整配置示例`}</div>
            <div>&lt;SentimentDashboardLayout</div>
            <div className="ml-4 text-blue-600">
              sidebar={`{sidebarContent}`}
            </div>
            <div className="ml-4 text-blue-600">header={`{headerContent}`}</div>
            <div className="ml-4 text-green-600">
              defaultCollapsed={`{${collapsed}}`}
            </div>
            <div className="ml-4 text-green-600">
              enableResize={`{${enableResize}}`}
            </div>
            <div className="ml-4 text-purple-600">
              minSidebarWidth={`{${minWidth}}`}
            </div>
            <div className="ml-4 text-purple-600">
              maxSidebarWidth={`{${maxWidth}}`}
            </div>
            <div className="ml-4 text-orange-600">
              onSidebarToggle={`{(collapsed) => console.log(collapsed)}`}
            </div>
            <div>&gt;</div>
            <div className="ml-4">{`{children}`}</div>
            <div>&lt;/SentimentDashboardLayout&gt;</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SentimentDashboardLayout
      sidebar={sidebarContent}
      header={headerContent}
      defaultCollapsed={collapsed}
      enableResize={enableResize}
      minSidebarWidth={minWidth}
      maxSidebarWidth={maxWidth}
      onSidebarToggle={isCollapsed => {
        setCollapsed(isCollapsed);
        addLog(`回调触发: 侧边栏${isCollapsed ? '折叠' : '展开'}`);
      }}
      className="min-h-screen"
      aria-label="SentimentDashboardLayout高级功能演示页面"
    >
      {mainContent}
    </SentimentDashboardLayout>
  );
}
