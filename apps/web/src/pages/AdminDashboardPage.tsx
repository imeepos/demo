import { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import {
  DashboardCard,
  MetricCard,
  StatusDot,
  LiveIndicator,
} from '../components/dashboard/DashboardComponents';
import { cn } from '@sker/ui';

/**
 * 专业管理员控制台页面
 *
 * 设计理念：
 * - 管理员专属功能集成
 * - 实时系统监控
 * - 直观的运维信息
 * - 专业的视觉设计
 *
 * @author SKER Team
 * @version 2.0.0
 */

export function AdminDashboardPage() {
  const [adminMetrics, setAdminMetrics] = useState({
    totalUsers: 2847,
    activeUsers: 1234,
    systemAlerts: 23,
    securityLevel: 98.5,
    serverUptime: 99.9,
    dataIntegrity: 100,
  });

  const [systemHealth, setSystemHealth] = useState({
    cpu: 23,
    memory: 67,
    storage: 45,
    network: 89,
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        systemAlerts: Math.max(
          0,
          prev.systemAlerts + Math.floor(Math.random() * 6 - 3)
        ),
        securityLevel: Math.min(
          100,
          Math.max(95, prev.securityLevel + (Math.random() - 0.5) * 2)
        ),
      }));

      setSystemHealth(prev => ({
        cpu: Math.min(
          100,
          Math.max(0, prev.cpu + Math.floor(Math.random() * 10 - 5))
        ),
        memory: Math.min(
          100,
          Math.max(0, prev.memory + Math.floor(Math.random() * 10 - 5))
        ),
        storage: Math.min(
          100,
          Math.max(0, prev.storage + Math.floor(Math.random() * 4 - 2))
        ),
        network: Math.min(
          100,
          Math.max(0, prev.network + Math.floor(Math.random() * 6 - 3))
        ),
      }));

      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (value: number) => {
    if (value >= 90) return 'online';
    if (value >= 70) return 'warning';
    return 'offline';
  };

  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-success';
    if (value >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* 管理员控制台标题 */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">管理员控制台</h1>
            <p className="text-muted-foreground">系统管理与运维监控中心</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <LiveIndicator status="online">系统正常</LiveIndicator>
          <span className="text-xs text-muted-foreground">
            最后更新: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard variant="primary">
          <MetricCard variant="primary">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">用户总数</span>
              </div>
              <div className="text-2xl font-black text-primary mb-1">
                {adminMetrics.totalUsers.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">注册用户</div>
            </div>
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="success">
          <MetricCard variant="success">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="h-5 w-5 text-success mr-2" />
                <span className="text-sm font-medium">活跃用户</span>
              </div>
              <div className="text-2xl font-black text-success mb-1">
                {adminMetrics.activeUsers.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">在线用户</div>
            </div>
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="warning">
          <MetricCard variant="warning">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <AlertTriangle className="h-5 w-5 text-warning mr-2" />
                <span className="text-sm font-medium">系统警告</span>
              </div>
              <div className="text-2xl font-black text-warning mb-1">
                {adminMetrics.systemAlerts}
              </div>
              <div className="text-xs text-muted-foreground">待处理</div>
            </div>
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="primary">
          <MetricCard variant="primary">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">安全等级</span>
              </div>
              <div className="text-2xl font-black text-primary mb-1">
                {adminMetrics.securityLevel.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">安全指数</div>
            </div>
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="success">
          <MetricCard variant="success">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <BarChart3 className="h-5 w-5 text-success mr-2" />
                <span className="text-sm font-medium">系统运行</span>
              </div>
              <div className="text-2xl font-black text-success mb-1">
                {adminMetrics.serverUptime.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">可用性</div>
            </div>
          </MetricCard>
        </DashboardCard>

        <DashboardCard variant="success">
          <MetricCard variant="success">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Settings className="h-5 w-5 text-success mr-2" />
                <span className="text-sm font-medium">数据完整</span>
              </div>
              <div className="text-2xl font-black text-success mb-1">
                {adminMetrics.dataIntegrity}%
              </div>
              <div className="text-xs text-muted-foreground">完整性</div>
            </div>
          </MetricCard>
        </DashboardCard>
      </div>

      {/* 系统健康状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          size="lg"
          className="bg-gradient-to-br from-primary/5 to-accent/5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                系统资源监控
              </h3>
              <StatusDot status="online" pulse />
            </div>

            <div className="space-y-4">
              {[
                { label: 'CPU 使用率', value: systemHealth.cpu, unit: '%' },
                { label: '内存使用率', value: systemHealth.memory, unit: '%' },
                { label: '存储使用率', value: systemHealth.storage, unit: '%' },
                { label: '网络利用率', value: systemHealth.network, unit: '%' },
              ].map(item => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <StatusDot status={getHealthStatus(item.value)} />
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-mono font-bold',
                        getHealthColor(item.value)
                      )}
                    >
                      {item.value}
                      {item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000 ease-out',
                        item.value >= 90
                          ? 'bg-success'
                          : item.value >= 70
                            ? 'bg-warning'
                            : 'bg-destructive'
                      )}
                      style={{ width: `${Math.min(100, item.value)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          size="lg"
          className="bg-gradient-to-br from-success/5 to-emerald-500/5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                安全状态监控
              </h3>
              <StatusDot status="online" pulse />
            </div>

            <div className="space-y-4">
              <div className="text-center p-6 bg-success/10 rounded-lg border border-success/20">
                <Shield className="h-12 w-12 text-success mx-auto mb-3" />
                <div className="text-2xl font-black text-success mb-2">
                  系统安全
                </div>
                <div className="text-sm text-muted-foreground">
                  所有安全检查通过，系统运行正常
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold text-primary">无</div>
                  <div className="text-xs text-muted-foreground">安全威胁</div>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-lg font-bold text-success">100%</div>
                  <div className="text-xs text-muted-foreground">防护率</div>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
