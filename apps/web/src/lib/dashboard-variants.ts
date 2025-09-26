import { cva, type VariantProps } from 'class-variance-authority';

/**
 * 舆情监控大屏组件样式变体系统
 *
 * 设计原则：
 * - 统一的颜色语义和视觉层次
 * - 流畅的动画和微交互
 * - 优雅的渐变和阴影系统
 * - 响应式设计支持
 *
 * @author SKER Team
 * @version 2.0.0
 */

// ==================== 基础样式常量 ====================

/** 基础过渡动画 */
const TRANSITIONS = {
  base: 'transition-all duration-300',
  fast: 'transition-all duration-200',
  slow: 'transition-all duration-500',
  colors: 'transition-colors duration-300',
} as const;

/** 基础阴影系统 */
const SHADOWS = {
  soft: 'shadow-sm hover:shadow-md',
  medium: 'shadow-md hover:shadow-lg',
  strong: 'shadow-lg hover:shadow-xl',
  glow: (color: string) => `shadow-${color}/25 hover:shadow-${color}/40`,
} as const;

/** 渐变背景系统 */
const GRADIENTS = {
  primary: 'bg-gradient-to-br from-primary/5 to-primary/10',
  success: 'bg-gradient-to-br from-success/5 to-success/10',
  warning: 'bg-gradient-to-br from-warning/5 to-warning/10',
  danger: 'bg-gradient-to-br from-destructive/5 to-destructive/10',
} as const;

/** 悬停效果系统 */
const HOVER_EFFECTS = {
  lift: 'hover:-translate-y-1',
  scale: 'hover:scale-105',
  glow: (color: string) => `hover:shadow-${color}`,
} as const;

// ==================== 容器类组件变体 ====================

export const dashboardCardVariants = cva(
  [
    'relative overflow-hidden bg-card rounded-xl p-4',
    'backdrop-blur-sm border border-border/50',
    TRANSITIONS.base,
    SHADOWS.soft,
    HOVER_EFFECTS.lift,
  ],
  {
    variants: {
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
      variant: {
        default: '',
        primary: [
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1',
          'before:bg-gradient-to-r before:from-primary before:to-accent',
          'before:opacity-0 hover:before:opacity-100',
          'before:transition-opacity before:duration-300',
          'hover:shadow-primary/20',
        ],
        success: [
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1',
          'before:bg-gradient-to-r before:from-success before:to-emerald-400',
          'before:opacity-0 hover:before:opacity-100',
          'before:transition-opacity before:duration-300',
          'hover:shadow-success/20',
        ],
        warning: [
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1',
          'before:bg-gradient-to-r before:from-warning before:to-orange-400',
          'before:opacity-0 hover:before:opacity-100',
          'before:transition-opacity before:duration-300',
          'hover:shadow-warning/20',
        ],
        danger: [
          'before:absolute before:top-0 before:left-0 before:right-0 before:h-1',
          'before:bg-gradient-to-r before:from-destructive before:to-red-400',
          'before:opacity-0 hover:before:opacity-100',
          'before:transition-opacity before:duration-300',
          'hover:shadow-destructive/20',
        ],
      },
      highlighted: {
        true: [
          'after:absolute after:top-0 after:right-0 after:w-1 after:h-full',
          'after:bg-primary after:opacity-100',
          'after:transition-opacity after:duration-300',
        ],
        false: [
          'after:absolute after:top-0 after:right-0 after:w-1 after:h-full',
          'after:bg-primary after:opacity-0',
          'after:transition-opacity after:duration-300',
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      highlighted: false,
    },
  }
);

export const chartContainerVariants = cva(
  [
    'relative p-4 bg-card border border-border/50 rounded-xl overflow-hidden',
    TRANSITIONS.base,
    SHADOWS.soft,
  ],
  {
    variants: {
      size: {
        sm: 'h-40',
        default: 'h-48',
        lg: 'h-64',
        xl: 'h-80',
      },
      pattern: {
        true: [
          'before:absolute before:inset-0 before:pointer-events-none',
          'before:bg-[linear-gradient(45deg,transparent_48%,rgb(var(--border))_48%,rgb(var(--border))_52%,transparent_52%)]',
          'before:bg-[length:24px_24px] before:opacity-[0.02]',
        ],
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      pattern: true,
    },
  }
);

// ==================== 指标类组件变体 ====================

export const metricCardVariants = cva(
  [
    'text-center rounded-lg backdrop-blur-sm',
    'border-2 border-transparent',
    TRANSITIONS.base,
  ],
  {
    variants: {
      variant: {
        primary: [
          GRADIENTS.primary,
          'hover:border-primary/25',
          'hover:shadow-primary/20',
        ],
        success: [
          GRADIENTS.success,
          'hover:border-success/25',
          'hover:shadow-success/20',
        ],
        warning: [
          GRADIENTS.warning,
          'hover:border-warning/25',
          'hover:shadow-warning/20',
        ],
        danger: [
          GRADIENTS.danger,
          'hover:border-destructive/25',
          'hover:shadow-destructive/20',
        ],
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export const metricValueVariants = cva(
  ['font-mono font-black leading-none tracking-tight mb-3', TRANSITIONS.colors],
  {
    variants: {
      size: {
        sm: 'text-2xl',
        default: 'text-4xl lg:text-5xl',
        lg: 'text-5xl lg:text-6xl',
        xl: 'text-6xl lg:text-7xl',
      },
      variant: {
        primary: 'text-primary',
        success: 'text-success',
        warning: 'text-warning',
        danger: 'text-destructive',
        neutral: 'text-foreground',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
  }
);

// ==================== 进度类组件变体 ====================

export const progressBarVariants = cva(
  ['w-full bg-muted rounded-full overflow-hidden'],
  {
    variants: {
      size: {
        sm: 'h-2',
        default: 'h-3',
        lg: 'h-4',
        xl: 'h-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const progressFillVariants = cva(
  ['h-full rounded-full relative', 'transition-all duration-1000 ease-out'],
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-destructive',
      },
      shine: {
        true: [
          'after:absolute after:inset-0 after:rounded-full',
          'after:bg-white/20 after:animate-progress-shine',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shine: false,
    },
  }
);

export const intensityBarVariants = cva(
  ['w-full bg-muted rounded-full overflow-hidden'],
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
  ['h-full rounded-full transition-all duration-1000 ease-out'],
  {
    variants: {
      intensity: {
        'very-positive': 'bg-emerald-500',
        positive: 'bg-green-500',
        neutral: 'bg-amber-500',
        negative: 'bg-red-500',
        'very-negative': 'bg-rose-500',
      },
    },
    defaultVariants: {
      intensity: 'neutral',
    },
  }
);

// ==================== 状态指示器变体 ====================

export const liveIndicatorVariants = cva(
  [
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
    'text-xs font-bold uppercase tracking-wide',
  ],
  {
    variants: {
      status: {
        online: 'bg-success text-success-foreground',
        offline: 'bg-destructive text-destructive-foreground',
        warning: 'bg-warning text-warning-foreground',
      },
    },
    defaultVariants: {
      status: 'online',
    },
  }
);

export const statusDotVariants = cva(
  ['inline-block w-2 h-2 rounded-full mr-2 relative'],
  {
    variants: {
      status: {
        online: 'bg-success shadow-[0_0_0_2px] shadow-success/20',
        offline: 'bg-destructive shadow-[0_0_0_2px] shadow-destructive/20',
        warning: 'bg-warning shadow-[0_0_0_2px] shadow-warning/20',
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

export const trendIndicatorVariants = cva(
  [
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
    'text-xs font-semibold border',
    TRANSITIONS.fast,
  ],
  {
    variants: {
      trend: {
        up: 'bg-success/10 text-success border-success/20 hover:bg-success/20',
        down: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20',
        neutral:
          'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  }
);

// ==================== 舆情专用组件变体 ====================

export const sentimentBadgeVariants = cva(
  [
    'inline-flex items-center px-2.5 py-1 rounded-md',
    'text-xs font-medium border',
  ],
  {
    variants: {
      sentiment: {
        'very-positive': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        positive: 'bg-green-50 text-green-700 border-green-200',
        neutral: 'bg-amber-50 text-amber-700 border-amber-200',
        negative: 'bg-red-50 text-red-700 border-red-200',
        'very-negative': 'bg-rose-50 text-rose-700 border-rose-200',
      },
    },
    defaultVariants: {
      sentiment: 'neutral',
    },
  }
);

export const wordcloudTagVariants = cva(
  [
    'inline-block px-3 py-1 m-1 rounded-full',
    'text-xs font-semibold border cursor-pointer',
    'relative overflow-hidden',
    TRANSITIONS.base,
    HOVER_EFFECTS.scale,
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground border-primary/30',
          'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/25',
        ],
        secondary: [
          'bg-accent text-accent-foreground border-accent/30',
          'hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/25',
        ],
      },
      shine: {
        true: [
          'before:absolute before:top-0 before:-left-full before:w-full before:h-full',
          'before:bg-white/20 before:transition-all before:duration-700',
          'hover:before:left-full',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shine: true,
    },
  }
);

export const wordcloudContainerVariants = cva([
  'flex flex-wrap gap-2 p-4 items-center justify-center',
  'rounded-lg bg-muted/5',
]);

// ==================== 类型导出 ====================

export type DashboardCardVariants = VariantProps<typeof dashboardCardVariants>;
export type ChartContainerVariants = VariantProps<
  typeof chartContainerVariants
>;
export type MetricCardVariants = VariantProps<typeof metricCardVariants>;
export type MetricValueVariants = VariantProps<typeof metricValueVariants>;
export type ProgressBarVariants = VariantProps<typeof progressBarVariants>;
export type ProgressFillVariants = VariantProps<typeof progressFillVariants>;
export type IntensityBarVariants = VariantProps<typeof intensityBarVariants>;
export type IntensityFillVariants = VariantProps<typeof intensityFillVariants>;
export type LiveIndicatorVariants = VariantProps<typeof liveIndicatorVariants>;
export type StatusDotVariants = VariantProps<typeof statusDotVariants>;
export type TrendIndicatorVariants = VariantProps<
  typeof trendIndicatorVariants
>;
export type SentimentBadgeVariants = VariantProps<
  typeof sentimentBadgeVariants
>;
export type WordcloudTagVariants = VariantProps<typeof wordcloudTagVariants>;
