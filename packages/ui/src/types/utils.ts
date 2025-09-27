/**
 * 舆情管理系统组件库 - 类型工具库
 *
 * 本文件提供了一套完整的 TypeScript 类型工具，
 * 用于增强组件库的类型安全性和开发体验。
 */

import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from 'react';

// ============================================================================
// 基础工具类型
// ============================================================================

/** 深度可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 深度必需 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/** 严格排除 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** 严格提取 */
export type StrictPick<T, K extends keyof T> = Pick<T, K>;

/** 条件类型 */
export type If<C extends boolean, T, F> = C extends true ? T : F;

/** 非空 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/** 可为空 */
export type Nullable<T> = T | null;

/** 可为未定义 */
export type Optional<T> = T | undefined;

/** 数组元素类型 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/** 对象值类型 */
export type ObjectValues<T> = T[keyof T];

/** 对象键类型 */
export type ObjectKeys<T> = keyof T;

/** 函数参数类型 */
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;

/** 函数返回类型 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

/** Promise 解包 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// ============================================================================
// 组件相关工具类型
// ============================================================================

/** 提取组件属性 */
export type ExtractProps<T> = T extends ComponentType<infer P> ? P : never;

/** 组件类型 */
export type ComponentType<P = {}> =
  | ((props: P) => ReactElement | null)
  | (new (props: P) => React.Component<P>);

/** 合并属性 */
export type MergeProps<T, U> = StrictOmit<T, keyof U & keyof T> & U;

/** 覆盖属性 */
export type OverrideProps<T, U> = StrictOmit<T, keyof U & keyof T> & U;

/** 扩展属性 */
export type ExtendProps<T, U> = T & U;

/** HTML 元素属性 */
export type HTMLProps<T extends ElementType> = ComponentPropsWithoutRef<T>;

/** 原生元素属性（排除 ref） */
export type NativeElementProps<T extends ElementType> = StrictOmit<
  ComponentPropsWithoutRef<T>,
  'ref'
>;

/** 转发引用组件属性 */
export type ForwardRefProps<T extends ElementType, P = {}> = MergeProps<
  ComponentPropsWithoutRef<T>,
  P
>;

// ============================================================================
// 字符串操作类型
// ============================================================================

/** 首字母大写 */
export type Capitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;

/** 首字母小写 */
export type Uncapitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${R}`
  : S;

/** 驼峰转短横线 */
export type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${KebabCase<U>}`
  : S;

/** 短横线转驼峰 */
export type CamelCase<S extends string> =
  S extends `${infer P1}-${infer P2}${infer P3}`
    ? `${P1}${Capitalize<CamelCase<`${P2}${P3}`>>}`
    : S;

/** 路径分割 */
export type Split<
  S extends string,
  D extends string,
> = S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

/** 路径连接 */
export type Join<T extends string[], D extends string> = T extends [
  infer F,
  ...infer R,
]
  ? F extends string
    ? R extends string[]
      ? R['length'] extends 0
        ? F
        : `${F}${D}${Join<R, D>}`
      : F
    : ''
  : '';

// ============================================================================
// 变体和样式相关类型
// ============================================================================

/** 变体键类型 */
export type VariantKeys<T> =
  T extends Record<string, Record<infer K, any>> ? K : never;

/** 变体值类型 */
export type VariantValues<T> =
  T extends Record<infer K, Record<string, any>> ? K : never;

/** CSS 属性值 */
export type CSSValue = string | number;

/** CSS 属性对象 */
export type CSSProperties = {
  [K in keyof React.CSSProperties]?: React.CSSProperties[K];
};

/** 主题变量 */
export type ThemeVariable = `var(--${string})`;

/** CSS 变量 */
export type CSSVariable = `--${string}`;

/** 样式对象 */
export type StyleObject = Record<string, CSSValue>;

/** 响应式值 */
export type ResponsiveValue<T> = T | T[] | Record<string, T>;

// ============================================================================
// 事件相关类型
// ============================================================================

/** 事件处理器类型 */
export type EventHandler<T = Event> = (event: T) => void;

/** 鼠标事件处理器 */
export type MouseEventHandler<T = Element> = EventHandler<React.MouseEvent<T>>;

/** 键盘事件处理器 */
export type KeyboardEventHandler<T = Element> = EventHandler<
  React.KeyboardEvent<T>
>;

/** 焦点事件处理器 */
export type FocusEventHandler<T = Element> = EventHandler<React.FocusEvent<T>>;

/** 变化事件处理器 */
export type ChangeEventHandler<T = Element> = EventHandler<
  React.ChangeEvent<T>
>;

/** 表单事件处理器 */
export type FormEventHandler<T = Element> = EventHandler<React.FormEvent<T>>;

// ============================================================================
// 状态和数据相关类型
// ============================================================================

/** 加载状态 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** 异步状态 */
export interface AsyncState<T, E = Error> {
  data?: T;
  error?: E;
  loading: boolean;
  state: LoadingState;
}

/** 分页信息 */
export interface PaginationInfo {
  current: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** API 响应 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  code?: string | number;
  pagination?: PaginationInfo;
  timestamp: number;
}

/** 排序配置 */
export interface SortConfig<T = string> {
  field: T;
  direction: 'asc' | 'desc';
}

/** 筛选配置 */
export interface FilterConfig<T = any> {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'like';
  value: T;
}

// ============================================================================
// 表单相关类型
// ============================================================================

/** 表单字段值 */
export type FieldValue =
  | string
  | number
  | boolean
  | Date
  | File
  | null
  | undefined;

/** 表单值对象 */
export type FormValues = Record<string, FieldValue>;

/** 表单错误 */
export type FormErrors<T = FormValues> = Partial<Record<keyof T, string>>;

/** 表单状态 */
export interface FormState<T = FormValues> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

/** 字段配置 */
export interface FieldConfig {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: FieldValue;
  validation?: ValidationRule[];
}

/** 验证规则 */
export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: FieldValue) => boolean;
}

// ============================================================================
// 图表和数据可视化类型
// ============================================================================

/** 数据点 */
export interface DataPoint {
  x: number | string | Date;
  y: number;
  label?: string;
  color?: string;
  metadata?: Record<string, any>;
}

/** 图表数据系列 */
export interface ChartSeries {
  name: string;
  data: DataPoint[];
  color?: string;
  type?: 'line' | 'bar' | 'area' | 'scatter';
  visible?: boolean;
}

/** 坐标轴配置 */
export interface AxisConfig {
  label?: string;
  min?: number;
  max?: number;
  type?: 'linear' | 'logarithmic' | 'datetime' | 'category';
  format?: string;
  grid?: boolean;
}

/** 图表配置 */
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';
  series: ChartSeries[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  legend?: {
    show: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
  };
  tooltip?: {
    show: boolean;
    format?: string;
  };
  animation?: {
    enabled: boolean;
    duration: number;
  };
}

// ============================================================================
// 业务相关工具类型
// ============================================================================

/** 舆情情感类型 */
export type SentimentType =
  | 'positive'
  | 'negative'
  | 'neutral'
  | 'mixed'
  | 'unknown';

/** 紧急程度 */
export type UrgencyLevel = 'very-low' | 'low' | 'medium' | 'high' | 'critical';

/** 趋势方向 */
export type TrendDirection = 'up' | 'down' | 'stable';

/** 媒体类型 */
export type MediaType =
  | 'news'
  | 'social'
  | 'forum'
  | 'video'
  | 'blog'
  | 'wechat';

/** 地理层级 */
export type GeographicLevel = 'country' | 'province' | 'city' | 'district';

/** 业务状态 */
export type BusinessStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'published'
  | 'archived';

// ============================================================================
// 实用工具类型
// ============================================================================

/** 创建严格的枚举类型 */
export type Enum<T extends Record<string, string | number>> = T[keyof T];

/** 创建联合类型的键值对 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/** 获取 Promise 的解析类型 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

/** 递归键路径 */
export type KeyPath<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${KeyPath<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${KeyPath<T[K], keyof T[K]>}`
    : K
  : never;

/** 根据路径获取值类型 */
export type ValueAtPath<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? ValueAtPath<T[K], Rest>
      : never
    : never;

/** 类型守卫函数 */
export type TypeGuard<T> = (value: unknown) => value is T;

/** 类型断言函数 */
export type TypeAssertion<T> = (value: unknown) => T;

/** 类型谓词 */
export type TypePredicate<T> = (value: T) => boolean;

/** 类型映射器 */
export type TypeMapper<T, U> = (value: T) => U;

/** 类型比较器 */
export type TypeComparator<T> = (a: T, b: T) => number;

/** 类型序列化器 */
export type TypeSerializer<T> = {
  serialize: (value: T) => string;
  deserialize: (str: string) => T;
};

// ============================================================================
// 高级工具类型
// ============================================================================

/** 模板字面量类型辅助 */
export type Template<T extends string> = T;

/** 品牌类型（名义类型） */
export type Brand<T, U> = T & { readonly __brand: U };

/** 不透明类型 */
export type Opaque<T, U> = T & { readonly __opaque: U };

/** 标记类型 */
export type Tagged<T, U extends string> = T & { readonly __tag: U };

/** 单位类型 */
export type Unit<T extends string> = Brand<number, T>;

/** 路径字符串 */
export type Path = Brand<string, 'Path'>;

/** URL 字符串 */
export type URL = Brand<string, 'URL'>;

/** 邮箱字符串 */
export type Email = Brand<string, 'Email'>;

/** 时间戳 */
export type Timestamp = Brand<number, 'Timestamp'>;

/** ID 类型 */
export type ID = Brand<string, 'ID'>;

/** UUID 类型 */
export type UUID = Brand<string, 'UUID'>;

// ============================================================================
// 类型验证和转换
// ============================================================================

/** 运行时类型检查器 */
export interface TypeChecker<T> {
  /** 检查值是否符合类型 */
  check: TypeGuard<T>;
  /** 断言值符合类型 */
  assert: TypeAssertion<T>;
  /** 类型名称 */
  typeName: string;
}

/** 类型转换器 */
export interface TypeConverter<From, To> {
  /** 转换函数 */
  convert: TypeMapper<From, To>;
  /** 是否可以转换 */
  canConvert: TypePredicate<From>;
  /** 转换类型名称 */
  fromType: string;
  /** 目标类型名称 */
  toType: string;
}

/** 类型验证结果 */
export interface ValidationResult<T> {
  /** 是否有效 */
  valid: boolean;
  /** 验证后的值 */
  value?: T;
  /** 错误信息 */
  errors?: string[];
}

/** 类型验证器 */
export interface TypeValidator<T> {
  /** 验证函数 */
  validate: (value: unknown) => ValidationResult<T>;
  /** 验证器名称 */
  name: string;
}
