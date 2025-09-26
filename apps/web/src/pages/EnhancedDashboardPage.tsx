import { useState, useEffect } from 'react';
import { Card, Button } from '@sker/ui';
import { MetricCard } from '../components/dashboard/MetricCard';
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@sker/ui';

// ==================== 系统资源配置 ====================

type SystemMetricType = 'cpu' | 'memory' | 'disk' | 'network';
type MetricStatus = 'normal' | 'warning' | 'critical';

interface SystemMetric {
  readonly type: SystemMetricType;
  readonly title: string;
  readonly description: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly color: string;
  readonly unit: string;
}

interface MetricThresholds {
  readonly warning: number;
  readonly critical: number;
}

const SYSTEM_METRICS: readonly SystemMetric[] = [
  {
    type: 'cpu',
    title: 'CPU 使用率',
    description: '处理器负载',
    icon: Cpu,
    color: 'blue',
    unit: '%',
  },
  {
    type: 'memory',
    title: '内存使用率',
    description: '系统内存',
    icon: Activity,
    color: 'green',
    unit: '%',
  },
  {
    type: 'disk',
    title: '磁盘使用率',
    description: '存储空间',
    icon: HardDrive,
    color: 'orange',
    unit: '%',
  },
  {
    type: 'network',
    title: '网络使用率',
    description: '网络带宽',
    icon: Wifi,
    color: 'purple',
    unit: '%',
  },
] as const;

const METRIC_THRESHOLDS: Record<SystemMetricType, MetricThresholds> = {
  cpu: { warning: 60, critical: 80 },
  memory: { warning: 60, critical: 80 },
  disk: { warning: 60, critical: 80 },
  network: { warning: 60, critical: 80 },
} as const;

const getMetricStatus = (
  value: number,
  type: SystemMetricType
): MetricStatus => {
  const thresholds = METRIC_THRESHOLDS[type];
  if (value >= thresholds.critical) return 'critical';
  if (value >= thresholds.warning) return 'warning';
  return 'normal';
};

const getStatusConfig = (status: MetricStatus) => {
  const configs = {
    normal: {
      label: '正常',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      barColor: 'bg-green-500',
    },
    warning: {
      label: '中等',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      barColor: 'bg-yellow-500',
    },
    critical: {
      label: type =>
        type === 'disk' ? '空间紧张' : type === 'network' ? '高流量' : '高负载',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      barColor: 'bg-red-500',
    },
  } as const;

  return configs[status];
};

const generateSystemMetrics = () => ({
  cpu: Math.floor(Math.random() * 100),
  memory: Math.floor(Math.random() * 100),
  disk: Math.floor(Math.random() * 100),
  network: Math.floor(Math.random() * 100),
});

/**
 * 现代化增强版仪表板
 * 职责：展示美化后的UI组件和现代化设计语言
 */
export function EnhancedDashboardPage() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 23,
    memory: 67,
    disk: 45,
    network: 89,
  });

  const [sentimentData, setSentimentData] = useState({
    totalMonitored: 2847,
    activeUsers: 1634,
    alertsCount: 23,
    avgResponseTime: 156,
  });

  const [loading, setLoading] = useState(false);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(generateSystemMetrics());

      setSentimentData({
        totalMonitored: Math.floor(Math.random() * 1000) + 2000,
        activeUsers: Math.floor(Math.random() * 500) + 1200,
        alertsCount: Math.floor(Math.random() * 50) + 10,
        avgResponseTime: Math.floor(Math.random() * 200) + 100,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-8 p-6 animate-fade-in-delayed">
      {/* 现代化页面头部 */}
      <Card
        variant="floating"
        className="p-6 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              增强版数据仪表板
            </h1>
            <p className="text-lg text-muted-foreground">
              体验现代化的UI组件和流畅的交互设计
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">系统正常运行</span>
              </div>
              <div className="text-sm text-muted-foreground">
                最后更新: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <Button
              variant="tech"
              onClick={handleRefresh}
              loading={loading}
              ripple
              className="text-sm"
            >
              刷新数据
            </Button>
            <div className="text-right text-sm text-muted-foreground">
              <div>在线用户: {sentimentData.activeUsers.toLocaleString()}</div>
              <div>监控源: {sentimentData.totalMonitored.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 核心业务指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="总监控数据"
          value={sentimentData.totalMonitored}
          trend="up"
          trendValue="+12.5%"
          icon={<TrendingUp className="h-5 w-5" />}
          description="实时数据采集"
          loading={loading}
          variant="floating"
        />

        <MetricCard
          title="活跃用户"
          value={sentimentData.activeUsers}
          trend="up"
          trendValue="+8.3%"
          icon={<Users className="h-5 w-5" />}
          description="当前在线用户"
          loading={loading}
          variant="glow"
        />

        <MetricCard
          title="预警事件"
          value={sentimentData.alertsCount}
          trend="down"
          trendValue="-15.2%"
          icon={<AlertTriangle className="h-5 w-5" />}
          description="需要关注的事件"
          loading={loading}
          variant="outlined"
        />

        <MetricCard
          title="响应时间"
          value={`${sentimentData.avgResponseTime}ms`}
          trend="neutral"
          trendValue="稳定"
          icon={<Activity className="h-5 w-5" />}
          description="平均处理时间"
          loading={loading}
          variant="gradient"
        />
      </div>

      {/* 系统资源监控 */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          系统资源监控
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SYSTEM_METRICS.map(metric => {
            const value = systemMetrics[metric.type];
            const status = getMetricStatus(value, metric.type);
            const config = getStatusConfig(status);
            const Icon = metric.icon;

            return (
              <Card key={metric.type} variant="elevated" className="p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-${metric.color}-100 text-${metric.color}-600 group-hover:bg-${metric.color}-200 transition-colors`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{metric.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      {value}
                      {metric.unit}
                    </span>
                    <span
                      className={cn(
                        'text-xs px-2 py-1 rounded-full font-medium',
                        config.bgColor,
                        config.textColor
                      )}
                    >
                      {typeof config.label === 'function'
                        ? config.label(metric.type)
                        : config.label}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={cn(
                        'h-2 rounded-full transition-all duration-1000',
                        config.barColor
                      )}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 功能特性展示 */}
      <Card
        variant="glass"
        className="p-8 text-center bg-gradient-to-br from-primary/5 via-accent/5 to-background"
      >
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
              ✨ 现代化设计特性
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              体验全新的UI组件库，包含玻璃态效果、流畅动画、多种变体和现代交互设计
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">现代化组件</h4>
              <p className="text-sm text-muted-foreground">
                全新的 Button、Card、MetricCard 组件，支持多种美观变体
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto">
                <Activity className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">流畅动画</h4>
              <p className="text-sm text-muted-foreground">
                悬浮效果、涟漪效果、加载状态和渐变过渡动画
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl mb-4 mx-auto">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                专业数据展示
              </h4>
              <p className="text-sm text-muted-foreground">
                美观的指标卡片、趋势指示器和实时状态显示
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">实时数据同步</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium">响应式设计</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-medium">现代化交互</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="tech" size="lg" ripple>
              查看更多特性
            </Button>
            <Button variant="outline" size="lg">
              返回首页
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
