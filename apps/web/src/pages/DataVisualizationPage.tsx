/**
 * 专业数据可视化页面
 * 集成 Tremor 和 G2Plot 组件，提供专业的数据可视化体验
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@sker/ui';
import {
  RefreshCw,
  Settings,
  TrendingUp,
  ThumbsUp,
  Minus,
  ThumbsDown,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout';
import {
  mockDashboardData,
  generateDashboardMetrics,
  generateTimeSeriesData,
  generateSentimentTrendData,
  generateHotTopicsData,
  generateGeographicData,
  generateSystemMetricsData,
} from '../data/mockDashboardData';
import {
  // Tremor 组件
  TremorCard,
  TremorMetric,
  TremorText,
  TremorTitle,
  TremorSubtitle,
  ChartWrapper,
  AreaChart,
  BarChart,
  LineChart,
  DonutChart,
  Grid,
  Col,
  Flex,
  ProgressBar,
  Badge,
  colorMapping,
  // G2Plot 组件
  G2LineChart,
  G2BarChart,
  G2PieChart,
  G2AreaChart,
  ChartContainer,
} from '../components/charts';

export const DataVisualizationPage: React.FC = () => {
  const [metrics, setMetrics] = useState(mockDashboardData.metrics);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // 生成模拟时间序列数据
  const [timeSeriesData, setTimeSeriesData] = useState(
    generateTimeSeriesData()
  );
  const [sentimentTrendData, setSentimentTrendData] = useState(
    generateSentimentTrendData()
  );
  const [hotTopicsData, setHotTopicsData] = useState(generateHotTopicsData());
  const [geographicData, setGeographicData] = useState(
    generateGeographicData()
  );
  const [systemMetricsData, setSystemMetricsData] = useState(
    generateSystemMetricsData()
  );

  // 手动刷新数据
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMetrics(generateDashboardMetrics());
      setTimeSeriesData(generateTimeSeriesData());
      setSentimentTrendData(generateSentimentTrendData());
      setHotTopicsData(generateHotTopicsData());
      setGeographicData(generateGeographicData());
      setSystemMetricsData(generateSystemMetricsData());
      setIsLoading(false);
    }, 800);
  };

  // 模拟实时数据更新
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, 15000); // 每15秒更新一次

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            舆情数据可视化中心
          </h1>
          <p className="text-muted-foreground">
            基于 Tremor + AntV G2Plot 构建 · 专业数据分析平台
          </p>
        </div>

        {/* 控制面板 */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            刷新
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {autoRefresh ? '停止自动刷新' : '开启自动刷新'}
          </Button>

          <Badge
            color={isLoading ? 'amber' : autoRefresh ? 'emerald' : 'slate'}
          >
            {isLoading ? '数据更新中' : autoRefresh ? '实时监控' : '手动模式'}
          </Badge>
        </div>
      </div>

      {/* 核心指标卡片 - 使用 Tremor */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Col>
          <TremorCard decoration="top" decorationColor="blue">
            <TremorText>总监控数据</TremorText>
            <TremorMetric>{metrics.totalData.toLocaleString()}</TremorMetric>
            <Flex className="mt-4 items-center">
              <TremorText>较昨日: {metrics.trends.total}</TremorText>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </Flex>
          </TremorCard>
        </Col>

        <Col>
          <TremorCard decoration="top" decorationColor="emerald">
            <TremorText>正面情感</TremorText>
            <TremorMetric>
              {metrics.positiveCount.toLocaleString()}
            </TremorMetric>
            <Flex className="mt-4 items-center">
              <TremorText>
                占比:{' '}
                {((metrics.positiveCount / metrics.totalData) * 100).toFixed(1)}
                %
              </TremorText>
              <ThumbsUp className="h-4 w-4 text-emerald-500" />
            </Flex>
          </TremorCard>
        </Col>

        <Col>
          <TremorCard decoration="top" decorationColor="amber">
            <TremorText>中性情感</TremorText>
            <TremorMetric>{metrics.neutralCount.toLocaleString()}</TremorMetric>
            <Flex className="mt-4 items-center">
              <TremorText>
                占比:{' '}
                {((metrics.neutralCount / metrics.totalData) * 100).toFixed(1)}%
              </TremorText>
              <Minus className="h-4 w-4 text-amber-500" />
            </Flex>
          </TremorCard>
        </Col>

        <Col>
          <TremorCard decoration="top" decorationColor="red">
            <TremorText>负面情感</TremorText>
            <TremorMetric>
              {metrics.negativeCount.toLocaleString()}
            </TremorMetric>
            <Flex className="mt-4 items-center">
              <TremorText>
                占比:{' '}
                {((metrics.negativeCount / metrics.totalData) * 100).toFixed(1)}
                %
              </TremorText>
              <ThumbsDown className="h-4 w-4 text-red-500" />
            </Flex>
          </TremorCard>
        </Col>
      </Grid>

      {/* 主图表区域 */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        {/* 情感趋势分析 - 使用 Tremor AreaChart */}
        <Col numColSpan={1} numColSpanLg={1}>
          <TremorCard>
            <TremorTitle>24小时情感趋势分析</TremorTitle>
            <TremorSubtitle>实时情感变化趋势分析 · 每小时更新</TremorSubtitle>
            <ChartWrapper>
              <AreaChart
                className="mt-6"
                data={sentimentTrendData}
                index="time"
                categories={['positive', 'neutral', 'negative']}
                colors={['emerald', 'amber', 'red']}
                valueFormatter={value => `${value}条`}
                showLegend={true}
                showGridLines={true}
                showXAxis={true}
                showYAxis={true}
                startEndOnly={false}
                connectNulls={true}
                curveType="monotone"
                showAnimation={true}
              />
            </ChartWrapper>
          </TremorCard>
        </Col>

        {/* 情感分布饼图 - 使用 G2Plot */}
        <Col numColSpan={1} numColSpanLg={1}>
          <TremorCard>
            <TremorTitle>当前情感分布状况</TremorTitle>
            <TremorSubtitle>实时情感比例分布 · 基于全网数据</TremorSubtitle>
            <div className="mt-6">
              <G2PieChart
                data={[
                  {
                    type: '正面情感',
                    value: metrics.positiveCount,
                    color: '#10b981',
                  },
                  {
                    type: '中性情感',
                    value: metrics.neutralCount,
                    color: '#f59e0b',
                  },
                  {
                    type: '负面情感',
                    value: metrics.negativeCount,
                    color: '#ef4444',
                  },
                ]}
                angleField="value"
                colorField="type"
                height={300}
                config={{
                  innerRadius: 0.4,
                  statistic: {
                    title: {
                      style: {
                        color: 'hsl(var(--foreground))',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      },
                      content: '数据总量',
                    },
                    content: {
                      style: {
                        color: 'hsl(var(--primary))',
                        fontSize: '24px',
                        fontWeight: 'bold',
                      },
                      content: metrics.totalData.toLocaleString(),
                    },
                  },
                  legend: {
                    position: 'bottom',
                    flipPage: false,
                  },
                  interactions: [
                    { type: 'pie-legend-active' },
                    { type: 'element-active' },
                    { type: 'pie-statistic-active' },
                  ],
                }}
              />
            </div>
          </TremorCard>
        </Col>
      </Grid>

      {/* 次级图表区域 */}
      <Grid numItems={1} numItemsLg={3} className="gap-6">
        {/* 热点话题排行 - 使用 Tremor BarChart */}
        <Col numColSpan={1} numColSpanLg={1}>
          <TremorCard>
            <TremorTitle>热点话题排行榜</TremorTitle>
            <TremorSubtitle>按讨论量排序 · 实时更新</TremorSubtitle>
            <ChartWrapper>
              <BarChart
                className="mt-6"
                data={hotTopicsData}
                index="topic"
                categories={['count']}
                colors={['blue']}
                valueFormatter={value => `${value}次`}
                showLegend={false}
                showGridLines={false}
                layout="vertical"
                showXAxis={true}
                showYAxis={true}
                yAxisWidth={80}
              />
            </ChartWrapper>
          </TremorCard>
        </Col>

        {/* 地域热度分布 - 使用 G2Plot 柱状图 */}
        <Col numColSpan={1} numColSpanLg={1}>
          <TremorCard>
            <TremorTitle>地域讨论热度</TremorTitle>
            <TremorSubtitle>各地区舆情热度分布</TremorSubtitle>
            <div className="mt-6">
              <G2BarChart
                data={geographicData}
                xField="value"
                yField="region"
                height={300}
                config={{
                  color: 'var(--primary)',
                  label: {
                    position: 'right',
                    style: {
                      fill: 'hsl(var(--muted-foreground))',
                      fontSize: 12,
                    },
                    formatter: (datum: any) => `${datum.value}次`,
                  },
                  tooltip: {
                    formatter: (datum: any) => ({
                      name: '讨论量',
                      value: `${datum.value}次`,
                    }),
                  },
                }}
              />
            </div>
          </TremorCard>
        </Col>

        {/* 系统性能监控 */}
        <Col numColSpan={1} numColSpanLg={1}>
          <TremorCard>
            <TremorTitle>系统运行状态</TremorTitle>
            <TremorSubtitle>实时系统性能监控</TremorSubtitle>
            <div className="mt-6 space-y-4">
              {systemMetricsData.map(metric => (
                <div key={metric.name}>
                  <Flex>
                    <TremorText>{metric.name}</TremorText>
                    <TremorText>{metric.value}%</TremorText>
                  </Flex>
                  <ProgressBar
                    value={metric.value}
                    color={
                      metric.status === 'good'
                        ? 'emerald'
                        : metric.status === 'warning'
                          ? 'amber'
                          : 'red'
                    }
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </TremorCard>
        </Col>
      </Grid>

      {/* 时间序列分析 - 跨越整行 */}
      <TremorCard>
        <TremorTitle>数据流量时序分析</TremorTitle>
        <TremorSubtitle>过去24小时各服务数据采集量变化趋势</TremorSubtitle>
        <div className="mt-6">
          <G2LineChart
            data={timeSeriesData}
            xField="time"
            yField="value"
            seriesField="type"
            height={400}
            config={{
              point: {
                size: 3,
                shape: 'circle',
              },
              smooth: true,
              legend: {
                position: 'top-left',
              },
              tooltip: {
                shared: true,
                showCrosshairs: true,
                crosshairs: {
                  type: 'x',
                  line: {
                    style: {
                      stroke: 'hsl(var(--border))',
                      strokeWidth: 1,
                      lineDash: [2, 2],
                    },
                  },
                },
              },
              animation: {
                appear: {
                  animation: 'wave-in',
                  duration: 1500,
                },
              },
            }}
          />
        </div>
      </TremorCard>

      {/* 页脚信息 */}
      <TremorCard>
        <Flex className="justify-between items-center">
          <div>
            <TremorText>数据更新时间: {new Date().toLocaleString()}</TremorText>
            <TremorText>监控范围: 全网舆情数据 · 实时分析处理</TremorText>
          </div>
          <div className="flex items-center gap-4">
            <Badge color="emerald">Tremor</Badge>
            <Badge color="blue">G2Plot</Badge>
            <Badge color="violet">实时数据</Badge>
          </div>
        </Flex>
      </TremorCard>
    </div>
  );
};
