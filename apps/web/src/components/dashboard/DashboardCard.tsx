import { Card, CardContent } from '@sker/ui';
import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * 大屏卡片组件
 * 职责：提供统一的卡片容器样式
 */
export function DashboardCard({ children, className = '' }: DashboardCardProps) {
  return (
    <Card
      className={`transition-all relative duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col border-0 p-0 ${className}`}
    >
      <CardContent className="relative flex-1 p-0">{children}</CardContent>
    </Card>
  );
}
