# GeographicDistributionMap - 地理分布图组件

## 📋 组件概述

GeographicDistributionMap 是专为舆情地理分布分析设计的地图组件，提供直观的地域数据可视化。支持热力图、气泡图、区域着色等多种展示方式，帮助用户了解舆情在不同地区的分布特征。

### 核心业务场景

- 舆情地域分布分析
- 区域影响力对比
- 热点地区识别监控
- 地理维度数据钻取

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Card: 地图容器和控制面板
- Select: 地图层级和数据维度选择
- Tooltip: 区域数据详情悬浮显示
- Badge: 区域标识和数据标签
- Popover: 区域详细信息弹窗
- Button: 地图操作和导出按钮
- Slider: 热力图强度调节
- Tabs: 地图视图模式切换
```

### 视觉一致性要求

- 清晰的地理边界和区域划分
- 统一的颜色梯度和图例系统
- 响应式地图适配不同屏幕
- 简洁的交互控件设计

### 交互行为规范

- 地图缩放和平移操作
- 区域点击和悬浮效果
- 图层切换和数据筛选
- 多级地理单位钻取

## 🔧 核心用途

### 主要功能

1. **分布展示**: 舆情数据在地图上的分布可视化
2. **热力分析**: 基于数据密度的热力图展示
3. **区域对比**: 不同地区数据的对比分析
4. **层级钻取**: 从国家到省市县的多级钻取

### 适用业务场景

- 政府区域舆情监管
- 企业市场区域分析
- 媒体影响力地域追踪
- 危机事件地理扩散监控

### 用户交互流程

1. 选择地图视图和数据维度
2. 查看整体地域分布概况
3. 点击或缩放查看具体区域
4. 切换图层分析不同指标
5. 导出地图和区域数据

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
```

### TypeScript 接口定义

```typescript
interface GeographicDistributionMapProps {
  data?: GeographicData[];
  viewMode?: MapViewMode;
  mapLevel?: MapLevel;
  dataMetric?: DataMetric;
  className?: string;
  onRegionClick?: (region: RegionInfo) => void;
  onViewModeChange?: (mode: MapViewMode) => void;
  onMapLevelChange?: (level: MapLevel) => void;
  onDataMetricChange?: (metric: DataMetric) => void;
  onExport?: (format: ExportFormat) => void;
  showLegend?: boolean;
  showControls?: boolean;
  height?: number;
  colorScheme?: ColorScheme;
}

interface GeographicData {
  regionId: string;
  regionName: string;
  coordinates: [number, number];
  level: MapLevel;
  parentRegion?: string;
  values: Record<DataMetric, number>;
  metadata?: {
    population?: number;
    area?: number;
    events?: EventInfo[];
  };
}

interface RegionInfo {
  id: string;
  name: string;
  level: MapLevel;
  coordinates: [number, number];
  bounds: [[number, number], [number, number]];
  data: Record<DataMetric, number>;
  ranking?: {
    metric: DataMetric;
    rank: number;
    total: number;
  };
}

interface EventInfo {
  id: string;
  title: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: [number, number];
}

type MapViewMode = 'heatmap' | 'bubble' | 'choropleth' | 'cluster';
type MapLevel = 'country' | 'province' | 'city' | 'district';
type DataMetric =
  | 'total'
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'engagement'
  | 'reach';
type ColorScheme = 'default' | 'viridis' | 'plasma' | 'warm' | 'cool';
type ExportFormat = 'png' | 'svg' | 'pdf' | 'geojson';
```

### 关键实现逻辑

```typescript
const GeographicDistributionMap = forwardRef<HTMLDivElement, GeographicDistributionMapProps>(
  ({
    data = [],
    viewMode = 'heatmap',
    mapLevel = 'province',
    dataMetric = 'total',
    className,
    onRegionClick,
    onViewModeChange,
    onMapLevelChange,
    onDataMetricChange,
    onExport,
    showLegend = true,
    showControls = true,
    height = 500,
    colorScheme = 'default',
    ...props
  }, ref) => {
    const [selectedViewMode, setSelectedViewMode] = useState<MapViewMode>(viewMode);
    const [selectedMapLevel, setSelectedMapLevel] = useState<MapLevel>(mapLevel);
    const [selectedMetric, setSelectedMetric] = useState<DataMetric>(dataMetric);
    const [heatmapIntensity, setHeatmapIntensity] = useState([70]);
    const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);

    // 地图视图模式选项
    const viewModeOptions = [
      { value: 'heatmap', label: '热力图', icon: '🔥', description: '基于数据密度的热力展示' },
      { value: 'bubble', label: '气泡图', icon: '⚪', description: '气泡大小表示数据量' },
      { value: 'choropleth', label: '区域填充', icon: '🗺️', description: '区域颜色深浅表示数据' },
      { value: 'cluster', label: '聚类图', icon: '🎯', description: '数据点聚类展示' }
    ];

    // 地图层级选项
    const mapLevelOptions = [
      { value: 'country', label: '全国', zoom: 4 },
      { value: 'province', label: '省级', zoom: 6 },
      { value: 'city', label: '市级', zoom: 8 },
      { value: 'district', label: '区县', zoom: 10 }
    ];

    // 数据指标选项
    const metricOptions = [
      { value: 'total', label: '总量', color: '#3b82f6' },
      { value: 'positive', label: '正面', color: '#22c55e' },
      { value: 'negative', label: '负面', color: '#ef4444' },
      { value: 'neutral', label: '中性', color: '#6b7280' },
      { value: 'engagement', label: '互动量', color: '#f59e0b' },
      { value: 'reach', label: '覆盖量', color: '#8b5cf6' }
    ];

    // 获取颜色梯度
    const getColorScale = (metric: DataMetric, scheme: ColorScheme) => {
      const baseColors = {
        default: ['#f0f9ff', '#0ea5e9', '#0369a1'],
        viridis: ['#440154', '#3b528b', '#21908c', '#5dc863', '#fde725'],
        plasma: ['#0d0887', '#7e03a8', '#cc4778', '#f89540', '#f0f921'],
        warm: ['#fff5f0', '#fe6100', '#dc2f02'],
        cool: ['#f0f9ff', '#0284c7', '#0c4a6e']
      };
      return baseColors[scheme] || baseColors.default;
    };

    // 计算数据统计
    const getDataStatistics = () => {
      if (!data.length) return null;

      const values = data.map(d => d.values[selectedMetric] || 0);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const total = values.reduce((sum, val) => sum + val, 0);

      return { max, min, avg, total, count: data.length };
    };

    // 处理区域点击
    const handleRegionClick = (region: GeographicData) => {
      const regionInfo: RegionInfo = {
        id: region.regionId,
        name: region.regionName,
        level: region.level,
        coordinates: region.coordinates,
        bounds: [region.coordinates, region.coordinates], // 简化边界
        data: region.values,
        ranking: {
          metric: selectedMetric,
          rank: data.findIndex(d => d.regionId === region.regionId) + 1,
          total: data.length
        }
      };

      setSelectedRegion(regionInfo);
      onRegionClick?.(regionInfo);
    };

    // 处理视图模式变化
    const handleViewModeChange = (mode: MapViewMode) => {
      setSelectedViewMode(mode);
      onViewModeChange?.(mode);
    };

    // 渲染地图内容（占位符，实际需要集成地图库）
    const renderMap = () => {
      const statistics = getDataStatistics();

      return (
        <div
          className="w-full bg-muted/20 rounded-lg flex items-center justify-center relative border-2 border-dashed border-muted-foreground/20"
          style={{ height: `${height}px` }}
        >
          <div className="text-center text-muted-foreground">
            <div className="text-3xl mb-2">🗺️</div>
            <p className="font-medium">地理分布图</p>
            <p className="text-sm">
              {viewModeOptions.find(opt => opt.value === selectedViewMode)?.label} -
              {mapLevelOptions.find(opt => opt.value === selectedMapLevel)?.label}
            </p>
            {statistics && (
              <div className="mt-2 text-xs">
                <p>{statistics.count} 个区域</p>
                <p>总量: {statistics.total.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* 热力图强度控制 */}
          {selectedViewMode === 'heatmap' && (
            <div className="absolute top-4 right-4 bg-background/90 p-2 rounded-lg">
              <div className="text-xs mb-1">热力强度</div>
              <Slider
                value={heatmapIntensity}
                onValueChange={setHeatmapIntensity}
                max={100}
                min={10}
                step={10}
                className="w-20"
              />
            </div>
          )}

          {/* 模拟数据点 */}
          {data.slice(0, 5).map((region, index) => (
            <TooltipProvider key={region.regionId}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`,
                    }}
                    onClick={() => handleRegionClick(region)}
                  >
                    <Badge
                      variant="outline"
                      className="hover:scale-110 transition-transform"
                    >
                      {region.regionName}
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">{region.regionName}</p>
                    <p className="text-sm">
                      {metricOptions.find(m => m.value === selectedMetric)?.label}:
                      {(region.values[selectedMetric] || 0).toLocaleString()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      );
    };

    // 渲染图例
    const renderLegend = () => {
      const statistics = getDataStatistics();
      if (!statistics || !showLegend) return null;

      const colors = getColorScale(selectedMetric, colorScheme);

      return (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">图例</h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs">低</span>
            <div className="flex">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs">高</span>
          </div>
          <div className="text-xs text-muted-foreground">
            范围: {statistics.min.toLocaleString()} - {statistics.max.toLocaleString()}
          </div>
        </div>
      );
    };

    return (
      <Card className={cn("w-full", className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">地理分布</CardTitle>
            {onExport && (
              <Select onValueChange={(format) => onExport(format as ExportFormat)}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="导出" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="geojson">GeoJSON</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* 控制面板 */}
          {showControls && (
            <div className="flex flex-wrap items-center gap-4">
              {/* 视图模式 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">视图:</span>
                <Tabs value={selectedViewMode} onValueChange={handleViewModeChange}>
                  <TabsList className="h-8">
                    {viewModeOptions.map(option => (
                      <TabsTrigger
                        key={option.value}
                        value={option.value}
                        className="text-xs px-2"
                      >
                        {option.icon}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* 地图层级 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">层级:</span>
                <Select
                  value={selectedMapLevel}
                  onValueChange={(value) => {
                    setSelectedMapLevel(value as MapLevel);
                    onMapLevelChange?.(value as MapLevel);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mapLevelOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 数据指标 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">指标:</span>
                <Select
                  value={selectedMetric}
                  onValueChange={(value) => {
                    setSelectedMetric(value as DataMetric);
                    onDataMetricChange?.(value as DataMetric);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {metricOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: option.color }}
                          />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 地图主体 */}
          <div className="relative">
            {renderMap()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 图例 */}
            {renderLegend()}

            {/* 统计信息 */}
            {(() => {
              const stats = getDataStatistics();
              return stats ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">统计信息</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">区域数量:</span>
                      <span>{stats.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">总计:</span>
                      <span>{stats.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">平均值:</span>
                      <span>{Math.round(stats.avg).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">最大值:</span>
                      <span>{stats.max.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* 选中区域信息 */}
            {selectedRegion && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">选中区域</h4>
                <div className="space-y-1 text-sm">
                  <div className="font-medium">{selectedRegion.name}</div>
                  <div className="text-muted-foreground">
                    {selectedRegion.level === 'province' && '省级'}
                    {selectedRegion.level === 'city' && '市级'}
                    {selectedRegion.level === 'district' && '区县级'}
                  </div>
                  <div>
                    {metricOptions.find(m => m.value === selectedMetric)?.label}:
                    {(selectedRegion.data[selectedMetric] || 0).toLocaleString()}
                  </div>
                  {selectedRegion.ranking && (
                    <div className="text-muted-foreground">
                      排名: {selectedRegion.ranking.rank} / {selectedRegion.ranking.total}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

GeographicDistributionMap.displayName = "GeographicDistributionMap";
```

### 样式和动画规范

```css
/* 地图交互动画 */
.map-region:hover {
  @apply transform scale-105 transition-transform duration-200;
}

/* 热力点动画 */
.heatmap-point {
  @apply animate-pulse;
}

/* 区域高亮效果 */
.region-selected {
  @apply ring-2 ring-primary ring-offset-2;
}

/* 图例渐变 */
.legend-gradient {
  background: linear-gradient(to right, var(--colors));
}

/* 缩放控制动画 */
.zoom-control {
  @apply transition-all duration-300 ease-in-out;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { GeographicDistributionMap } from "@/components/widgets";

function GeographicPage() {
  const geoData = [
    {
      regionId: 'beijing',
      regionName: '北京市',
      coordinates: [116.4074, 39.9042] as [number, number],
      level: 'province' as const,
      values: {
        total: 1250,
        positive: 890,
        negative: 180,
        neutral: 180,
        engagement: 450,
        reach: 2100
      }
    },
    {
      regionId: 'shanghai',
      regionName: '上海市',
      coordinates: [121.4737, 31.2304] as [number, number],
      level: 'province' as const,
      values: {
        total: 1180,
        positive: 820,
        negative: 210,
        neutral: 150,
        engagement: 380,
        reach: 1900
      }
    }
  ];

  const handleRegionClick = (region: RegionInfo) => {
    console.log('点击区域:', region.name);
    // 跳转到区域详情页面
  };

  return (
    <GeographicDistributionMap
      data={geoData}
      viewMode="heatmap"
      mapLevel="province"
      dataMetric="total"
      onRegionClick={handleRegionClick}
      height={600}
      showLegend={true}
      showControls={true}
    />
  );
}
```

### 高级配置示例

```typescript
function AdvancedGeographicAnalysis() {
  const [mapData, setMapData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState<MapLevel>('province');

  const handleLevelChange = async (level: MapLevel) => {
    setCurrentLevel(level);
    const data = await fetchGeographicData(level);
    setMapData(data);
  };

  const handleExport = async (format: ExportFormat) => {
    await exportMap(mapData, format, {
      viewMode: 'heatmap',
      level: currentLevel,
      colorScheme: 'viridis'
    });
  };

  return (
    <GeographicDistributionMap
      data={mapData}
      viewMode="choropleth"
      mapLevel={currentLevel}
      dataMetric="negative"
      colorScheme="plasma"
      onMapLevelChange={handleLevelChange}
      onViewModeChange={(mode) => console.log('视图模式:', mode)}
      onDataMetricChange={(metric) => console.log('数据指标:', metric)}
      onExport={handleExport}
      height={700}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性               | 类型                           | 默认值     | 描述             |
| ------------------ | ------------------------------ | ---------- | ---------------- |
| data               | GeographicData[]               | []         | 地理数据数组     |
| viewMode           | MapViewMode                    | 'heatmap'  | 地图视图模式     |
| mapLevel           | MapLevel                       | 'province' | 地图层级         |
| dataMetric         | DataMetric                     | 'total'    | 数据指标         |
| onRegionClick      | (region: RegionInfo) => void   | -          | 区域点击回调     |
| onViewModeChange   | (mode: MapViewMode) => void    | -          | 视图模式变化回调 |
| onMapLevelChange   | (level: MapLevel) => void      | -          | 地图层级变化回调 |
| onDataMetricChange | (metric: DataMetric) => void   | -          | 数据指标变化回调 |
| onExport           | (format: ExportFormat) => void | -          | 导出回调         |
| showLegend         | boolean                        | true       | 是否显示图例     |
| showControls       | boolean                        | true       | 是否显示控制面板 |
| height             | number                         | 500        | 地图高度         |
| colorScheme        | ColorScheme                    | 'default'  | 颜色方案         |

### 事件回调

- `onRegionClick`: 点击地图区域时触发
- `onViewModeChange`: 视图模式切换时触发
- `onMapLevelChange`: 地图层级变化时触发
- `onDataMetricChange`: 数据指标变化时触发
- `onExport`: 导出操作时触发

## 🎨 最佳实践

### 设计建议

1. 颜色编码要直观且符合认知习惯
2. 地图交互要流畅且响应及时
3. 图例和标签要清晰易读
4. 多层级切换要保持上下文连贯

### 性能优化

1. 大数据量时使用地图瓦片和聚类
2. 合理设置地图渲染精度
3. 异步加载地理边界数据
4. 缓存常用的地图视图状态
