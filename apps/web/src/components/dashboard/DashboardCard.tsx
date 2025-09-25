import { forwardRef } from 'react';
import type { DashboardCardVariants } from '../../lib/dashboard-variants';
import { DashboardCard as BaseDashboardCard } from './DashboardComponents';

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement>, DashboardCardVariants {}

/**
 * 大屏卡片组件 (重构版)
 * 基于 Tailwind CSS 变体系统实现
 * 职责：提供统一的卡片容器样式，支持多种变体和状态
 */
export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>((props, ref) => {
  return <BaseDashboardCard ref={ref} {...props} />;
});
DashboardCard.displayName = 'DashboardCard';
