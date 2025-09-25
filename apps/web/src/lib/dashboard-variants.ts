import { cva, type VariantProps } from 'class-variance-authority';

/**
 * 舆情监控大屏组件样式变体系统
 * 基于 class-variance-authority 和 Tailwind CSS 实现
 */

// 仪表盘卡片变体
export const dashboardCardVariants = cva(
  // 基础样式
  'relative overflow-hidden bg-card border border-border rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-ring',
  {
    variants: {
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      variant: {
        default: '',
        primary: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-[var(--primary)] before:to-[var(--primary)]/80 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        success: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-[var(--success)] before:to-[var(--success)]/80 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        warning: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-[var(--warning)] before:to-[var(--warning)]/80 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        danger: 'before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-[var(--destructive)] before:to-[var(--destructive)]/80 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
      },
      highlighted: {
        true: 'after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:bg-[var(--primary)] after:transition-opacity after:duration-300 after:opacity-100',
        false: 'after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:bg-[var(--primary)] after:transition-opacity after:duration-300 after:opacity-0',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      highlighted: false,
    },
  }
);

// 指标卡片变体
export const metricCardVariants = cva(
  'text-center transition-all duration-300 hover:scale-[1.02]',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 border-2 border-transparent hover:border-[var(--primary)]/20',
        success: 'bg-gradient-to-br from-[var(--success)]/5 to-[var(--success)]/10 border-2 border-transparent hover:border-[var(--success)]/20',
        warning: 'bg-gradient-to-br from-[var(--warning)]/5 to-[var(--warning)]/10 border-2 border-transparent hover:border-[var(--warning)]/20',
        danger: 'bg-gradient-to-br from-[var(--destructive)]/5 to-[var(--destructive)]/10 border-2 border-transparent hover:border-[var(--destructive)]/20',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

// 指标数值变体
export const metricValueVariants = cva(
  'font-mono font-black leading-none tracking-tight mb-3',
  {
    variants: {
      size: {
        sm: 'text-2xl',
        default: 'text-4xl lg:text-5xl',
        lg: 'text-5xl lg:text-6xl',
      },
      variant: {
        primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 bg-clip-text text-transparent',
        success: 'text-[var(--success)]',
        warning: 'text-[var(--warning)]',
        danger: 'text-[var(--destructive)]',
        neutral: 'text-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
  }
);

// 趋势指示器变体
export const trendIndicatorVariants = cva(
  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
  {
    variants: {
      trend: {
        up: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20 hover:bg-[var(--success)]/20',
        down: 'bg-[var(--destructive)]/10 text-[var(--destructive)] border-[var(--destructive)]/20 hover:bg-[var(--destructive)]/20',
        neutral: 'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20 hover:bg-[var(--warning)]/20',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  }
);

// 情感标签变体
export const sentimentBadgeVariants = cva(
  'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium',
  {
    variants: {
      sentiment: {
        'very-positive': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        positive: 'bg-green-50 text-green-700 border border-green-200',
        neutral: 'bg-amber-50 text-amber-700 border border-amber-200',
        negative: 'bg-red-50 text-red-700 border border-red-200',
        'very-negative': 'bg-rose-50 text-rose-700 border border-rose-200',
      },
    },
    defaultVariants: {
      sentiment: 'neutral',
    },
  }
);

// 情感强度条变体
export const intensityBarVariants = cva(
  'w-full bg-muted rounded-full overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        default: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const intensityFillVariants = cva(
  'h-full transition-all duration-1000 ease-out rounded-full',
  {
    variants: {
      intensity: {
        'very-positive': 'bg-gradient-to-r from-[var(--sentiment-very-positive)] to-[var(--sentiment-very-positive)]/90',
        positive: 'bg-gradient-to-r from-[var(--sentiment-positive)] to-[var(--sentiment-positive)]/90',
        neutral: 'bg-gradient-to-r from-[var(--sentiment-neutral)] to-[var(--sentiment-neutral)]/90',
        negative: 'bg-gradient-to-r from-[var(--sentiment-negative)] to-[var(--sentiment-negative)]/90',
        'very-negative': 'bg-gradient-to-r from-[var(--sentiment-very-negative)] to-[var(--sentiment-very-negative)]/90',
      },
    },
    defaultVariants: {
      intensity: 'neutral',
    },
  }
);

// 实时状态指示器变体
export const liveIndicatorVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide',
  {
    variants: {
      status: {
        online: 'bg-[var(--success)] text-[var(--success-foreground)]',
        offline: 'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
        warning: 'bg-[var(--warning)] text-[var(--warning-foreground)]',
      },
    },
    defaultVariants: {
      status: 'online',
    },
  }
);

// 状态点变体
export const statusDotVariants = cva(
  'inline-block w-2 h-2 rounded-full mr-2 relative',
  {
    variants: {
      status: {
        online: 'bg-[var(--success)] shadow-[0_0_0_2px] shadow-[var(--success)]/20',
        offline: 'bg-[var(--destructive)] shadow-[0_0_0_2px] shadow-[var(--destructive)]/20',
        warning: 'bg-[var(--warning)] shadow-[0_0_0_2px] shadow-[var(--warning)]/20',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      status: 'online',
      pulse: false,
    },
  }
);

// 图表容器变体
export const chartContainerVariants = cva(
  'relative p-4 bg-muted/30 rounded-lg overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-64',
        default: 'h-80',
        lg: 'h-96',
      },
      pattern: {
        true: 'before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_49%,rgb(var(--border))_49%,rgb(var(--border))_51%,transparent_51%)] before:bg-[length:20px_20px] before:opacity-[0.03] before:pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      pattern: true,
    },
  }
);

// 词云标签变体
export const wordcloudTagVariants = cva(
  'inline-block px-3 py-1.5 m-1 rounded-full text-sm font-medium border cursor-pointer transition-all duration-300 relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:border-ring',
        secondary: 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground border-secondary/20 hover:-translate-y-0.5 hover:shadow-lg hover:border-ring',
      },
      shine: {
        true: 'before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shine: true,
    },
  }
);

// 进度条变体
export const progressBarVariants = cva(
  'w-full bg-muted rounded-full overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-2',
        default: 'h-3',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const progressFillVariants = cva(
  'h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000 ease-out relative',
  {
    variants: {
      shine: {
        true: 'after:absolute after:inset-0 after:bg-[linear-gradient(45deg,transparent_33%,rgba(255,255,255,0.3)_33%,rgba(255,255,255,0.3)_66%,transparent_66%)] after:bg-[length:20px_20px] after:animate-progress-shine',
        false: '',
      },
      variant: {
        primary: 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80',
        success: 'bg-gradient-to-r from-[var(--success)] to-[var(--success)]/80',
        warning: 'bg-gradient-to-r from-[var(--warning)] to-[var(--warning)]/80',
        danger: 'bg-gradient-to-r from-[var(--destructive)] to-[var(--destructive)]/80',
      },
    },
    defaultVariants: {
      shine: true,
      variant: 'primary',
    },
  }
);

// 导出类型
export type DashboardCardVariants = VariantProps<typeof dashboardCardVariants>;
export type MetricCardVariants = VariantProps<typeof metricCardVariants>;
export type MetricValueVariants = VariantProps<typeof metricValueVariants>;
export type TrendIndicatorVariants = VariantProps<typeof trendIndicatorVariants>;
export type SentimentBadgeVariants = VariantProps<typeof sentimentBadgeVariants>;
export type IntensityBarVariants = VariantProps<typeof intensityBarVariants>;
export type IntensityFillVariants = VariantProps<typeof intensityFillVariants>;
export type LiveIndicatorVariants = VariantProps<typeof liveIndicatorVariants>;
export type StatusDotVariants = VariantProps<typeof statusDotVariants>;
export type ChartContainerVariants = VariantProps<typeof chartContainerVariants>;
export type WordcloudTagVariants = VariantProps<typeof wordcloudTagVariants>;
export type ProgressBarVariants = VariantProps<typeof progressBarVariants>;
export type ProgressFillVariants = VariantProps<typeof progressFillVariants>;