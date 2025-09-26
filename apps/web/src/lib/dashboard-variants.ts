import { cva, type VariantProps } from 'class-variance-authority';

/**
 * 舆情监控大屏组件样式变体系统（亮色科技蓝主题）
 * 基于 class-variance-authority 和 Tailwind CSS 实现
 * 采用专业亮色配色方案，符合中国用户审美习惯
 */

// 仪表盘卡片变体（亮色科技蓝主题优化）
export const dashboardCardVariants = cva(
  // 基础样式 - 提升阴影和边框效果
  'relative overflow-hidden bg-card border border-border rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20',
  {
    variants: {
      size: {
        sm: 'p-2',
        default: 'p-3',
        lg: 'p-4',
      },
      variant: {
        default: '',
        primary:
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[var(--primary)] before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100 hover:bg-[var(--primary)]/5',
        success:
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[var(--success)] before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100 hover:bg-[var(--success)]/5',
        warning:
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[var(--warning)] before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100 hover:bg-[var(--warning)]/5',
        danger:
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[var(--destructive)] before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100 hover:bg-[var(--destructive)]/5',
      },
      highlighted: {
        true: 'after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:bg-[var(--primary)] after:transition-opacity after:duration-300 after:opacity-100',
        false:
          'after:absolute after:top-0 after:right-0 after:w-1 after:h-full after:bg-[var(--primary)] after:transition-opacity after:duration-300 after:opacity-0',
      },
    },
    defaultVariants: {
      size: 'sm',
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
        primary:
          'bg-[var(--primary)]/8 border-2 border-transparent hover:border-[var(--primary)]/25 hover:shadow-lg hover:shadow-[var(--primary)]/10',
        success:
          'bg-[var(--success)]/8 border-2 border-transparent hover:border-[var(--success)]/25 hover:shadow-lg hover:shadow-[var(--success)]/10',
        warning:
          'bg-[var(--warning)]/8 border-2 border-transparent hover:border-[var(--warning)]/25 hover:shadow-lg hover:shadow-[var(--warning)]/10',
        danger:
          'bg-[var(--destructive)]/8 border-2 border-transparent hover:border-[var(--destructive)]/25 hover:shadow-lg hover:shadow-[var(--destructive)]/10',
      },
      size: {
        sm: 'p-2',
        default: 'p-3',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
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
        primary: 'text-[var(--primary)]',
        success: 'text-[var(--success)]',
        warning: 'text-[var(--warning)]',
        danger: 'text-[var(--destructive)]',
        neutral: 'text-foreground',
      },
    },
    defaultVariants: {
      size: 'sm',
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
        neutral:
          'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20 hover:bg-[var(--warning)]/20',
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
        'very-positive':
          'bg-emerald-50 text-emerald-700 border border-emerald-200',
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
        'very-positive': 'bg-[var(--sentiment-very-positive)]',
        positive: 'bg-[var(--sentiment-positive)]',
        neutral: 'bg-[var(--sentiment-neutral)]',
        negative: 'bg-[var(--sentiment-negative)]',
        'very-negative': 'bg-[var(--sentiment-very-negative)]',
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
        online:
          'bg-[var(--success)] shadow-[0_0_0_2px] shadow-[var(--success)]/20',
        offline:
          'bg-[var(--destructive)] shadow-[0_0_0_2px] shadow-[var(--destructive)]/20',
        warning:
          'bg-[var(--warning)] shadow-[0_0_0_2px] shadow-[var(--warning)]/20',
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

// 图表容器变体（亮色主题优化）
export const chartContainerVariants = cva(
  'relative p-2 bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300',
  {
    variants: {
      size: {
        sm: 'h-40',
        default: 'h-48',
        lg: 'h-64',
      },
      pattern: {
        true: 'before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_48%,rgb(var(--border))_48%,rgb(var(--border))_52%,transparent_52%)] before:bg-[length:24px_24px] before:opacity-[0.02] before:pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      size: 'sm',
      pattern: true,
    },
  }
);

// 词云标签变体（亮色科技蓝主题优化）
export const wordcloudTagVariants = cva(
  'inline-block px-3 py-1 m-1 rounded-full text-xs font-semibold border cursor-pointer transition-all duration-300 relative overflow-hidden hover:scale-105',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--primary)] text-white border-[var(--primary)]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--primary)]/25',
        secondary:
          'bg-[var(--accent)] text-white border-[var(--accent)]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--accent)]/25',
      },
      shine: {
        true: 'before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-white/20 before:transition-all before:duration-700 hover:before:left-full',
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
  'h-full bg-primary transition-all duration-1000 ease-out relative rounded-full',
  {
    variants: {
      shine: {
        true: 'after:absolute after:inset-0 after:bg-white/20 after:animate-progress-shine after:rounded-full',
        false: '',
      },
      variant: {
        primary: 'bg-[var(--primary)]',
        success: 'bg-[var(--success)]',
        warning: 'bg-[var(--warning)]',
        danger: 'bg-[var(--destructive)]',
      },
    },
    defaultVariants: {
      shine: false,
      variant: 'primary',
    },
  }
);

// 导出类型
export type DashboardCardVariants = VariantProps<typeof dashboardCardVariants>;
export type MetricCardVariants = VariantProps<typeof metricCardVariants>;
export type MetricValueVariants = VariantProps<typeof metricValueVariants>;
export type TrendIndicatorVariants = VariantProps<
  typeof trendIndicatorVariants
>;
export type SentimentBadgeVariants = VariantProps<
  typeof sentimentBadgeVariants
>;
export type IntensityBarVariants = VariantProps<typeof intensityBarVariants>;
export type IntensityFillVariants = VariantProps<typeof intensityFillVariants>;
export type LiveIndicatorVariants = VariantProps<typeof liveIndicatorVariants>;
export type StatusDotVariants = VariantProps<typeof statusDotVariants>;
export type ChartContainerVariants = VariantProps<
  typeof chartContainerVariants
>;
export type WordcloudTagVariants = VariantProps<typeof wordcloudTagVariants>;
export type ProgressBarVariants = VariantProps<typeof progressBarVariants>;
export type ProgressFillVariants = VariantProps<typeof progressFillVariants>;
