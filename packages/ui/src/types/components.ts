/**
 * 舆情管理系统组件库 - 组件通用类型定义
 *
 * 本文件定义了组件库中使用的通用类型和接口，
 * 确保组件间的类型一致性和复用性。
 */

import React from 'react';

// ============================================================================
// 基础组件类型
// ============================================================================

/** 组件基础属性 */
export interface BaseComponentProps {
  /** CSS 类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否禁用 */
  disabled?: boolean;
  /** 测试ID */
  'data-testid'?: string;
}

/** 可点击组件属性 */
export interface ClickableProps {
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent) => void;
  /** 鼠标进入事件 */
  onMouseEnter?: (event: React.MouseEvent) => void;
  /** 鼠标离开事件 */
  onMouseLeave?: (event: React.MouseEvent) => void;
  /** 是否可点击 */
  clickable?: boolean;
}

/** 表单组件属性 */
export interface FormComponentProps {
  /** 字段名 */
  name?: string;
  /** 字段值 */
  value?: any;
  /** 默认值 */
  defaultValue?: any;
  /** 值变化回调 */
  onChange?: (value: any) => void;
  /** 失焦回调 */
  onBlur?: (event: React.FocusEvent) => void;
  /** 获焦回调 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 是否必填 */
  required?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 错误信息 */
  error?: string;
  /** 帮助文本 */
  helperText?: string;
}

/** 加载状态组件属性 */
export interface LoadingProps {
  /** 是否加载中 */
  loading?: boolean;
  /** 加载文本 */
  loadingText?: string;
  /** 加载组件 */
  loadingComponent?: React.ReactNode;
}

/** 尺寸变体 */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 颜色变体 */
export type ColorVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/** 显示变体 */
export type DisplayVariant =
  | 'default'
  | 'outline'
  | 'ghost'
  | 'solid'
  | 'gradient'
  | 'subtle';

// ============================================================================
// 布局组件类型
// ============================================================================

/** 布局组件属性 */
export interface LayoutComponentProps extends BaseComponentProps {
  /** 顶部导航 */
  header?: React.ReactNode;
  /** 侧边栏 */
  sidebar?: React.ReactNode;
  /** 底部信息 */
  footer?: React.ReactNode;
  /** 主要内容 */
  children: React.ReactNode;
}

/** 响应式布局属性 */
export interface ResponsiveLayoutProps {
  /** 断点配置 */
  breakpoints?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  /** 是否响应式 */
  responsive?: boolean;
  /** 移动端适配 */
  mobileFirst?: boolean;
}

/** 网格系统属性 */
export interface GridProps {
  /** 列数 */
  columns?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /** 间距 */
  gap?: number | string;
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** 分布方式 */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

// ============================================================================
// 数据展示组件类型
// ============================================================================

/** 表格列配置 */
export interface ColumnConfig<T = any> {
  /** 列ID */
  id: string;
  /** 数据字段键 */
  key: keyof T;
  /** 列标题 */
  title: string;
  /** 列宽度 */
  width?: number | string;
  /** 最小宽度 */
  minWidth?: number;
  /** 最大宽度 */
  maxWidth?: number;
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可筛选 */
  filterable?: boolean;
  /** 数据类型 */
  type?: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'custom';
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right';
  /** 是否固定 */
  fixed?: 'left' | 'right' | boolean;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 自定义渲染 */
  render?: (value: any, record: T, index: number) => React.ReactNode;
  /** 筛选选项 */
  filterOptions?: Array<{ label: string; value: any }>;
  /** 格式化函数 */
  formatter?: (value: any) => string;
}

/** 图表配置 */
export interface ChartConfig {
  /** 图表类型 */
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';
  /** 数据 */
  data: any[];
  /** X轴配置 */
  xAxis?: AxisConfig;
  /** Y轴配置 */
  yAxis?: AxisConfig;
  /** 图例配置 */
  legend?: LegendConfig;
  /** 工具提示配置 */
  tooltip?: TooltipConfig;
  /** 颜色方案 */
  colorScheme?: string[];
  /** 是否响应式 */
  responsive?: boolean;
  /** 动画配置 */
  animation?: AnimationConfig;
}

/** 轴配置 */
export interface AxisConfig {
  /** 轴标题 */
  title?: string;
  /** 是否显示 */
  show?: boolean;
  /** 数据类型 */
  type?: 'category' | 'value' | 'time';
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 格式化函数 */
  formatter?: (value: any) => string;
}

/** 图例配置 */
export interface LegendConfig {
  /** 是否显示 */
  show?: boolean;
  /** 位置 */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end';
}

/** 工具提示配置 */
export interface TooltipConfig {
  /** 是否显示 */
  show?: boolean;
  /** 触发方式 */
  trigger?: 'hover' | 'click' | 'focus';
  /** 自定义内容 */
  formatter?: (params: any) => React.ReactNode;
}

/** 动画配置 */
export interface AnimationConfig {
  /** 是否启用动画 */
  enabled?: boolean;
  /** 动画时长 */
  duration?: number;
  /** 缓动函数 */
  easing?: string;
  /** 延迟时间 */
  delay?: number;
}

// ============================================================================
// 交互组件类型
// ============================================================================

/** 模态框属性 */
export interface ModalProps extends BaseComponentProps {
  /** 是否打开 */
  open: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 模态框标题 */
  title?: React.ReactNode;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 是否可通过遮罩关闭 */
  maskClosable?: boolean;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 自定义页脚 */
  footer?: React.ReactNode;
  /** 层级 */
  zIndex?: number;
}

/** 抽屉属性 */
export interface DrawerProps extends BaseComponentProps {
  /** 是否打开 */
  open: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 抽屉标题 */
  title?: React.ReactNode;
  /** 位置 */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** 宽度/高度 */
  size?: number | string;
  /** 是否可通过遮罩关闭 */
  maskClosable?: boolean;
  /** 自定义页脚 */
  footer?: React.ReactNode;
}

/** 下拉菜单项 */
export interface DropdownMenuItem {
  /** 项目键 */
  key: string;
  /** 显示标签 */
  label: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否危险操作 */
  danger?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 子菜单 */
  children?: DropdownMenuItem[];
}

/** 步骤条步骤 */
export interface StepItem {
  /** 步骤键 */
  key: string;
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 是否禁用 */
  disabled?: boolean;
}

// ============================================================================
// 反馈组件类型
// ============================================================================

/** 消息提示类型 */
export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading';

/** 消息配置 */
export interface MessageConfig {
  /** 消息类型 */
  type: MessageType;
  /** 消息内容 */
  content: React.ReactNode;
  /** 持续时间（毫秒） */
  duration?: number;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 唯一键 */
  key?: string;
}

/** 通知配置 */
export interface NotificationConfig extends MessageConfig {
  /** 通知标题 */
  title?: React.ReactNode;
  /** 描述信息 */
  description?: React.ReactNode;
  /** 位置 */
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /** 图标 */
  icon?: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
}

/** 确认对话框配置 */
export interface ConfirmConfig {
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  content?: React.ReactNode;
  /** 确认按钮文本 */
  okText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确认回调 */
  onOk?: () => void | Promise<void>;
  /** 取消回调 */
  onCancel?: () => void;
  /** 类型 */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
}

// ============================================================================
// 主题和样式类型
// ============================================================================

/** 主题配置 */
export interface ThemeConfig {
  /** 主题名称 */
  name: string;
  /** 主色调 */
  primaryColor: string;
  /** 次要色调 */
  secondaryColor: string;
  /** 成功色 */
  successColor: string;
  /** 警告色 */
  warningColor: string;
  /** 错误色 */
  errorColor: string;
  /** 信息色 */
  infoColor: string;
  /** 背景色 */
  backgroundColor: string;
  /** 表面色 */
  surfaceColor: string;
  /** 文本色 */
  textColor: string;
  /** 次要文本色 */
  textSecondaryColor: string;
  /** 边框色 */
  borderColor: string;
  /** 阴影配置 */
  shadow: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  /** 圆角配置 */
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  /** 间距配置 */
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/** CSS 变量映射 */
export interface CSSVariables {
  [key: string]: string;
}

// ============================================================================
// 工具类型
// ============================================================================

/** 深度可选 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** 深度必需 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/** 提取组件属性 */
export type ExtractProps<T> =
  T extends React.ComponentType<infer P> ? P : never;

/** 组合属性 */
export type MergeProps<T, U> = Omit<T, keyof U> & U;

/** 条件类型 */
export type If<C extends boolean, T, F> = C extends true ? T : F;

/** 数组元素类型 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/** 函数参数类型 */
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;

/** 函数返回类型 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
