import React from 'react';
import {
  AreaChart,
  BarChart,
  LineChart,
  DonutChart,
  Card,
  Flex,
  Text,
  Metric,
  ProgressBar,
  Badge,
  Grid,
  Col,
  Title,
  Subtitle,
} from '@tremor/react';
import { cn } from '@sker/ui';

// 扩展Tremor组件，使其与我们的主题系统集成
export interface TremorCardProps {
  children: React.ReactNode;
  className?: string;
  decoration?: 'top' | 'left' | 'bottom' | 'right';
  decorationColor?:
    | 'blue'
    | 'emerald'
    | 'violet'
    | 'amber'
    | 'red'
    | 'rose'
    | 'green'
    | 'yellow'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'gray'
    | 'slate'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'orange'
    | 'lime'
    | 'cyan'
    | 'sky'
    | 'teal'
    | 'fuchsia';
}

export const TremorCard: React.FC<TremorCardProps> = ({
  children,
  className,
  decoration,
  decorationColor = 'blue',
  ...props
}) => {
  return (
    <Card
      className={cn(
        'bg-card border border-border shadow-md hover:shadow-lg transition-all duration-300',
        className
      )}
      decoration={decoration}
      decorationColor={decorationColor}
      {...props}
    >
      {children}
    </Card>
  );
};

export interface TremorMetricProps {
  children: React.ReactNode;
  className?: string;
}

export const TremorMetric: React.FC<TremorMetricProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Metric className={cn('text-foreground font-bold', className)} {...props}>
      {children}
    </Metric>
  );
};

export interface TremorTextProps {
  children: React.ReactNode;
  className?: string;
  color?:
    | 'blue'
    | 'emerald'
    | 'violet'
    | 'amber'
    | 'red'
    | 'rose'
    | 'green'
    | 'yellow'
    | 'indigo'
    | 'purple'
    | 'pink'
    | 'gray'
    | 'slate'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'orange'
    | 'lime'
    | 'cyan'
    | 'sky'
    | 'teal'
    | 'fuchsia';
}

export const TremorText: React.FC<TremorTextProps> = ({
  children,
  className,
  color,
  ...props
}) => {
  return (
    <Text
      className={cn('text-muted-foreground', className)}
      color={color || 'neutral'}
      {...props}
    >
      {children}
    </Text>
  );
};

export interface TremorTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const TremorTitle: React.FC<TremorTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Title
      className={cn('text-foreground font-semibold', className)}
      {...props}
    >
      {children}
    </Title>
  );
};

export interface TremorSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const TremorSubtitle: React.FC<TremorSubtitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Subtitle className={cn('text-muted-foreground', className)} {...props}>
      {children}
    </Subtitle>
  );
};

// 图表组件的包装器，确保与主题系统集成
export interface ChartWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        '[&_.tremor-AreaChart]:!text-foreground',
        '[&_.tremor-BarChart]:!text-foreground',
        '[&_.tremor-LineChart]:!text-foreground',
        '[&_.tremor-DonutChart]:!text-foreground',
        '[&_.tremor-Chart-root]:!bg-transparent',
        '[&_.tremor-Chart-gridLines]:!stroke-border',
        '[&_.tremor-Chart-axisText]:!fill-muted-foreground',
        '[&_.tremor-Chart-axisLine]:!stroke-border',
        '[&_.tremor-Legend-root]:!text-muted-foreground',
        '[&_.tremor-Tooltip-root]:!bg-card',
        '[&_.tremor-Tooltip-root]:!border-border',
        '[&_.tremor-Tooltip-root]:!text-foreground',
        '[&_.tremor-Tooltip-root]:!shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};

// 重新导出Tremor组件，确保类型兼容性
export {
  AreaChart,
  BarChart,
  LineChart,
  DonutChart,
  Flex,
  ProgressBar,
  Badge,
  Grid,
  Col,
} from '@tremor/react';

// 颜色映射，将我们的主题色映射到Tremor支持的颜色
export const colorMapping = {
  primary: 'blue' as const,
  success: 'emerald' as const,
  warning: 'amber' as const,
  danger: 'red' as const,
  info: 'sky' as const,
  muted: 'slate' as const,
};

export type ThemeColor = keyof typeof colorMapping;
export type TremorColor = (typeof colorMapping)[ThemeColor];
