import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * 大屏卡片组件
 * 职责：提供统一的卡片容器样式
 */
export function DashboardCard({
  title,
  icon,
  children,
  className = '',
}: DashboardCardProps) {
  return (
    <div className={`dashboard-card ${className}`}>
      <div className="dashboard-card-title">
        {icon}
        <span>{title}</span>
      </div>
      <div className="dashboard-card-content">{children}</div>
    </div>
  );
}
