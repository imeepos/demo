import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout';
import {
  DashboardCard,
  CircularProgress,
  GradientBar,
  MetricCard,
  MetricValue,
  MetricLabel,
  LiveIndicator,
  StatusDot,
  TrendIndicator,
} from '../components/dashboard/DashboardComponents';

/**
 * 增强版管理后台页面
 * 职责：展示所有新的UI组件和增强的视觉效果
 */
export function EnhancedDashboardPage() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 23,
    memory: 67,
    disk: 45,
    network: 89,
  });

  const [sentimentData, setSentimentData] = useState({
    positive: 65,
    neutral: 25,
    negative: 10,
  });

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100),
      });

      setSentimentData({
        positive: Math.floor(Math.random() * 80) + 20,
        neutral: Math.floor(Math.random() * 30) + 10,
        negative: Math.floor(Math.random() * 20) + 5,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              增强版数据大屏
            </h1>
            <p className="text-muted-foreground mt-1">
              展示环形进度条、渐变色条和增强的视觉效果
            </p>
          </div>
          <LiveIndicator status="online" className="text-lg">
            实时更新中
          </LiveIndicator>
        </div>

        {/* 系统性能监控 - 环形进度条展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-dashboard-md">
          <DashboardCard variant="primary" className="text-center p-card-md">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CircularProgress
                  value={systemMetrics.cpu}
                  size="lg"
                  variant="primary"
                  showValue={true}
                />
              </div>
              <div>
                <MetricLabel>CPU 使用率</MetricLabel>
                <TrendIndicator
                  trend={systemMetrics.cpu > 50 ? 'up' : 'down'}
                  value="正常运行"
                  icon="🔄"
                  className="mt-2"
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard variant="success" className="text-center p-card-md">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CircularProgress
                  value={systemMetrics.memory}
                  size="lg"
                  variant="success"
                  showValue={true}
                />
              </div>
              <div>
                <MetricLabel>内存使用率</MetricLabel>
                <TrendIndicator
                  trend={systemMetrics.memory > 70 ? 'up' : 'neutral'}
                  value="稳定运行"
                  icon="💾"
                  className="mt-2"
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard variant="warning" className="text-center p-card-md">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CircularProgress
                  value={systemMetrics.disk}
                  size="lg"
                  variant="warning"
                  showValue={true}
                />
              </div>
              <div>
                <MetricLabel>磁盘使用率</MetricLabel>
                <TrendIndicator
                  trend="neutral"
                  value="正常"
                  icon="💿"
                  className="mt-2"
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard variant="danger" className="text-center p-card-md">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CircularProgress
                  value={systemMetrics.network}
                  size="lg"
                  variant="danger"
                  showValue={true}
                />
              </div>
              <div>
                <MetricLabel>网络使用率</MetricLabel>
                <TrendIndicator
                  trend="up"
                  value="高负载"
                  icon="🌐"
                  className="mt-2"
                />
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* 情感分析 - 渐变色条展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-dashboard-lg">
          <DashboardCard size="lg" className="p-card-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">情感分析分布</h3>
                <StatusDot status="online" pulse />
              </div>

              <div className="space-y-6">
                <GradientBar
                  value={sentimentData.positive}
                  variant="success"
                  size="lg"
                  showValue={true}
                  label="正面情感"
                  showAnimation={true}
                />

                <GradientBar
                  value={sentimentData.neutral}
                  variant="warning"
                  size="lg"
                  showValue={true}
                  label="中性情感"
                  showAnimation={true}
                />

                <GradientBar
                  value={sentimentData.negative}
                  variant="danger"
                  size="lg"
                  showValue={true}
                  label="负面情感"
                  showAnimation={true}
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard size="lg" className="p-card-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">综合情感趋势</h3>
                <StatusDot status="online" pulse />
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <CircularProgress
                    value={sentimentData.positive}
                    size="xl"
                    variant="success"
                    className="mb-4"
                  >
                    <div className="text-center">
                      <MetricValue
                        variant="success"
                        size="sm"
                        className="text-2xl"
                      >
                        {sentimentData.positive}%
                      </MetricValue>
                      <MetricLabel className="mt-1">正面评价</MetricLabel>
                    </div>
                  </CircularProgress>
                </div>

                <GradientBar
                  value={75}
                  variant="sentiment"
                  size="xl"
                  showValue={true}
                  label="情感综合指数"
                  showAnimation={true}
                />
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-dashboard-sm">
          <MetricCard variant="primary">
            <MetricLabel>今日数据量</MetricLabel>
            <MetricValue variant="primary" className="text-3xl">
              2.8K+
            </MetricValue>
            <TrendIndicator trend="up" value="+12.5%" icon="📊" />
          </MetricCard>

          <MetricCard variant="success">
            <MetricLabel>分析准确率</MetricLabel>
            <MetricValue variant="success" className="text-3xl">
              94.2%
            </MetricValue>
            <TrendIndicator trend="up" value="+2.1%" icon="🎯" />
          </MetricCard>

          <MetricCard variant="warning">
            <MetricLabel>处理速度</MetricLabel>
            <MetricValue variant="warning" className="text-3xl">
              156ms
            </MetricValue>
            <TrendIndicator trend="neutral" value="稳定" icon="⚡" />
          </MetricCard>

          <MetricCard variant="danger">
            <MetricLabel>预警事件</MetricLabel>
            <MetricValue variant="danger" className="text-3xl">
              3
            </MetricValue>
            <TrendIndicator trend="down" value="-2 本周" icon="🚨" />
          </MetricCard>
        </div>

        {/* 底部说明 */}
        <DashboardCard className="p-card-md text-center bg-gradient-to-br from-muted/30 to-accent/10">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-foreground">
              ✨ 视觉增强特性
            </h4>
            <p className="text-sm text-muted-foreground">
              新增环形进度条、渐变色条、彩色阴影和专业管理后台布局
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <span className="flex items-center gap-1">
                <StatusDot status="online" />
                实时数据同步
              </span>
              <span className="flex items-center gap-1">
                <StatusDot status="online" />
                渐变动画效果
              </span>
              <span className="flex items-center gap-1">
                <StatusDot status="online" />
                响应式设计
              </span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}
