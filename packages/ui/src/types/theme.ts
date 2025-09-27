/**
 * 舆情管理系统组件库 - 主题类型定义
 *
 * 本文件定义了组件库中使用的完整主题系统类型，
 * 支持深度定制和类型安全的主题配置。
 */

// ============================================================================
// 基础主题类型
// ============================================================================

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/** 色彩语义类型 */
export type SemanticColorType =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/** 中性色类型 */
export type NeutralColorType =
  | 'background'
  | 'foreground'
  | 'muted'
  | 'border'
  | 'input'
  | 'ring';

/** 尺寸变体 */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/** 边距变体 */
export type SpacingVariant =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

/** 圆角变体 */
export type RadiusVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** 阴影变体 */
export type ShadowVariant =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'inner';

// ============================================================================
// 色彩系统类型
// ============================================================================

/** HSL 色彩值 */
export interface HSLColor {
  h: number; // 色相 0-360
  s: number; // 饱和度 0-100
  l: number; // 亮度 0-100
}

/** RGB 色彩值 */
export interface RGBColor {
  r: number; // 红色 0-255
  g: number; // 绿色 0-255
  b: number; // 蓝色 0-255
}

/** HEX 色彩值 */
export type HEXColor = string; // #000000 格式

/** 色彩值联合类型 */
export type ColorValue = HSLColor | RGBColor | HEXColor | string;

/** 色彩变体对象 */
export interface ColorVariants {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string; // 主色调
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/** 语义色彩配置 */
export interface SemanticColorConfig {
  /** 默认色调 */
  DEFAULT: string;
  /** 前景色（文本色） */
  foreground: string;
  /** 色彩变体 */
  variants?: Partial<ColorVariants>;
}

/** 舆情专用色彩 */
export interface SentimentColors {
  /** 正面情感色 */
  positive: SemanticColorConfig;
  /** 负面情感色 */
  negative: SemanticColorConfig;
  /** 中性情感色 */
  neutral: SemanticColorConfig;
  /** 混合情感色 */
  mixed: SemanticColorConfig;
  /** 未知情感色 */
  unknown: SemanticColorConfig;
}

/** 紧急程度色彩 */
export interface UrgencyColors {
  /** 极低 */
  'very-low': SemanticColorConfig;
  /** 低 */
  low: SemanticColorConfig;
  /** 中等 */
  medium: SemanticColorConfig;
  /** 高 */
  high: SemanticColorConfig;
  /** 严重 */
  critical: SemanticColorConfig;
}

/** 状态色彩 */
export interface StatusColors {
  /** 在线 */
  online: SemanticColorConfig;
  /** 离线 */
  offline: SemanticColorConfig;
  /** 忙碌 */
  busy: SemanticColorConfig;
  /** 离开 */
  away: SemanticColorConfig;
  /** 错误 */
  error: SemanticColorConfig;
  /** 成功 */
  success: SemanticColorConfig;
  /** 警告 */
  warning: SemanticColorConfig;
  /** 加载中 */
  loading: SemanticColorConfig;
}

// ============================================================================
// 主题配置类型
// ============================================================================

/** 字体配置 */
export interface FontConfig {
  /** 字体族 */
  family: {
    /** 无衬线字体（默认） */
    sans: string[];
    /** 等宽字体 */
    mono: string[];
    /** 衬线字体 */
    serif?: string[];
  };
  /** 字体大小 */
  size: Record<SizeVariant, string>;
  /** 字重 */
  weight: {
    thin: string;
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
    black: string;
  };
  /** 行高 */
  lineHeight: Record<SizeVariant, string>;
  /** 字母间距 */
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
}

/** 间距配置 */
export interface SpacingConfig {
  [key: string]: string;
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

/** 圆角配置 */
export interface RadiusConfig {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

/** 阴影配置 */
export interface ShadowConfig {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

/** 动画配置 */
export interface AnimationConfig {
  /** 持续时间 */
  duration: {
    75: string;
    100: string;
    150: string;
    200: string;
    300: string;
    500: string;
    700: string;
    1000: string;
  };
  /** 缓动函数 */
  easing: {
    linear: string;
    in: string;
    out: string;
    'in-out': string;
  };
  /** 预设动画 */
  keyframes: {
    spin: Record<string, any>;
    ping: Record<string, any>;
    pulse: Record<string, any>;
    bounce: Record<string, any>;
  };
}

/** 断点配置 */
export interface BreakpointConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// ============================================================================
// 完整主题类型
// ============================================================================

/** 主题配置 */
export interface ThemeConfig {
  /** 主题模式 */
  mode: ThemeMode;

  /** 基础语义色彩 */
  colors: {
    /** 主色调 */
    primary: SemanticColorConfig;
    /** 次要色调 */
    secondary: SemanticColorConfig;
    /** 强调色 */
    accent: SemanticColorConfig;
    /** 成功色 */
    success: SemanticColorConfig;
    /** 警告色 */
    warning: SemanticColorConfig;
    /** 错误色 */
    error: SemanticColorConfig;
    /** 信息色 */
    info: SemanticColorConfig;

    /** 中性色 */
    background: string;
    foreground: string;
    muted: {
      DEFAULT: string;
      foreground: string;
    };
    popover: {
      DEFAULT: string;
      foreground: string;
    };
    card: {
      DEFAULT: string;
      foreground: string;
    };
    border: string;
    input: string;
    ring: string;
  };

  /** 舆情专用色彩 */
  sentiment: SentimentColors;

  /** 紧急程度色彩 */
  urgency: UrgencyColors;

  /** 状态色彩 */
  status: StatusColors;

  /** 字体配置 */
  fonts: FontConfig;

  /** 间距配置 */
  spacing: SpacingConfig;

  /** 圆角配置 */
  radius: RadiusConfig;

  /** 阴影配置 */
  shadow: ShadowConfig;

  /** 动画配置 */
  animation: AnimationConfig;

  /** 断点配置 */
  breakpoints: BreakpointConfig;
}

// ============================================================================
// 主题提供器类型
// ============================================================================

/** 主题上下文类型 */
export interface ThemeContextType {
  /** 当前主题配置 */
  theme: ThemeConfig;
  /** 当前主题模式 */
  mode: ThemeMode;
  /** 设置主题模式 */
  setMode: (mode: ThemeMode) => void;
  /** 切换主题模式 */
  toggleMode: () => void;
  /** 自定义主题配置 */
  customTheme?: Partial<ThemeConfig>;
  /** 设置自定义主题 */
  setCustomTheme: (theme: Partial<ThemeConfig>) => void;
  /** 重置主题 */
  resetTheme: () => void;
}

/** 主题提供器属性 */
export interface ThemeProviderProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 默认主题模式 */
  defaultMode?: ThemeMode;
  /** 自定义主题配置 */
  customTheme?: Partial<ThemeConfig>;
  /** 启用系统主题检测 */
  enableSystem?: boolean;
  /** 存储键名 */
  storageKey?: string;
  /** 主题变化回调 */
  onThemeChange?: (theme: ThemeConfig) => void;
}

// ============================================================================
// CSS 变量类型
// ============================================================================

/** CSS 变量映射 */
export interface CSSVariables {
  /** 色彩变量 */
  '--background': string;
  '--foreground': string;
  '--muted': string;
  '--muted-foreground': string;
  '--popover': string;
  '--popover-foreground': string;
  '--card': string;
  '--card-foreground': string;
  '--border': string;
  '--input': string;
  '--primary': string;
  '--primary-foreground': string;
  '--secondary': string;
  '--secondary-foreground': string;
  '--accent': string;
  '--accent-foreground': string;
  '--destructive': string;
  '--destructive-foreground': string;
  '--ring': string;
  '--radius': string;

  /** 舆情色彩变量 */
  '--sentiment-positive': string;
  '--sentiment-positive-foreground': string;
  '--sentiment-negative': string;
  '--sentiment-negative-foreground': string;
  '--sentiment-neutral': string;
  '--sentiment-neutral-foreground': string;
  '--sentiment-mixed': string;
  '--sentiment-mixed-foreground': string;
  '--sentiment-unknown': string;
  '--sentiment-unknown-foreground': string;

  /** 紧急程度变量 */
  '--urgency-very-low': string;
  '--urgency-low': string;
  '--urgency-medium': string;
  '--urgency-high': string;
  '--urgency-critical': string;

  /** 状态变量 */
  '--status-online': string;
  '--status-offline': string;
  '--status-busy': string;
  '--status-away': string;
  '--status-error': string;
  '--status-success': string;
  '--status-warning': string;
  '--status-loading': string;
}

// ============================================================================
// 工具类型
// ============================================================================

/** 深度可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 主题覆盖类型 */
export type ThemeOverride = DeepPartial<ThemeConfig>;

/** 色彩工具函数类型 */
export interface ColorUtils {
  /** 转换 HSL 到 HEX */
  hslToHex: (hsl: HSLColor) => HEXColor;
  /** 转换 RGB 到 HEX */
  rgbToHex: (rgb: RGBColor) => HEXColor;
  /** 转换 HEX 到 HSL */
  hexToHsl: (hex: HEXColor) => HSLColor;
  /** 转换 HEX 到 RGB */
  hexToRgb: (hex: HEXColor) => RGBColor;
  /** 生成色彩变体 */
  generateVariants: (baseColor: ColorValue) => ColorVariants;
  /** 调整色彩亮度 */
  adjustLightness: (color: ColorValue, amount: number) => ColorValue;
  /** 调整色彩饱和度 */
  adjustSaturation: (color: ColorValue, amount: number) => ColorValue;
  /** 获取对比色 */
  getContrastColor: (color: ColorValue, threshold?: number) => ColorValue;
  /** 混合色彩 */
  mixColors: (
    color1: ColorValue,
    color2: ColorValue,
    ratio?: number
  ) => ColorValue;
}

/** 主题工具函数类型 */
export interface ThemeUtils {
  /** 合并主题配置 */
  mergeTheme: (base: ThemeConfig, override: ThemeOverride) => ThemeConfig;
  /** 生成 CSS 变量 */
  generateCSSVariables: (theme: ThemeConfig) => CSSVariables;
  /** 检测系统主题模式 */
  detectSystemTheme: () => 'light' | 'dark';
  /** 验证主题配置 */
  validateTheme: (theme: ThemeConfig) => boolean;
  /** 导出主题配置 */
  exportTheme: (theme: ThemeConfig) => string;
  /** 导入主题配置 */
  importTheme: (themeString: string) => ThemeConfig;
  /** 色彩工具 */
  colors: ColorUtils;
}
