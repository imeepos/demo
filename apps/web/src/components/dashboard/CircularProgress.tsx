import { cn } from '@sker/ui';

interface CircularProgressProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  thickness?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeConfig = {
  sm: { width: 48, height: 48, strokeWidth: 4, fontSize: 'text-xs' },
  md: { width: 64, height: 64, strokeWidth: 6, fontSize: 'text-sm' },
  lg: { width: 96, height: 96, strokeWidth: 8, fontSize: 'text-base' },
  xl: { width: 128, height: 128, strokeWidth: 10, fontSize: 'text-lg' },
};

const variantConfig = {
  primary: {
    stroke: 'var(--primary)',
    gradient: 'url(#gradient-primary)',
    shadow: 'drop-shadow-md',
  },
  success: {
    stroke: 'var(--success)',
    gradient: 'url(#gradient-success)',
    shadow: 'drop-shadow-md',
  },
  warning: {
    stroke: 'var(--warning)',
    gradient: 'url(#gradient-warning)',
    shadow: 'drop-shadow-md',
  },
  danger: {
    stroke: 'var(--destructive)',
    gradient: 'url(#gradient-danger)',
    shadow: 'drop-shadow-md',
  },
};

/**
 * 环形进度条组件
 * 职责：显示进度数据的环形可视化
 */
export function CircularProgress({
  value,
  size = 'md',
  variant = 'primary',
  showValue = true,
  className,
  children,
}: CircularProgressProps) {
  const config = sizeConfig[size];
  const variantStyle = variantConfig[variant];
  const center = config.width / 2;
  const radius = center - config.strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
    >
      <svg
        width={config.width}
        height={config.height}
        className={cn(
          'transform -rotate-90 transition-all duration-1000',
          variantStyle.shadow
        )}
      >
        <defs>
          {/* 渐变定义 */}
          <linearGradient
            id="gradient-primary"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient
            id="gradient-success"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient
            id="gradient-warning"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#dc8b00" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient
            id="gradient-danger"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* 背景圆环 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={config.strokeWidth}
          opacity="0.2"
        />

        {/* 进度圆环 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={variantStyle.gradient}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />

        {/* 发光效果 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={variantStyle.stroke}
          strokeWidth={1}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          opacity="0.5"
          className="transition-all duration-1000 ease-out animate-pulse"
        />
      </svg>

      {/* 中央内容 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children ||
          (showValue && (
            <div className="text-center">
              <div
                className={cn(
                  'font-bold font-mono tabular-nums leading-none',
                  config.fontSize,
                  variant === 'primary' && 'text-primary',
                  variant === 'success' && 'text-success',
                  variant === 'warning' && 'text-warning',
                  variant === 'danger' && 'text-destructive'
                )}
              >
                {Math.round(value)}%
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
