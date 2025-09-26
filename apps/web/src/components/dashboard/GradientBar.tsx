import { cn } from '@sker/ui';
import { cva, type VariantProps } from 'class-variance-authority';

const gradientBarVariants = cva(
  'relative overflow-hidden rounded-full transition-all duration-1000',
  {
    variants: {
      size: {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6',
      },
      variant: {
        primary: 'bg-muted',
        success: 'bg-muted',
        warning: 'bg-muted',
        danger: 'bg-muted',
        sentiment: 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

interface GradientBarProps extends VariantProps<typeof gradientBarVariants> {
  value: number; // 0-100
  showValue?: boolean;
  showAnimation?: boolean;
  className?: string;
  label?: string;
}

/**
 * 渐变色条组件
 * 职责：显示带渐变效果的进度条，特别适用于情感分析展示
 */
export function GradientBar({
  value,
  size,
  variant,
  showValue = false,
  showAnimation = true,
  className,
  label,
}: GradientBarProps) {
  const percentage = Math.max(0, Math.min(100, value));

  const getGradientFill = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary via-accent to-primary';
      case 'success':
        return 'bg-gradient-to-r from-success via-emerald-400 to-success';
      case 'warning':
        return 'bg-gradient-to-r from-warning via-orange-400 to-warning';
      case 'danger':
        return 'bg-gradient-to-r from-destructive via-red-400 to-destructive';
      case 'sentiment':
        return 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500';
      default:
        return 'bg-gradient-to-r from-primary to-accent';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* 标签和数值 */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-mono font-bold text-muted-foreground">
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      {/* 进度条容器 */}
      <div className={gradientBarVariants({ size, variant })}>
        {/* 进度填充 */}
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out relative',
            getGradientFill()
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* 动画光效 */}
          {showAnimation && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-progress-shine rounded-full" />
          )}

          {/* 发光边缘效果 */}
          <div className="absolute right-0 top-0 h-full w-1 bg-white/50 rounded-full animate-pulse" />
        </div>

        {/* 情感分析特殊标记 */}
        {variant === 'sentiment' && (
          <>
            {/* 负面区域标记 */}
            <div className="absolute left-0 top-0 h-full w-1/3 border-r border-white/20" />
            {/* 中性区域标记 */}
            <div className="absolute left-1/3 top-0 h-full w-1/3 border-r border-white/20" />
            {/* 正面区域标记 */}
            <div className="absolute right-0 top-0 h-full w-1/3" />

            {/* 区域标签 */}
            <div className="absolute -bottom-6 left-0 w-1/3 text-center">
              <span className="text-xs text-red-600 font-medium">负面</span>
            </div>
            <div className="absolute -bottom-6 left-1/3 w-1/3 text-center">
              <span className="text-xs text-yellow-600 font-medium">中性</span>
            </div>
            <div className="absolute -bottom-6 right-0 w-1/3 text-center">
              <span className="text-xs text-green-600 font-medium">正面</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
