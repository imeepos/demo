/**
 * 复合组件展示区域
 * 职责：展示高级功能组件、图表和复杂交互组件的设计效果
 */

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  Alert,
  AlertDescription,
  AlertTitle,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Progress,
} from '@sker/ui';
import {
  BarChart3,
  Map,
  Database,
  Bell,
  Search,
  TrendingUp,
  AlertTriangle,
  Filter,
  Download,
  Settings,
  Info,
  Calendar,
  MapPin,
  Users,
} from 'lucide-react';
import {
  mockSentimentData,
  mockTrendData,
  mockRegionData,
  mockAlertData,
} from '../../data/showcaseData';

// 模拟组件实现，用于展示设计效果
const MockSentimentOverviewWidget = ({ data }: any) => (
  <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
    <h3 className="text-lg font-semibold mb-4">情感概览</h3>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {data.current.positive}%
        </div>
        <div className="text-sm text-muted-foreground">正面</div>
        <div className="text-xs text-green-600">↑{data.trend.positive}%</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">
          {data.current.negative}%
        </div>
        <div className="text-sm text-muted-foreground">负面</div>
        <div className="text-xs text-red-600">↓{data.trend.negative}%</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-600">
          {data.current.neutral}%
        </div>
        <div className="text-sm text-muted-foreground">中性</div>
        <div className="text-xs text-gray-600">↑{data.trend.neutral}%</div>
      </div>
    </div>
    <div className="text-center text-sm">
      总计: <span className="font-medium">{data.current.total}</span> 条数据
    </div>
  </div>
);

const MockTrendAnalysisChart = ({ data, height }: any) => (
  <div className="border rounded-lg p-4" style={{ height }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">趋势分析</h3>
      <div className="flex gap-2">
        <Badge variant="outline" className="text-xs">
          正面
        </Badge>
        <Badge variant="outline" className="text-xs">
          负面
        </Badge>
        <Badge variant="outline" className="text-xs">
          中性
        </Badge>
      </div>
    </div>
    <div className="h-full bg-gradient-to-t from-gray-50 to-white rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <BarChart3 className="h-12 w-12 mx-auto mb-2" />
        <p className="text-sm">趋势分析图表</p>
        <p className="text-xs">展示 {data.length} 个数据点</p>
      </div>
    </div>
  </div>
);

const MockGeographicDistributionMap = ({ data, height }: any) => (
  <div className="border rounded-lg p-4" style={{ height }}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">地理分布</h3>
      <Button variant="outline" size="sm">
        <Settings className="h-4 w-4 mr-2" />
        设置
      </Button>
    </div>
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 rounded border-2 border-dashed border-gray-200 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <Map className="h-12 w-12 mx-auto mb-2" />
        <p className="text-sm">地理分布图</p>
        <p className="text-xs">覆盖 {data.length} 个地区</p>
      </div>
    </div>
  </div>
);

const MockDataExplorerTable = ({ data, columns }: any) => (
  <div className="border rounded-lg">
    <div className="p-4 border-b bg-muted/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">数据探索表格</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
        </div>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col: any) => (
            <TableHead key={col.key}>{col.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.slice(0, 3).map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{item.publishTime}</TableCell>
            <TableCell>{item.source}</TableCell>
            <TableCell className="max-w-xs truncate">{item.content}</TableCell>
            <TableCell>
              <Badge
                variant={
                  item.sentiment === 'positive' ? 'default' : 'destructive'
                }
              >
                {item.sentiment === 'positive'
                  ? '正面'
                  : item.sentiment === 'negative'
                    ? '负面'
                    : '中性'}
              </Badge>
            </TableCell>
            <TableCell>{item.score.toFixed(1)}</TableCell>
            <TableCell>{item.region}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="p-4 border-t bg-muted/50 text-sm text-muted-foreground">
      显示 3 / {data.length} 条数据
    </div>
  </div>
);

const MockAlertManagementWidget = ({ alerts, maxHeight }: any) => (
  <div className="border rounded-lg" style={{ maxHeight, overflow: 'auto' }}>
    <div className="p-4 border-b bg-muted/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">告警管理</h3>
        <Badge variant="destructive">
          {alerts.filter((a: any) => !a.isRead).length} 未读
        </Badge>
      </div>
    </div>
    <div className="p-4 space-y-3">
      {alerts.slice(0, 4).map((alert: any) => (
        <div
          key={alert.id}
          className="flex items-start gap-3 p-3 border rounded hover:bg-accent/50"
        >
          <div
            className={`w-2 h-2 rounded-full mt-2 ${
              alert.level === 'critical'
                ? 'bg-red-500'
                : alert.level === 'error'
                  ? 'bg-orange-500'
                  : alert.level === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
            }`}
          />
          <div className="flex-1">
            <div className="font-medium text-sm">{alert.title}</div>
            <div className="text-xs text-muted-foreground">{alert.message}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {alert.timestamp}
            </div>
          </div>
          {!alert.isRead && (
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
          )}
        </div>
      ))}
    </div>
  </div>
);

const MockAdvancedSearchPanel = ({ searchConfig }: any) => (
  <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
    <h3 className="text-lg font-semibold mb-4">高级搜索</h3>
    <div className="space-y-4">
      <div>
        <Label htmlFor="search-keywords">关键词搜索</Label>
        <Input
          id="search-keywords"
          placeholder={searchConfig.keywords.placeholder}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>情感倾向</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择情感" />
            </SelectTrigger>
            <SelectContent>
              {searchConfig.filters.sentiment.options.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>数据源</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择数据源" />
            </SelectTrigger>
            <SelectContent>
              {searchConfig.filters.source.options.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button>
          <Search className="h-4 w-4 mr-2" />
          搜索
        </Button>
        <Button variant="outline">重置</Button>
        <Button variant="outline">保存搜索</Button>
      </div>
    </div>
  </div>
);

export function ComplexComponentsSection() {
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    sentiment: [],
    dateRange: null,
    source: [],
  });
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* 组件概述说明 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>复合组件展示</AlertTitle>
        <AlertDescription>
          以下展示的是高级功能组件的设计效果，包括图表、地图、数据表格等复杂交互组件。当前为设计预览版本。
        </AlertDescription>
      </Alert>

      {/* 情感概览组件 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            情感概览组件
          </CardTitle>
          <CardDescription>综合展示情感分析数据和趋势变化</CardDescription>
        </CardHeader>
        <CardContent>
          <MockSentimentOverviewWidget
            data={{
              current: {
                positive: 65,
                negative: 20,
                neutral: 15,
                total: 1234,
              },
              trend: {
                positive: 12,
                negative: -8,
                neutral: 3,
              },
              comparison: {
                period: '上周同期',
                change: 15.6,
                direction: 'up',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* 趋势分析图表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            趋势分析图表
          </CardTitle>
          <CardDescription>时间序列数据的可视化分析图表</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select defaultValue="7days">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">今日</SelectItem>
                    <SelectItem value="7days">近7天</SelectItem>
                    <SelectItem value="30days">近30天</SelectItem>
                    <SelectItem value="90days">近90天</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    正面
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    负面
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    中性
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出图表
              </Button>
            </div>

            <MockTrendAnalysisChart data={mockTrendData} height={400} />
          </div>
        </CardContent>
      </Card>

      {/* 地理分布图 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            地理分布图
          </CardTitle>
          <CardDescription>舆情数据的地理分布可视化展示</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select defaultValue="sentiment">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sentiment">情感分布</SelectItem>
                    <SelectItem value="volume">数量分布</SelectItem>
                    <SelectItem value="activity">活跃度</SelectItem>
                  </SelectContent>
                </Select>
                {selectedRegion && (
                  <Badge variant="outline">已选择: {selectedRegion}</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  设置
                </Button>
              </div>
            </div>

            <MockGeographicDistributionMap data={mockRegionData} height={500} />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              {mockRegionData.map(region => (
                <div
                  key={region.region}
                  className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedRegion(region.region)}
                >
                  <span>{region.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {region.count}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          region.sentiment > 0.7
                            ? '#10b981'
                            : region.sentiment > 0.5
                              ? '#f59e0b'
                              : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据探索表格 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            数据探索表格
          </CardTitle>
          <CardDescription>
            高级数据表格，支持筛选、排序、分页和导出
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MockDataExplorerTable
            data={mockSentimentData}
            columns={[
              {
                key: 'publishTime',
                title: '时间',
                sortable: true,
                filterable: true,
                width: 150,
              },
              {
                key: 'source',
                title: '来源',
                sortable: true,
                filterable: true,
                width: 100,
              },
              {
                key: 'content',
                title: '内容',
                sortable: false,
                filterable: true,
                width: 300,
              },
              {
                key: 'sentiment',
                title: '情感',
                sortable: true,
                filterable: true,
                width: 100,
              },
              {
                key: 'score',
                title: '评分',
                sortable: true,
                filterable: false,
                width: 80,
              },
              {
                key: 'region',
                title: '地区',
                sortable: true,
                filterable: true,
                width: 100,
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* 告警管理组件 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            告警管理组件
          </CardTitle>
          <CardDescription>实时告警监控和管理面板</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>告警统计</AlertTitle>
              <AlertDescription>
                当前有 {mockAlertData.filter(a => !a.isRead).length}{' '}
                个未读告警， 其中{' '}
                {mockAlertData.filter(a => a.level === 'critical').length}{' '}
                个为紧急告警。
              </AlertDescription>
            </Alert>

            <MockAlertManagementWidget alerts={mockAlertData} maxHeight={400} />
          </div>
        </CardContent>
      </Card>

      {/* 高级搜索面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            高级搜索面板
          </CardTitle>
          <CardDescription>复合条件搜索和筛选面板</CardDescription>
        </CardHeader>
        <CardContent>
          <MockAdvancedSearchPanel
            searchConfig={{
              keywords: {
                placeholder: '输入搜索关键词...',
                suggestions: ['产品', '服务', '质量', '价格', '体验'],
              },
              filters: {
                sentiment: {
                  label: '情感倾向',
                  options: [
                    { value: 'positive', label: '正面' },
                    { value: 'negative', label: '负面' },
                    { value: 'neutral', label: '中性' },
                  ],
                },
                source: {
                  label: '数据源',
                  options: [
                    { value: 'weibo', label: '微博' },
                    { value: 'wechat', label: '微信' },
                    { value: 'news', label: '新闻' },
                    { value: 'forum', label: '论坛' },
                  ],
                },
                urgency: {
                  label: '紧急程度',
                  options: [
                    { value: 'low', label: '低' },
                    { value: 'medium', label: '中' },
                    { value: 'high', label: '高' },
                    { value: 'critical', label: '紧急' },
                  ],
                },
              },
              dateRange: {
                label: '时间范围',
                presets: [
                  { value: 'today', label: '今日' },
                  { value: '7days', label: '近7天' },
                  { value: '30days', label: '近30天' },
                  { value: 'custom', label: '自定义' },
                ],
              },
            }}
          />

          {/* 搜索结果展示 */}
          {searchFilters.keyword && (
            <div className="mt-6 p-4 border rounded-lg bg-accent/50">
              <h4 className="font-medium mb-2">当前搜索条件</h4>
              <div className="flex flex-wrap gap-2">
                {searchFilters.keyword && (
                  <Badge variant="outline">
                    关键词: {searchFilters.keyword}
                  </Badge>
                )}
                {searchFilters.sentiment?.map(s => (
                  <Badge key={s} variant="outline">
                    情感: {s}
                  </Badge>
                ))}
                {searchFilters.source?.map(s => (
                  <Badge key={s} variant="outline">
                    来源: {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 组件集成示例 */}
      <Card>
        <CardHeader>
          <CardTitle>组件集成示例</CardTitle>
          <CardDescription>多个复合组件协同工作的真实场景展示</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">监控仪表板</TabsTrigger>
              <TabsTrigger value="analysis">数据分析</TabsTrigger>
              <TabsTrigger value="alerts">告警中心</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MockSentimentOverviewWidget
                  data={{
                    current: {
                      positive: 65,
                      negative: 20,
                      neutral: 15,
                      total: 1234,
                    },
                    trend: { positive: 12, negative: -8, neutral: 3 },
                    comparison: {
                      period: '上周同期',
                      change: 15.6,
                      direction: 'up',
                    },
                  }}
                />
                <MockAlertManagementWidget
                  alerts={mockAlertData.slice(0, 3)}
                  maxHeight={300}
                />
              </div>
              <MockTrendAnalysisChart data={mockTrendData} height={300} />
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <MockGeographicDistributionMap
                  data={mockRegionData}
                  height={400}
                />
                <MockDataExplorerTable
                  data={mockSentimentData.slice(0, 5)}
                  columns={[
                    { key: 'publishTime', title: '时间', width: 120 },
                    { key: 'content', title: '内容', width: 200 },
                    { key: 'sentiment', title: '情感', width: 80 },
                    { key: 'score', title: '评分', width: 80 },
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MockAlertManagementWidget
                    alerts={mockAlertData}
                    maxHeight={500}
                  />
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">告警统计</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">总告警数</span>
                        <Badge>{mockAlertData.length}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">未读告警</span>
                        <Badge variant="destructive">
                          {mockAlertData.filter(a => !a.isRead).length}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">紧急告警</span>
                        <Badge variant="destructive">
                          {
                            mockAlertData.filter(a => a.level === 'critical')
                              .length
                          }
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>系统建议</AlertTitle>
                    <AlertDescription className="text-sm">
                      检测到多个高优先级告警，建议立即处理以防止影响扩大。
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
