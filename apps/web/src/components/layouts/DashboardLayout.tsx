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
    <div className="w-full min-h-screen bg-background">
      <header className="w-full p-2 bg-card border-b border-border">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </header>
      <main className="w-full p-2">{children}</main>
    </div>
  );
}
