import { useState, useEffect } from 'react';
import {
  Server,
  Brain,
  Send,
  Database,
  Shield,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import {
  DashboardCard,
  StatusDot,
  ProgressBar,
  LiveIndicator,
} from '../dashboard/DashboardComponents';
import {
  mockDashboardData,
  generateSystemStatus,
} from '../../data/mockDashboardData';
import { cn } from '@sker/ui';

/**
 * 现代化系统状态监控面板
 *
 * 设计理念：
 * - 专业图标系统替代emoji
 * - 实时数据可视化
 * - 优雅的状态指示器
 * - 直观的健康度评估
 *
 * @author SKER Team
 * @version 2.0.0
 */
export function SystemStatusSection() {
  const [systemStatus, setSystemStatus] = useState(
    mockDashboardData.systemStatus
  );
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(generateSystemStatus());
      setLastUpdate(new Date());
    }, 12000); // 每12秒更新

    return () => clearInterval(interval);
  }, []);

  const getStatusLevel = (value: number) => {
    if (value >= 95) return 'online';
    if (value >= 80) return 'warning';
    return 'offline';
  };

  const getProgressVariant = (value: number) => {
    if (value >= 95) return 'success';
    if (value >= 80) return 'warning';
    return 'danger';
  };

  // ==================== 服务配置系统 ====================

  interface ServiceConfig {
    readonly name: string;
    readonly value: number;
    readonly description: string;
    readonly icon: LucideIcon;
    readonly category: 'core' | 'analysis' | 'communication' | 'storage';
    readonly priority: number;
  }

  const services: ServiceConfig[] = [
    {
      name: '数据采集服务',
      value: systemStatus.dataCollection,
      description: '多平台数据实时抓取',
      icon: Server,
      category: 'core',
      priority: 1,
    },
    {
      name: '情感分析引擎',
      value: systemStatus.sentimentAnalysis,
      description: 'AI智能情感识别',
      icon: Brain,
      category: 'analysis',
      priority: 2,
    },
    {
      name: '实时推送服务',
      value: systemStatus.realTimePush,
      description: '预警信息即时通知',
      icon: Send,
      category: 'communication',
      priority: 3,
    },
    {
      name: '备份存储系统',
      value: systemStatus.backupService,
      description: '数据安全保障',
      icon: Database,
      category: 'storage',
      priority: 4,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            系统运行状态
          </h3>
          <p className="text-muted-foreground">各核心服务运行监控</p>
        </div>
        <div className="text-right">
          <LiveIndicator status="online" className="mb-2">
            系统正常运行
          </LiveIndicator>
          <p className="text-xs text-muted-foreground">
            最后更新: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* 服务状态网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map(service => (
          <DashboardCard
            key={service.name}
            size="sm"
            className="hover:shadow-md transition-all duration-300 p-3"
          >
            <div className="space-y-2.5">
              {/* 服务标题 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      'bg-gradient-to-br transition-all duration-300',
                      service.category === 'core' &&
                        'from-blue-50 to-blue-100 text-blue-600',
                      service.category === 'analysis' &&
                        'from-purple-50 to-purple-100 text-purple-600',
                      service.category === 'communication' &&
                        'from-green-50 to-green-100 text-green-600',
                      service.category === 'storage' &&
                        'from-orange-50 to-orange-100 text-orange-600'
                    )}
                  >
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {service.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusDot status={getStatusLevel(service.value)} pulse />
                  <span className="text-sm font-mono font-bold">
                    {service.value}%
                  </span>
                </div>
              </div>

              {/* 进度条 */}
              <ProgressBar
                value={service.value}
                variant={getProgressVariant(service.value)}
                size="sm"
                shine={service.value > 0}
              />
            </div>
          </DashboardCard>
        ))}
      </div>

      {/* 系统健康度总览 */}
      <DashboardCard className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center',
                'bg-gradient-to-br from-success/20 to-emerald-500/20',
                'border border-success/30 shadow-lg'
              )}
            >
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <h4 className="font-bold text-foreground flex items-center gap-2">
                系统整体健康度
                <Activity className="h-4 w-4 text-primary animate-pulse" />
              </h4>
              <p className="text-sm text-muted-foreground">
                所有核心服务运行稳定，数据处理正常
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-success mb-1">
              {Math.round(
                (systemStatus.dataCollection +
                  systemStatus.sentimentAnalysis +
                  systemStatus.realTimePush +
                  systemStatus.backupService) /
                  4
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">综合评分</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
