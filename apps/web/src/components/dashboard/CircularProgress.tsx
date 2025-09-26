import { cn } from '@sker/ui';
import { forwardRef, useMemo, type ReactNode } from 'react';

/**
 * 环形进度条组件
 *
 * 设计理念：
 * - 流体动画和渐变美学
 * - 支持自定义内容和多种尺寸
 * - 高度可配置的视觉变体
 * - 无障碍访问支持
 *
 * @author SKER Team
 * @version 2.0.0
 */

// ==================== 类型定义 ====================

interface CircularProgressProps {
  /** 进度值 (0-100) */
  value: number;
  /** 尺寸变体 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 视觉变体 */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  /** 线条粗细 */
  thickness?: number;
  /** 显示数值 */
  showValue?: boolean;
  /** 动画持续时间 (ms) */
  duration?: number;
  /** 自定义内容 */
  children?: ReactNode;
  /** 额外样式 */
  className?: string;
}

// ==================== 设计系统配置 ====================

/** 尺寸配置表 */
const SIZE_CONFIG = {
  sm: {
    size: 48,
    stroke: 4,
    fontSize: 'text-xs',
    shadow: 'drop-shadow-sm',
  },
  md: {
    size: 64,
    stroke: 6,
    fontSize: 'text-sm',
    shadow: 'drop-shadow-md',
  },
  lg: {
    size: 96,
    stroke: 8,
    fontSize: 'text-base',
    shadow: 'drop-shadow-lg',
  },
  xl: {
    size: 128,
    stroke: 10,
    fontSize: 'text-lg',
    shadow: 'drop-shadow-xl',
  },
} as const;

/** 颜色主题配置 */
const VARIANT_CONFIG = {
  primary: {
    colors: ['#1e40af', '#3b82f6', '#60a5fa'],
    cssVar: 'var(--primary)',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  success: {
    colors: ['#047857', '#059669', '#22c55e'],
    cssVar: 'var(--success)',
    glowColor: 'rgba(34, 197, 94, 0.3)',
  },
  warning: {
    colors: ['#d97706', '#f59e0b', '#fbbf24'],
    cssVar: 'var(--warning)',
    glowColor: 'rgba(251, 191, 36, 0.3)',
  },
  danger: {
    colors: ['#dc2626', '#ef4444', '#f87171'],
    cssVar: 'var(--destructive)',
    glowColor: 'rgba(248, 113, 113, 0.3)',
  },
  gradient: {
    colors: ['#8b5cf6', '#a855f7', '#c084fc'],
    cssVar: 'var(--accent)',
    glowColor: 'rgba(192, 132, 252, 0.3)',
  },
} as const;

// ==================== 工具函数 ====================

/** 创建渐变定义 */
const createGradientDefs = () => (
  <defs>
    {Object.entries(VARIANT_CONFIG).map(([variant, config]) => (
      <linearGradient
        key={variant}
        id={`gradient-${variant}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor={config.colors[0]} />
        <stop offset="50%" stopColor={config.colors[1]} />
        <stop offset="100%" stopColor={config.colors[2]} />
      </linearGradient>
    ))}

    {/* 发光滤镜 */}
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

/** 标准化进度值 */
const normalizeValue = (value: number): number =>
  Math.max(0, Math.min(100, value));

// ==================== 组件实现 ====================

export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      value,
      size = 'md',
      variant = 'primary',
      thickness,
      showValue = true,
      duration = 1000,
      children,
      className,
    },
    ref
  ) => {
    // 计算配置
    const config = SIZE_CONFIG[size];
    const variantStyle = VARIANT_CONFIG[variant];
    const strokeWidth = thickness ?? config.stroke;
    const normalizedValue = normalizeValue(value);

    // 几何计算
    const { radius, circumference, strokeDashoffset } = useMemo(() => {
      const center = config.size / 2;
      const r = center - strokeWidth / 2;
      const circ = 2 * Math.PI * r;
      const offset = circ - (normalizedValue / 100) * circ;

      return {
        radius: r,
        circumference: circ,
        strokeDashoffset: offset,
      };
    }, [config.size, strokeWidth, normalizedValue]);

    const center = config.size / 2;

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          'transition-all duration-300 hover:scale-105',
          className
        )}
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`进度: ${normalizedValue}%`}
      >
        <svg
          width={config.size}
          height={config.size}
          className={cn(
            'transform -rotate-90 transition-all ease-out',
            config.shadow
          )}
          style={{ transitionDuration: `${duration}ms` }}
        >
          {createGradientDefs()}

          {/* 背景圆环 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={strokeWidth}
            opacity="0.15"
            className="transition-opacity duration-300"
          />

          {/* 主进度圆环 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${variant})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all ease-out"
            style={{
              transitionDuration: `${duration}ms`,
              filter: 'url(#glow)',
            }}
          />

          {/* 光晕效果 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={variantStyle.cssVar}
            strokeWidth={1}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            opacity="0.4"
            className="animate-pulse transition-all ease-out"
            style={{ transitionDuration: `${duration}ms` }}
          />
        </svg>

        {/* 中央内容区域 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {children ? (
            <div className="text-center">{children}</div>
          ) : showValue ? (
            <div className="text-center space-y-1">
              <div
                className={cn(
                  'font-mono font-black leading-none tabular-nums',
                  'transition-colors duration-300',
                  config.fontSize
                )}
                style={{ color: variantStyle.cssVar }}
              >
                {Math.round(normalizedValue)}%
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                进度
              </div>
            </div>
          ) : null}
        </div>

        {/* 装饰性外圈光效 */}
        <div
          className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${variantStyle.glowColor} 0%, transparent 70%)`,
          }}
        />
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
