import { useState } from 'react';
import { cn } from '@sker/ui';
import { Button, Avatar, AvatarImage, AvatarFallback, Badge } from '@sker/ui';
import { MetricValue } from '../dashboard/DashboardComponents';

interface TopBarProps {
  className?: string;
}

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    active?: boolean;
  }>;
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {index > 0 && <span className="text-muted-foreground">/</span>}
          <span
            className={cn(
              item.active
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground cursor-pointer transition-colors'
            )}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * 专业管理后台顶部导航栏
 * 职责：显示面包屑导航、实时状态和用户信息
 */
export function TopBar({ className }: TopBarProps) {
  const [notifications] = useState(3);

  const breadcrumbItems = [
    { label: '舆情监控系统' },
    { label: '数据概览' },
    { label: '实时监控', active: true },
  ];

  return (
    <div
      className={cn(
        'h-16 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm px-6 flex items-center justify-between sticky top-0 z-50',
        className
      )}
    >
      {/* 左侧：面包屑导航 */}
      <div className="flex items-center gap-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* 快速状态指示器 */}
        <div className="hidden md:flex items-center gap-4 pl-6 border-l border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              数据采集
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              分析引擎
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-warning">预警系统</span>
          </div>
        </div>
      </div>

      {/* 右侧：实时数据和用户信息 */}
      <div className="flex items-center gap-4">
        {/* 实时数据展示 */}
        <div className="hidden lg:flex items-center gap-4 pr-4 border-r border-border">
          <div className="text-center">
            <MetricValue variant="primary" size="sm" className="text-lg">
              2.8K
            </MetricValue>
            <p className="text-xs text-muted-foreground">今日数据</p>
          </div>
          <div className="text-center">
            <MetricValue variant="success" size="sm" className="text-lg">
              94.2%
            </MetricValue>
            <p className="text-xs text-muted-foreground">分析准确率</p>
          </div>
          <div className="text-center">
            <MetricValue variant="warning" size="sm" className="text-lg">
              {notifications}
            </MetricValue>
            <p className="text-xs text-muted-foreground">待处理预警</p>
          </div>
        </div>

        {/* 通知按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="relative hover:bg-primary/10 hover:text-primary transition-all duration-300"
        >
          <span className="text-lg">🔔</span>
          {notifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse"
            >
              {notifications}
            </Badge>
          )}
        </Button>

        {/* 用户信息 */}
        <div className="flex items-center gap-3 pl-2 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">管理员</p>
            <p className="text-xs text-muted-foreground">系统管理员</p>
          </div>
          <Avatar className="h-8 w-8 ring-2 ring-primary/20 transition-all duration-300 hover:ring-primary/40">
            <AvatarImage src="/avatars/admin.png" alt="管理员" />
            <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold">
              管
            </AvatarFallback>
          </Avatar>
        </div>

        {/* 设置按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
        >
          ⚙️
        </Button>
      </div>
    </div>
  );
}
