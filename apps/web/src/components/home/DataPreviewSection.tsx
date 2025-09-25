import { useState, useEffect } from 'react';
import { 
  DashboardCard, 
  MetricCard, 
  MetricLabel, 
  MetricValue, 
  TrendIndicator, 
  ChartContainer,
  WordcloudContainer,
  WordcloudTag,
  LiveIndicator
} from '../dashboard/DashboardComponents';
import { mockDashboardData, generateDashboardMetrics } from '../../data/mockDashboardData';

/**
 * 首页实时数据预览区域
 * 职责：在首页展示核心监控数据，吸引用户关注
 */
export function DataPreviewSection() {
  const [metrics, setMetrics] = useState(mockDashboardData.metrics);
  const [isUpdating, setIsUpdating] = useState(false);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setMetrics(generateDashboardMetrics());
        setIsUpdating(false);
      }, 800);
    }, 15000); // 每15秒更新

    return () => clearInterval(interval);
  }, []);

  const hotTopics = [
    '人工智能', '数字化转型', '新能源汽车', '元宇宙', 
    '智能制造', '碳中和', '区块链', '5G应用'
  ];

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-3xl font-bold text-foreground">实时数据概览</h2>
          <LiveIndicator status={isUpdating ? "warning" : "online"}>
            {isUpdating ? "更新中" : "实时"}
          </LiveIndicator>
        </div>
        <p className="text-lg text-muted-foreground">
          全网监控数据实时更新，掌握舆情动态第一手资料
        </p>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard variant="primary" className="transition-all duration-500 hover:scale-[1.02]">
          <MetricCard variant="primary">
            <MetricLabel>总监控数据</MetricLabel>
            <MetricValue variant="primary">
              {metrics.totalData.toLocaleString()}
            </MetricValue>
            <TrendIndicator 
              trend="up" 
              value={metrics.trends.total} 
              icon={<span>📊</span>} 
            />
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="success" className="transition-all duration-500 hover:scale-[1.02]">
          <MetricCard variant="success">
            <MetricLabel>正面情感</MetricLabel>
            <MetricValue variant="success">
              {metrics.positiveCount.toLocaleString()}
            </MetricValue>
            <TrendIndicator 
              trend="up" 
              value={metrics.trends.positive} 
              icon={<span>😊</span>} 
            />
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="warning" className="transition-all duration-500 hover:scale-[1.02]">
          <MetricCard variant="warning">
            <MetricLabel>中性情感</MetricLabel>
            <MetricValue variant="warning">
              {metrics.neutralCount.toLocaleString()}
            </MetricValue>
            <TrendIndicator 
              trend="neutral" 
              value={metrics.trends.neutral} 
              icon={<span>😐</span>} 
            />
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="danger" className="transition-all duration-500 hover:scale-[1.02]">
          <MetricCard variant="danger">
            <MetricLabel>负面情感</MetricLabel>
            <MetricValue variant="danger">
              {metrics.negativeCount.toLocaleString()}
            </MetricValue>
            <TrendIndicator 
              trend="down" 
              value={metrics.trends.negative} 
              icon={<span>😔</span>} 
            />
          </MetricCard>
        </DashboardCard>
      </div>

      {/* 热点话题词云 */}
      <DashboardCard size="lg" className="bg-gradient-to-br from-background to-muted/20">
        <ChartContainer title="当前热点话题" subtitle="基于全网数据分析 · 每小时更新">
          <WordcloudContainer>
            {hotTopics.map((topic, index) => (
              <WordcloudTag 
                key={topic}
                variant={index % 2 === 0 ? "primary" : "secondary"}
                shine
                className="animate-pulse hover:animate-none"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                {topic}
              </WordcloudTag>
            ))}
          </WordcloudContainer>
        </ChartContainer>
      </DashboardCard>

      {/* 底部提示 */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          💡 以上数据每15秒自动更新，展示系统实时监控能力
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-primary">数据源：全网平台实时采集</span>
        </div>
      </div>
    </div>
  );
}