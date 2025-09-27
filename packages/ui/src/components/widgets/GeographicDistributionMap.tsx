'use client';

import * as React from 'react';
import { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
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

export interface GeographicDistributionMapProps {
  data?: GeographicData[];
  viewMode?: MapViewMode;
  mapLevel?: MapLevel;
  dataMetric?: DataMetric;
  className?: string;
  onRegionClick?: (region: RegionInfo) => void;
  onViewModeChange?: (mode: MapViewMode) => void;
  onMapLevelChange?: (level: MapLevel) => void;
  onDataMetricChange?: (metric: DataMetric) => void;
  onExport?: (format: GeoExportFormat) => void;
  showLegend?: boolean;
  showControls?: boolean;
  height?: number;
  colorScheme?: ColorScheme;
}

export interface GeographicData {
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

export interface RegionInfo {
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

export interface EventInfo {
  id: string;
  title: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: [number, number];
}

export type MapViewMode = 'heatmap' | 'bubble' | 'choropleth' | 'cluster';
export type MapLevel = 'country' | 'province' | 'city' | 'district';
export type DataMetric =
  | 'total'
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'engagement'
  | 'reach';
export type ColorScheme = 'default' | 'viridis' | 'plasma' | 'warm' | 'cool';
export type GeoExportFormat = 'png' | 'svg' | 'pdf' | 'geojson';

const GeographicDistributionMap = forwardRef<
  HTMLDivElement,
  GeographicDistributionMapProps
>(
  (
    {
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
    },
    ref
  ) => {
    const [selectedViewMode, setSelectedViewMode] =
      useState<MapViewMode>(viewMode);
    const [selectedMapLevel, setSelectedMapLevel] =
      useState<MapLevel>(mapLevel);
    const [selectedMetric, setSelectedMetric] =
      useState<DataMetric>(dataMetric);
    const [heatmapIntensity, setHeatmapIntensity] = useState([70]);
    const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(
      null
    );

    const viewModeOptions = [
      {
        value: 'heatmap',
        label: '热力图',
        icon: '🔥',
        description: '基于数据密度的热力展示',
      },
      {
        value: 'bubble',
        label: '气泡图',
        icon: '⚪',
        description: '气泡大小表示数据量',
      },
      {
        value: 'choropleth',
        label: '区域填充',
        icon: '🗺️',
        description: '区域颜色深浅表示数据',
      },
      {
        value: 'cluster',
        label: '聚类图',
        icon: '🎯',
        description: '数据点聚类展示',
      },
    ];

    const mapLevelOptions = [
      { value: 'country', label: '全国', zoom: 4 },
      { value: 'province', label: '省级', zoom: 6 },
      { value: 'city', label: '市级', zoom: 8 },
      { value: 'district', label: '区县', zoom: 10 },
    ];

    const metricOptions = [
      { value: 'total', label: '总量', color: '#3b82f6' },
      { value: 'positive', label: '正面', color: '#22c55e' },
      { value: 'negative', label: '负面', color: '#ef4444' },
      { value: 'neutral', label: '中性', color: '#6b7280' },
      { value: 'engagement', label: '互动量', color: '#f59e0b' },
      { value: 'reach', label: '覆盖量', color: '#8b5cf6' },
    ];

    const getColorScale = (metric: DataMetric, scheme: ColorScheme) => {
      const baseColors = {
        default: ['#f0f9ff', '#0ea5e9', '#0369a1'],
        viridis: ['#440154', '#3b528b', '#21908c', '#5dc863', '#fde725'],
        plasma: ['#0d0887', '#7e03a8', '#cc4778', '#f89540', '#f0f921'],
        warm: ['#fff5f0', '#fe6100', '#dc2f02'],
        cool: ['#f0f9ff', '#0284c7', '#0c4a6e'],
      };
      return baseColors[scheme] || baseColors.default;
    };

    const getDataStatistics = () => {
      if (!data.length) return null;

      const values = data.map(d => d.values[selectedMetric] || 0);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const total = values.reduce((sum, val) => sum + val, 0);

      return { max, min, avg, total, count: data.length };
    };

    const handleRegionClick = (region: GeographicData) => {
      const regionInfo: RegionInfo = {
        id: region.regionId,
        name: region.regionName,
        level: region.level,
        coordinates: region.coordinates,
        bounds: [region.coordinates, region.coordinates],
        data: region.values,
        ranking: {
          metric: selectedMetric,
          rank: data.findIndex(d => d.regionId === region.regionId) + 1,
          total: data.length,
        },
      };

      setSelectedRegion(regionInfo);
      onRegionClick?.(regionInfo);
    };

    const handleViewModeChange = (mode: MapViewMode) => {
      setSelectedViewMode(mode);
      onViewModeChange?.(mode);
    };

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
              {
                viewModeOptions.find(opt => opt.value === selectedViewMode)
                  ?.label
              }{' '}
              -
              {
                mapLevelOptions.find(opt => opt.value === selectedMapLevel)
                  ?.label
              }
            </p>
            {statistics && (
              <div className="mt-2 text-xs">
                <p>{statistics.count} 个区域</p>
                <p>总量: {statistics.total.toLocaleString()}</p>
              </div>
            )}
          </div>

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
                      {
                        metricOptions.find(m => m.value === selectedMetric)
                          ?.label
                      }
                      :{(region.values[selectedMetric] || 0).toLocaleString()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      );
    };

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
            范围: {statistics.min.toLocaleString()} -{' '}
            {statistics.max.toLocaleString()}
          </div>
        </div>
      );
    };

    return (
      <Card className={cn('w-full', className)} ref={ref} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">地理分布</CardTitle>
            {onExport && (
              <Select
                onValueChange={format => onExport(format as GeoExportFormat)}
              >
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

          {showControls && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">视图:</span>
                <Tabs
                  value={selectedViewMode}
                  onValueChange={value =>
                    handleViewModeChange(value as MapViewMode)
                  }
                >
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

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">层级:</span>
                <Select
                  value={selectedMapLevel}
                  onValueChange={value => {
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

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">指标:</span>
                <Select
                  value={selectedMetric}
                  onValueChange={value => {
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
          <div className="relative">{renderMap()}</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderLegend()}

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
                    {metricOptions.find(m => m.value === selectedMetric)?.label}
                    :
                    {(
                      selectedRegion.data[selectedMetric] || 0
                    ).toLocaleString()}
                  </div>
                  {selectedRegion.ranking && (
                    <div className="text-muted-foreground">
                      排名: {selectedRegion.ranking.rank} /{' '}
                      {selectedRegion.ranking.total}
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

GeographicDistributionMap.displayName = 'GeographicDistributionMap';

export { GeographicDistributionMap };
