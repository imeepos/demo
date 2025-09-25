import { Link } from '@tanstack/react-router';
import { Button } from '@sker/ui';
import { L7EventMap } from '@sker/map';
import { mockMapEvents } from '../data/mockMapData';
import { Settings, BarChart3, Home } from 'lucide-react';
import { 
  DashboardCard, 
  MetricCard as BaseMetricCard, 
  MetricLabel, 
  MetricValue, 
  TrendIndicator,
  LiveIndicator,
  StatusDot,
  ProgressBar
} from '../components/dashboard/DashboardComponents';

/**
 * 舆情分析大屏主页面
 * 职责：整合所有舆情分析组件，展示完整的监控大屏
 */
export function SentimentDashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* 左侧数据面板 - 响应式隐藏 */}
      <div className="hidden lg:block w-80 bg-card border-r border-border overflow-y-auto shadow-lg">
        <div className="p-4 space-y-4">
          {/* 标题区域 */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">监控数据</h2>
            <LiveIndicator status="online" />
          </div>

          {/* 核心指标 */}
          <div className="space-y-3">
            <DashboardCard variant="primary" size="sm">
              <BaseMetricCard variant="primary" size="sm">
                <MetricLabel>总监控数据</MetricLabel>
                <MetricValue variant="primary" size="sm">2,847</MetricValue>
                <TrendIndicator trend="up" value="+12.5%" icon={<span>↗</span>} />
              </BaseMetricCard>
            </DashboardCard>

            <DashboardCard variant="success" size="sm">
              <BaseMetricCard variant="success" size="sm">
                <MetricLabel>正面情感</MetricLabel>
                <MetricValue variant="success" size="sm">1,634</MetricValue>
                <TrendIndicator trend="up" value="+8.3%" icon={<span>↗</span>} />
              </BaseMetricCard>
            </DashboardCard>

            <DashboardCard variant="danger" size="sm">
              <BaseMetricCard variant="danger" size="sm">
                <MetricLabel>负面情感</MetricLabel>
                <MetricValue variant="danger" size="sm">321</MetricValue>
                <TrendIndicator trend="down" value="-5.7%" icon={<span>↘</span>} />
              </BaseMetricCard>
            </DashboardCard>
          </div>

          {/* 系统状态 */}
          <DashboardCard size="sm">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center">
                <StatusDot status="online" />
                系统状态
              </h3>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>数据采集</span>
                    <span>98.5%</span>
                  </div>
                  <ProgressBar value={98.5} variant="success" size="sm" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>情感分析</span>
                    <span>87.2%</span>
                  </div>
                  <ProgressBar value={87.2} variant="warning" size="sm" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>实时推送</span>
                    <span>96.8%</span>
                  </div>
                  <ProgressBar value={96.8} variant="primary" size="sm" />
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* 右侧地图和导航 */}
      <div className="flex-1 relative">
        {/* 顶部导航栏 */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" className="bg-card/90 backdrop-blur-sm border-border">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Link to="/dashboard-view">
              <Button variant="outline" className="bg-card/90 backdrop-blur-sm border-border">
                <BarChart3 className="w-4 h-4 mr-2" />
                数据大屏
              </Button>
            </Link>
            <Link to="/sentiment-intensity">
              <Button variant="outline" className="bg-card/90 backdrop-blur-sm border-border">
                <Settings className="w-4 h-4 mr-2" />
                情感强度管理
              </Button>
            </Link>
          </div>
        </div>

        {/* 地图区域 */}
        <div className="h-full">
          <L7EventMap
            events={mockMapEvents}
            enableCluster={true}
            clusterRadius={80}
            minClusterSize={2}
          />
        </div>
      </div>
    </div>
  );
}
