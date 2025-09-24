import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * 舆情分析大屏布局组件
 * 职责：提供大屏专用的布局结构
 */
export function DashboardLayout({
  children,
  title = '舆情分析监控大屏',
  subtitle = '实时监控网络舆论动态，智能分析情感趋势',
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1 className="dashboard-title">{title}</h1>
        <p className="dashboard-subtitle">{subtitle}</p>
      </header>
      <main className="dashboard-grid">{children}</main>
    </div>
  );
}
