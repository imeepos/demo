import { useState } from 'react';
import { cn } from '@sker/ui';
import {
  DashboardCard,
  LiveIndicator,
  StatusDot,
} from '../dashboard/DashboardComponents';

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
  status?: 'online' | 'offline' | 'warning';
}

const NAV_ITEMS = [
  {
    icon: '🏠',
    label: '首页概览',
    active: true,
    status: 'online' as const,
  },
  {
    icon: '📊',
    label: '数据监控',
    badge: 'LIVE',
    status: 'online' as const,
  },
  {
    icon: '🧠',
    label: '情感分析',
    badge: 24,
    status: 'online' as const,
  },
  {
    icon: '🌍',
    label: '地域分析',
    status: 'online' as const,
  },
  {
    icon: '🔥',
    label: '热点追踪',
    badge: '新',
    status: 'warning' as const,
  },
  {
    icon: '🚨',
    label: '预警管理',
    badge: 3,
    status: 'warning' as const,
  },
  {
    icon: '📈',
    label: '统计报告',
    status: 'online' as const,
  },
  {
    icon: '⚙️',
    label: '系统设置',
    status: 'online' as const,
  },
];

function NavItem({
  icon,
  label,
  badge,
  active,
  onClick,
  status,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative overflow-hidden',
        active
          ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-l-2 border-primary shadow-primary/20 shadow-md'
          : 'hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary text-muted-foreground hover:shadow-sm'
      )}
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 图标 */}
      <span className="text-lg relative z-10 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>

      {/* 状态点 */}
      {status && <StatusDot status={status} className="relative z-10" />}

      {/* 标签 */}
      <span className="flex-1 text-left font-medium relative z-10 group-hover:font-semibold transition-all duration-300">
        {label}
      </span>

      {/* 徽章 */}
      {badge && (
        <span
          className={cn(
            'px-2 py-0.5 rounded-full text-xs font-bold relative z-10 transition-all duration-300',
            active
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/**
 * 专业管理后台侧边导航栏
 * 职责：提供主要功能导航和系统状态展示
 */
export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'h-screen bg-card border-r border-border shadow-lg transition-all duration-300 flex flex-col backdrop-blur-sm',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo 区域 */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-primary">
            舆
          </div>
          {!collapsed && (
            <>
              <div className="flex-1">
                <h1 className="font-bold text-foreground">舆情监控系统</h1>
                <div className="flex items-center gap-2 mt-1">
                  <LiveIndicator status="online" className="text-xs">
                    实时监控中
                  </LiveIndicator>
                </div>
              </div>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                ←
              </button>
            </>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="absolute top-4 -right-3 w-6 h-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-300"
            >
              →
            </button>
          )}
        </div>
      </div>

      {/* 导航区域 */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={collapsed ? '' : item.label}
            badge={collapsed ? undefined : item.badge}
            active={item.active}
            status={item.status}
          />
        ))}
      </div>

      {/* 底部状态区域 */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <DashboardCard
            size="sm"
            className="bg-gradient-to-br from-muted/50 to-accent/5"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  系统状态
                </span>
                <StatusDot status="online" pulse />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CPU使用率</span>
                  <span className="font-mono text-success">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">内存使用</span>
                  <span className="font-mono text-warning">67%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">数据源</span>
                  <span className="font-mono text-primary">8/8</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      )}
    </div>
  );
}
