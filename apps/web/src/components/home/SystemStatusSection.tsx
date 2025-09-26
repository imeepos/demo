import { useState, useEffect } from 'react';
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

/**
 * 系统状态监控面板
 * 职责：在首页展示系统运行状态，增强用户信心
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

  const services = [
    {
      name: '数据采集服务',
      value: systemStatus.dataCollection,
      description: '多平台数据实时抓取',
      icon: '📡',
    },
    {
      name: '情感分析引擎',
      value: systemStatus.sentimentAnalysis,
      description: 'AI智能情感识别',
      icon: '🧠',
    },
    {
      name: '实时推送服务',
      value: systemStatus.realTimePush,
      description: '预警信息即时通知',
      icon: '📨',
    },
    {
      name: '备份存储系统',
      value: systemStatus.backupService,
      description: '数据安全保障',
      icon: '💾',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <DashboardCard
            key={service.name}
            size="sm"
            className="hover:shadow-lg transition-all duration-300"
          >
            <div className="space-y-3">
              {/* 服务标题 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{service.icon}</span>
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

      {/* 系统总览 */}
      <DashboardCard className="bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h4 className="font-bold text-foreground">系统整体健康度</h4>
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
