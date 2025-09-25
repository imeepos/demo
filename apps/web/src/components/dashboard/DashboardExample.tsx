/**
 * 舆情监控大屏组件使用示例
 * 展示如何使用基于 Tailwind CSS 的新组件系统
 */

import { useState, useEffect } from 'react';
import {
  mockDashboardData,
  generateDashboardMetrics,
  generateSystemStatus,
  generateSentimentIntensity,
} from '../../data/mockDashboardData';
import {
  ChartContainer,
  DashboardCard,
  IntensityBar,
  LiveIndicator,
  MetricCard as BaseMetricCard,
  MetricLabel,
  MetricValue,
  ProgressBar,
  SentimentBadge,
  StatusDot,
  TrendIndicator,
  WordcloudContainer,
  WordcloudTag,
} from './DashboardComponents';

export function DashboardExample() {
  const [metrics, setMetrics] = useState(mockDashboardData.metrics);
  const [systemStatus, setSystemStatus] = useState(
    mockDashboardData.systemStatus
  );
  const [sentimentIntensity, setSentimentIntensity] = useState(
    mockDashboardData.sentimentIntensity
  );
  const [isLoading, setIsLoading] = useState(false);

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      setTimeout(() => {
        setMetrics(generateDashboardMetrics());
        setSystemStatus(generateSystemStatus());
        setSentimentIntensity(generateSentimentIntensity());
        setIsLoading(false);
      }, 500); // 模拟网络延迟
    }, 10000); // 每10秒更新一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* 大屏标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
          舆情分析监控大屏
        </h1>
        <p className="text-muted-foreground text-lg">
          基于 Tailwind CSS 组件系统 · 实时数据监控
        </p>
        <LiveIndicator
          status={isLoading ? 'warning' : 'online'}
          className="mt-4"
        >
          {isLoading ? '更新中...' : 'LIVE'}
        </LiveIndicator>
      </div>

      {/* 核心指标网格 - 响应式优化 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <DashboardCard variant="primary" highlighted>
          <BaseMetricCard variant="primary">
            <div className="flex items-center justify-center mb-3">
              <MetricLabel>总监控数据</MetricLabel>
            </div>
            <MetricValue variant="primary">
              {metrics.totalData.toLocaleString()}
            </MetricValue>
            <TrendIndicator
              trend="up"
              value={metrics.trends.total}
              icon={<span>↗</span>}
            />
          </BaseMetricCard>
        </DashboardCard>

        <DashboardCard variant="success">
          <BaseMetricCard variant="success">
            <div className="flex items-center justify-center mb-3">
              <MetricLabel>正面情感</MetricLabel>
            </div>
            <MetricValue variant="success">
              {metrics.positiveCount.toLocaleString()}
            </MetricValue>
            <TrendIndicator
              trend="up"
              value={metrics.trends.positive}
              icon={<span>↗</span>}
            />
          </BaseMetricCard>
        </DashboardCard>

        <DashboardCard variant="warning">
          <BaseMetricCard variant="warning">
            <div className="flex items-center justify-center mb-3">
              <MetricLabel>中性情感</MetricLabel>
            </div>
            <MetricValue variant="warning">
              {metrics.neutralCount.toLocaleString()}
            </MetricValue>
            <TrendIndicator
              trend="neutral"
              value={metrics.trends.neutral}
              icon={<span>→</span>}
            />
          </BaseMetricCard>
        </DashboardCard>

        <DashboardCard variant="danger">
          <BaseMetricCard variant="danger">
            <div className="flex items-center justify-center mb-3">
              <MetricLabel>负面情感</MetricLabel>
            </div>
            <MetricValue variant="danger">
              {metrics.negativeCount.toLocaleString()}
            </MetricValue>
            <TrendIndicator
              trend="down"
              value={metrics.trends.negative}
              icon={<span>↘</span>}
            />
          </BaseMetricCard>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* 情感分析展示 */}
        <DashboardCard size="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">情感强度分布</h3>
              <StatusDot status="online" pulse />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SentimentBadge sentiment="very-positive">
                  极正面
                </SentimentBadge>
                <IntensityBar
                  value={sentimentIntensity.veryPositive}
                  intensity="very-positive"
                  className="flex-1 mx-4"
                />
                <span className="text-sm font-medium">
                  {Math.round(sentimentIntensity.veryPositive * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <SentimentBadge sentiment="positive">正面</SentimentBadge>
                <IntensityBar
                  value={sentimentIntensity.positive}
                  intensity="positive"
                  className="flex-1 mx-4"
                />
                <span className="text-sm font-medium">
                  {Math.round(sentimentIntensity.positive * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <SentimentBadge sentiment="neutral">中性</SentimentBadge>
                <IntensityBar
                  value={sentimentIntensity.neutral}
                  intensity="neutral"
                  className="flex-1 mx-4"
                />
                <span className="text-sm font-medium">
                  {Math.round(sentimentIntensity.neutral * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <SentimentBadge sentiment="negative">负面</SentimentBadge>
                <IntensityBar
                  value={sentimentIntensity.negative}
                  intensity="negative"
                  className="flex-1 mx-4"
                />
                <span className="text-sm font-medium">
                  {Math.round(sentimentIntensity.negative * 100)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <SentimentBadge sentiment="very-negative">
                  极负面
                </SentimentBadge>
                <IntensityBar
                  value={sentimentIntensity.veryNegative}
                  intensity="very-negative"
                  className="flex-1 mx-4"
                />
                <span className="text-sm font-medium">
                  {Math.round(sentimentIntensity.veryNegative * 100)}%
                </span>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* 系统状态监控 */}
        <DashboardCard size="lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">系统状态</h3>
              <LiveIndicator status="online" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <StatusDot
                      status={
                        systemStatus.dataCollection > 95 ? 'online' : 'warning'
                      }
                    />
                    数据采集服务
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {systemStatus.dataCollection}%
                  </span>
                </div>
                <ProgressBar
                  value={systemStatus.dataCollection}
                  variant={
                    systemStatus.dataCollection > 95 ? 'success' : 'warning'
                  }
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <StatusDot
                      status={
                        systemStatus.sentimentAnalysis > 90
                          ? 'online'
                          : 'warning'
                      }
                    />
                    情感分析引擎
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {systemStatus.sentimentAnalysis}%
                  </span>
                </div>
                <ProgressBar
                  value={systemStatus.sentimentAnalysis}
                  variant={
                    systemStatus.sentimentAnalysis > 90 ? 'success' : 'warning'
                  }
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <StatusDot
                      status={
                        systemStatus.realTimePush > 90 ? 'online' : 'warning'
                      }
                    />
                    实时推送服务
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {systemStatus.realTimePush}%
                  </span>
                </div>
                <ProgressBar
                  value={systemStatus.realTimePush}
                  variant={
                    systemStatus.realTimePush > 90 ? 'primary' : 'warning'
                  }
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <StatusDot
                      status={
                        systemStatus.backupService > 50 ? 'online' : 'offline'
                      }
                    />
                    备份服务
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {systemStatus.backupService}%
                  </span>
                </div>
                <ProgressBar
                  value={systemStatus.backupService}
                  variant={
                    systemStatus.backupService > 50 ? 'primary' : 'danger'
                  }
                  shine={systemStatus.backupService > 0}
                />
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* 热点词云 */}
      <DashboardCard size="lg">
        <ChartContainer
          title="热点话题词云"
          subtitle="实时更新 · 数据来源：全网监控"
        >
          <WordcloudContainer>
            <WordcloudTag variant="primary" shine>
              人工智能
            </WordcloudTag>
            <WordcloudTag variant="primary" shine>
              科技创新
            </WordcloudTag>
            <WordcloudTag variant="secondary" shine>
              数字化转型
            </WordcloudTag>
            <WordcloudTag variant="primary" shine>
              智能制造
            </WordcloudTag>
            <WordcloudTag variant="secondary" shine>
              云计算
            </WordcloudTag>
            <WordcloudTag variant="primary" shine>
              大数据
            </WordcloudTag>
            <WordcloudTag variant="secondary" shine>
              区块链
            </WordcloudTag>
            <WordcloudTag variant="primary" shine>
              5G技术
            </WordcloudTag>
            <WordcloudTag variant="secondary" shine>
              物联网
            </WordcloudTag>
            <WordcloudTag variant="primary" shine>
              机器学习
            </WordcloudTag>
            <WordcloudTag variant="secondary" shine>
              深度学习
            </WordcloudTag>
            <WordcloudTag variant="primary" shine>
              量子计算
            </WordcloudTag>
          </WordcloudContainer>
        </ChartContainer>
      </DashboardCard>

      {/* 趋势指示器展示 - 响应式优化 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard>
          <div className="text-center">
            <MetricValue variant="primary" size="sm">
              +15.2%
            </MetricValue>
            <MetricLabel>数据增长率</MetricLabel>
            <TrendIndicator
              trend="up"
              value="持续上升"
              icon="📈"
              className="mt-2"
            />
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="text-center">
            <MetricValue variant="success" size="sm">
              92.6%
            </MetricValue>
            <MetricLabel>服务可用性</MetricLabel>
            <TrendIndicator
              trend="up"
              value="稳定运行"
              icon="✅"
              className="mt-2"
            />
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="text-center">
            <MetricValue variant="warning" size="sm">
              2.8s
            </MetricValue>
            <MetricLabel>平均响应时间</MetricLabel>
            <TrendIndicator
              trend="neutral"
              value="正常范围"
              icon="⏱"
              className="mt-2"
            />
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
