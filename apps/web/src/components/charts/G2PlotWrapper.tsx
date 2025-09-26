import React, { useEffect, useRef } from 'react';
import {
  Area,
  Bar,
  Line,
  Pie,
  Column,
  Scatter,
  Heatmap,
  Radar,
  Rose,
  Gauge,
  Liquid,
  WordCloud,
  Sankey,
  Sunburst,
  Treemap,
  DualAxes,
  Mix,
  Stock,
  Funnel,
  Waterfall,
  RadialBar,
  TinyArea,
  TinyLine,
  TinyColumn,
  Progress,
  RingProgress,
  Bullet,
} from '@antv/g2plot';
import { cn } from '@sker/ui';

// 通用图表容器接口
export interface ChartContainerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  className,
  style,
  children,
}) => {
  return (
    <div
      className={cn(
        'relative w-full h-full bg-card rounded-lg border border-border p-4',
        '[&_.g2-tooltip]:!bg-card',
        '[&_.g2-tooltip]:!border-border',
        '[&_.g2-tooltip]:!text-foreground',
        '[&_.g2-tooltip]:!shadow-lg',
        '[&_.g2-legend]:!color-muted-foreground',
        '[&_.g2-axis-label]:!fill-muted-foreground',
        '[&_.g2-axis-line]:!stroke-border',
        '[&_.g2-axis-tick]:!stroke-border',
        '[&_.g2-grid-line]:!stroke-border/50',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

// 获取主题配置
const getThemeConfig = () => ({
  // 背景色
  backgroundColor: 'transparent',

  // 默认颜色序列（符合我们的主题）
  colors: [
    'var(--primary)', // 主色 - 蓝色
    'var(--success)', // 成功色 - 绿色
    'var(--warning)', // 警告色 - 橙色
    'var(--destructive)', // 危险色 - 红色
    'var(--info)', // 信息色 - 青色
    '#7c3aed', // 紫色
    '#ec4899', // 粉色
    '#64748b', // 灰色
  ],

  // 图表样式
  theme: {
    axis: {
      label: {
        style: {
          fill: 'hsl(var(--muted-foreground))',
          fontSize: 12,
          fontFamily: 'Rubik, "PingFang SC", "Microsoft YaHei", sans-serif',
        },
      },
      line: {
        style: {
          stroke: 'hsl(var(--border))',
          lineWidth: 1,
        },
      },
      tickLine: {
        style: {
          stroke: 'hsl(var(--border))',
          lineWidth: 1,
        },
      },
      grid: {
        line: {
          style: {
            stroke: 'hsl(var(--border))',
            lineWidth: 0.5,
            opacity: 0.5,
          },
        },
      },
    },
    legend: {
      text: {
        style: {
          fill: 'hsl(var(--muted-foreground))',
          fontSize: 12,
          fontFamily: 'Rubik, "PingFang SC", "Microsoft YaHei", sans-serif',
        },
      },
    },
    tooltip: {
      container: {
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '6px',
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        color: 'hsl(var(--foreground))',
        fontSize: '12px',
        fontFamily: 'Rubik, "PingFang SC", "Microsoft YaHei", sans-serif',
      },
    },
  },
});

// 通用图表Hook
export const useG2Plot = <T = any,>(
  ChartClass: new (container: string | HTMLElement, options: T) => any,
  data: any[],
  config: T,
  dependencies: any[] = []
) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const plotRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    // 销毁之前的图表实例
    if (plotRef.current) {
      plotRef.current.destroy();
    }

    // 创建新的图表实例
    const themeConfig = getThemeConfig();
    const mergedConfig = {
      ...themeConfig,
      ...config,
      data,
    };

    plotRef.current = new ChartClass(chartRef.current, mergedConfig);
    plotRef.current.render();

    return () => {
      if (plotRef.current) {
        plotRef.current.destroy();
        plotRef.current = null;
      }
    };
  }, [ChartClass, config, data, dependencies]);

  return { chartRef, plot: plotRef.current };
};

// 常用图表组件
export interface LineChartProps {
  data: any[];
  xField: string;
  yField: string;
  seriesField?: string;
  className?: string;
  height?: number;
  config?: any;
}

export const G2LineChart: React.FC<LineChartProps> = ({
  data,
  xField,
  yField,
  seriesField,
  className,
  height = 300,
  config = {},
}) => {
  const { chartRef } = useG2Plot(
    Line,
    data,
    {
      xField,
      yField,
      seriesField,
      height,
      smooth: true,
      point: {
        size: 4,
        shape: 'circle',
      },
      ...config,
    },
    [xField, yField, seriesField, height]
  );

  return (
    <ChartContainer className={className}>
      <div ref={chartRef} style={{ height }} />
    </ChartContainer>
  );
};

export interface BarChartProps {
  data: any[];
  xField: string;
  yField: string;
  seriesField?: string;
  className?: string;
  height?: number;
  config?: any;
}

export const G2BarChart: React.FC<BarChartProps> = ({
  data,
  xField,
  yField,
  seriesField,
  className,
  height = 300,
  config = {},
}) => {
  const { chartRef } = useG2Plot(
    Bar,
    data,
    {
      xField,
      yField,
      seriesField,
      height,
      ...config,
    },
    [xField, yField, seriesField, height]
  );

  return (
    <ChartContainer className={className}>
      <div ref={chartRef} style={{ height }} />
    </ChartContainer>
  );
};

export interface PieChartProps {
  data: any[];
  angleField: string;
  colorField: string;
  className?: string;
  height?: number;
  config?: any;
}

export const G2PieChart: React.FC<PieChartProps> = ({
  data,
  angleField,
  colorField,
  className,
  height = 300,
  config = {},
}) => {
  const { chartRef } = useG2Plot(
    Pie,
    data,
    {
      angleField,
      colorField,
      height,
      radius: 0.8,
      label: {
        type: 'outer',
        content: '{name}: {percentage}',
        style: {
          fill: 'hsl(var(--muted-foreground))',
          fontSize: 12,
        },
      },
      interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
      ...config,
    },
    [angleField, colorField, height]
  );

  return (
    <ChartContainer className={className}>
      <div ref={chartRef} style={{ height }} />
    </ChartContainer>
  );
};

export interface AreaChartProps {
  data: any[];
  xField: string;
  yField: string;
  seriesField?: string;
  className?: string;
  height?: number;
  config?: any;
}

export const G2AreaChart: React.FC<AreaChartProps> = ({
  data,
  xField,
  yField,
  seriesField,
  className,
  height = 300,
  config = {},
}) => {
  const { chartRef } = useG2Plot(
    Area,
    data,
    {
      xField,
      yField,
      seriesField,
      height,
      smooth: true,
      ...config,
    },
    [xField, yField, seriesField, height]
  );

  return (
    <ChartContainer className={className}>
      <div ref={chartRef} style={{ height }} />
    </ChartContainer>
  );
};

// 导出所有G2Plot类，供高级用户使用
export {
  Area,
  Bar,
  Line,
  Pie,
  Column,
  Scatter,
  Heatmap,
  Radar,
  Rose,
  Gauge,
  Liquid,
  WordCloud,
  Sankey,
  Sunburst,
  Treemap,
  DualAxes,
  Mix,
  Stock,
  Funnel,
  Waterfall,
  RadialBar,
  TinyArea,
  TinyLine,
  TinyColumn,
  Progress,
  RingProgress,
  Bullet,
};
