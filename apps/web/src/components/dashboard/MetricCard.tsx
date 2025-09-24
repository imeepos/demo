interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
}

/**
 * 指标卡片组件
 * 职责：展示单个核心指标数据
 */
export function MetricCard({
  title,
  value,
  trend,
  trendValue,
  icon,
}: MetricCardProps) {
  const getTrendClass = () => {
    switch (trend) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      case 'neutral':
        return 'trend-neutral';
      default:
        return '';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      case 'neutral':
        return '→';
      default:
        return '';
    }
  };

  return (
    <div className="metric-card">
      {icon && <div className="metric-icon">{icon}</div>}
      <div className="metric-value">{value}</div>
      <div className="metric-label">{title}</div>
      {trend && trendValue && (
        <div className={`trend-indicator ${getTrendClass()}`}>
          <span>{getTrendIcon()}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
