/**
 * 布局组件展示区域
 * 职责：展示完整页面布局模板的预览和特性
 */

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Separator,
} from '@sker/ui';
import {
  SentimentDashboardLayout,
  MonitoringCenterLayout,
  ReportGeneratorLayout,
} from '@sker/ui';
import {
  Layout,
  Monitor,
  FileText,
  Maximize2,
  Eye,
  Settings,
  Info,
  Layers,
} from 'lucide-react';
import {
  mockSentimentData,
  mockTrendData,
  mockAlertData,
} from '../../data/showcaseData';

export function LayoutComponentsSection() {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);

  const layoutFeatures = {
    sentiment: [
      '响应式网格布局',
      '情感分析仪表板',
      '实时数据更新',
      '可自定义组件',
      '导出功能集成',
    ],
    monitoring: [
      '实时监控面板',
      '多数据源整合',
      '告警管理系统',
      '地理分布展示',
      '性能优化设计',
    ],
    report: [
      '报告生成向导',
      '模板管理系统',
      '数据筛选器',
      '批量导出功能',
      '预览和编辑',
    ],
  };

  return (
    <div className="space-y-8">
      {/* 布局组件概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            布局组件概览
          </CardTitle>
          <CardDescription>
            完整的页面级布局模板，为不同业务场景提供开箱即用的解决方案
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 情感分析仪表板布局 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Monitor className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">情感分析仪表板</h3>
                  <p className="text-sm text-muted-foreground">
                    SentimentDashboardLayout
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {layoutFeatures.sentiment.map(feature => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      预览
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>情感分析仪表板布局</DialogTitle>
                      <DialogDescription>
                        完整的情感分析数据展示和管理界面
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                      <SentimentDashboardLayout
                        data={{
                          sentiments: mockSentimentData,
                          trends: mockTrendData,
                          alerts: mockAlertData.slice(0, 3),
                          summary: {
                            total: 1234,
                            positive: 789,
                            negative: 245,
                            neutral: 200,
                          },
                        }}
                        onDataRefresh={() => console.log('Data refresh')}
                        onExport={format => console.log('Export:', format)}
                        onSettingsChange={settings =>
                          console.log('Settings:', settings)
                        }
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLayout('sentiment')}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 监控中心布局 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Monitor className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">监控中心</h3>
                  <p className="text-sm text-muted-foreground">
                    MonitoringCenterLayout
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {layoutFeatures.monitoring.map(feature => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      预览
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>监控中心布局</DialogTitle>
                      <DialogDescription>
                        实时监控和告警管理的专业界面
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                      <MonitoringCenterLayout
                        data={{
                          alerts: mockAlertData,
                          metrics: {
                            totalSources: 45,
                            activeMonitors: 12,
                            alertsCount: mockAlertData.length,
                            systemHealth: 98.5,
                          },
                          realtimeData: mockSentimentData.slice(0, 10),
                        }}
                        onAlertAction={(alertId, action) =>
                          console.log('Alert action:', { alertId, action })
                        }
                        onMonitorToggle={monitorId =>
                          console.log('Monitor toggle:', monitorId)
                        }
                        onSystemCheck={() => console.log('System check')}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLayout('monitoring')}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 报告生成器布局 */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">报告生成器</h3>
                  <p className="text-sm text-muted-foreground">
                    ReportGeneratorLayout
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {layoutFeatures.report.map(feature => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      预览
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[90vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>报告生成器布局</DialogTitle>
                      <DialogDescription>
                        专业的报告制作和数据分析工作台
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                      <ReportGeneratorLayout
                        data={{
                          templates: [
                            {
                              id: '1',
                              name: '日度监控报告',
                              category: 'daily',
                            },
                            {
                              id: '2',
                              name: '舆情分析周报',
                              category: 'weekly',
                            },
                            {
                              id: '3',
                              name: '危机处理报告',
                              category: 'crisis',
                            },
                          ],
                          datasets: mockSentimentData,
                          reportConfig: {
                            title: '舆情监控月度报告',
                            period: '2024年1月',
                            includeCharts: true,
                            includeDetails: true,
                          },
                        }}
                        onTemplateSelect={templateId =>
                          console.log('Template selected:', templateId)
                        }
                        onReportGenerate={config =>
                          console.log('Generate report:', config)
                        }
                        onPreview={() => console.log('Preview report')}
                        onExport={format =>
                          console.log('Export report:', format)
                        }
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLayout('report')}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 布局特性详解 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            布局特性详解
          </CardTitle>
          <CardDescription>
            深入了解每个布局组件的设计思路和技术特性
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="responsive" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="responsive">响应式设计</TabsTrigger>
              <TabsTrigger value="performance">性能优化</TabsTrigger>
              <TabsTrigger value="accessibility">无障碍访问</TabsTrigger>
              <TabsTrigger value="customization">自定义配置</TabsTrigger>
            </TabsList>

            <TabsContent value="responsive" className="space-y-4 mt-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>响应式布局设计</AlertTitle>
                <AlertDescription>
                  所有布局组件都采用移动优先的响应式设计，确保在各种设备上都有最佳的用户体验。
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">断点支持</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>移动设备 (≤640px)</span>
                      <Badge variant="outline">单列布局</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>平板设备 (641-1024px)</span>
                      <Badge variant="outline">双列布局</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>桌面设备 (≥1024px)</span>
                      <Badge variant="outline">多列布局</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">自适应特性</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• 组件尺寸自动调整</div>
                    <div>• 导航菜单响应式折叠</div>
                    <div>• 图表和表格自适应缩放</div>
                    <div>• 触摸优化的交互设计</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>性能优化策略</AlertTitle>
                <AlertDescription>
                  采用多种优化技术确保布局组件的高性能表现和流畅的用户体验。
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">加载优化</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• 懒加载重组件</div>
                    <div>• 骨架屏加载状态</div>
                    <div>• 代码分割和按需加载</div>
                    <div>• 图片和资源预加载</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">渲染优化</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• React.memo 减少重渲染</div>
                    <div>• 虚拟滚动处理大数据</div>
                    <div>• 防抖和节流处理</div>
                    <div>• 状态管理优化</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-4 mt-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>无障碍访问支持</AlertTitle>
                <AlertDescription>
                  遵循 WCAG 2.1 标准，确保所有用户都能正常使用布局组件。
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">键盘导航</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• Tab 键顺序逻辑</div>
                    <div>• 焦点状态清晰可见</div>
                    <div>• 快捷键支持</div>
                    <div>• 跳过链接功能</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">屏幕阅读器</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• 语义化 HTML 结构</div>
                    <div>• ARIA 标签完整</div>
                    <div>• 标题层级规范</div>
                    <div>• 状态变化播报</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customization" className="space-y-4 mt-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>自定义配置能力</AlertTitle>
                <AlertDescription>
                  提供丰富的配置选项，满足不同业务场景的个性化需求。
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">主题定制</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• 颜色主题切换</div>
                    <div>• 字体大小调节</div>
                    <div>• 组件间距调整</div>
                    <div>• 品牌色彩适配</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">功能配置</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>• 组件显示/隐藏</div>
                    <div>• 布局模式切换</div>
                    <div>• 数据更新频率</div>
                    <div>• 用户权限控制</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 使用指南 */}
      <Card>
        <CardHeader>
          <CardTitle>使用指南</CardTitle>
          <CardDescription>如何在项目中正确使用和集成布局组件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">基本用法</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
                {`import { SentimentDashboardLayout } from '@sker/ui';

function DashboardPage() {
  return (
    <SentimentDashboardLayout
      data={{
        sentiments: sentimentData,
        trends: trendData,
        alerts: alertData,
        summary: summaryData,
      }}
      onDataRefresh={handleRefresh}
      onExport={handleExport}
      onSettingsChange={handleSettings}
    />
  );
}`}
              </pre>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">配置选项</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="text-sm font-medium">数据配置</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• data: 组件所需的数据对象</div>
                  <div>• refreshInterval: 数据自动刷新间隔</div>
                  <div>• defaultFilters: 默认筛选条件</div>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">交互配置</h5>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• onDataRefresh: 数据刷新回调</div>
                  <div>• onExport: 导出功能回调</div>
                  <div>• onSettingsChange: 设置变更回调</div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">注意事项</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>• 确保传入的数据格式符合组件接口定义</div>
              <div>• 建议使用 React.memo 包装布局组件以优化性能</div>
              <div>• 在数据量大时启用虚拟滚动功能</div>
              <div>• 定期更新组件库版本以获得最新特性和修复</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
