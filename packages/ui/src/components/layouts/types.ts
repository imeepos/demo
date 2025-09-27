import * as React from 'react';

/** 布局断点配置 */
export interface LayoutBreakpoints {
  /** 移动端断点 */
  mobile: number;
  /** 平板断点 */
  tablet: number;
  /** 桌面端断点 */
  desktop: number;
  /** 宽屏断点 */
  wide: number;
}

/** 侧边栏状态 */
export interface SidebarState {
  /** 是否收起 */
  collapsed: boolean;
  /** 当前宽度 */
  width: number;
  /** 是否正在调整大小 */
  isResizing: boolean;
  /** 是否移动端 */
  isMobile: boolean;
}

/** 布局配置 */
export interface LayoutConfig {
  /** 侧边栏配置 */
  sidebar: {
    /** 默认宽度 */
    defaultWidth: number;
    /** 最小宽度 */
    minWidth: number;
    /** 最大宽度 */
    maxWidth: number;
    /** 收起时宽度 */
    collapsedWidth: number;
    /** 默认是否收起 */
    defaultCollapsed: boolean;
    /** 是否启用尺寸调整 */
    enableResize: boolean;
    /** 是否显示切换按钮 */
    showToggleButton: boolean;
  };
  /** 断点配置 */
  breakpoints: LayoutBreakpoints;
  /** 动画配置 */
  animations: {
    /** 动画时长 */
    duration: number;
    /** 缓动函数 */
    easing: string;
  };
}

/** 无障碍访问配置 */
export interface AccessibilityConfig {
  /** 启用键盘导航 */
  enableKeyboardNavigation: boolean;
  /** 通知状态变化 */
  announceStateChanges: boolean;
  /** 高对比度模式 */
  highContrastMode: boolean;
  /** 减少动画 */
  reducedMotion: boolean;
}

/** 基础布局属性 */
export interface BaseLayoutProps {
  /** 子元素 */
  children: React.ReactNode;
  /** 自定义样式 */
  className?: string;
  /** 元素 ID */
  id?: string;
  /** 角色 */
  role?: string;
  /** 无障碍标签 */
  'aria-label'?: string;
  /** 标签关联 ID */
  'aria-labelledby'?: string;
  /** 描述关联 ID */
  'aria-describedby'?: string;
}

/** 侧边栏属性 */
export interface SidebarProps extends BaseLayoutProps {
  /** 是否收起 */
  collapsed?: boolean;
  /** 宽度 */
  width?: number;
  /** 位置 */
  position?: 'left' | 'right';
  /** 变体样式 */
  variant?: 'default' | 'floating' | 'minimal';
  /** 切换回调 */
  onToggle?: (collapsed: boolean) => void;
  /** 尺寸变化回调 */
  onResize?: (width: number) => void;
}

/** 头部属性 */
export interface HeaderProps extends BaseLayoutProps {
  /** 高度 */
  height?: number;
  /** 是否固定 */
  sticky?: boolean;
  /** 变体样式 */
  variant?: 'default' | 'minimal' | 'elevated';
  /** 是否显示侧边栏切换按钮 */
  showSidebarToggle?: boolean;
  /** 侧边栏是否收起 */
  sidebarCollapsed?: boolean;
  /** 侧边栏切换回调 */
  onSidebarToggle?: () => void;
}

/** 主内容区属性 */
export interface MainContentProps extends BaseLayoutProps {
  /** 内边距 */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** 是否可滚动 */
  scrollable?: boolean;
  /** 变体样式 */
  variant?: 'default' | 'full-width' | 'contained';
}

/** 响应式配置 */
export interface ResponsiveConfig {
  /** 断点 */
  breakpoint: keyof LayoutBreakpoints;
  /** 侧边栏配置 */
  sidebar?: Partial<SidebarProps>;
  /** 头部配置 */
  header?: Partial<HeaderProps>;
  /** 内容区配置 */
  content?: Partial<MainContentProps>;
}

/** 布局变体 */
export type LayoutVariant =
  | 'dashboard'
  | 'split'
  | 'sidebar-only'
  | 'content-only';

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'system';

/** 布局上下文值 */
export interface LayoutContextValue {
  /** 配置 */
  config: LayoutConfig;
  /** 侧边栏状态 */
  sidebarState: SidebarState;
  /** 主题模式 */
  themeMode: ThemeMode;
  /** 无障碍访问配置 */
  accessibility: AccessibilityConfig;
  /** 更新侧边栏 */
  updateSidebar: (updates: Partial<SidebarState>) => void;
  /** 更新配置 */
  updateConfig: (updates: Partial<LayoutConfig>) => void;
  /** 更新主题 */
  updateTheme: (mode: ThemeMode) => void;
  /** 更新无障碍配置 */
  updateAccessibility: (updates: Partial<AccessibilityConfig>) => void;
}

/** 布局提供者属性 */
export interface LayoutProviderProps {
  /** 子元素 */
  children: React.ReactNode;
  /** 初始配置 */
  initialConfig?: Partial<LayoutConfig>;
  /** 初始主题 */
  initialTheme?: ThemeMode;
  /** 初始无障碍配置 */
  initialAccessibility?: Partial<AccessibilityConfig>;
}

/** useLayout 返回值 */
export interface UseLayoutReturn {
  /** 侧边栏状态 */
  sidebarState: SidebarState;
  /** 配置 */
  config: LayoutConfig;
  /** 操作方法 */
  actions: {
    /** 切换侧边栏 */
    toggleSidebar: () => void;
    /** 设置侧边栏宽度 */
    setSidebarWidth: (width: number) => void;
    /** 设置侧边栏收起状态 */
    setSidebarCollapsed: (collapsed: boolean) => void;
    /** 重置布局 */
    resetLayout: () => void;
  };
  /** 响应式相关 */
  responsive: {
    /** 是否移动端 */
    isMobile: boolean;
    /** 是否平板 */
    isTablet: boolean;
    /** 是否桌面端 */
    isDesktop: boolean;
    /** 是否宽屏 */
    isWide: boolean;
    /** 当前断点 */
    currentBreakpoint: keyof LayoutBreakpoints;
  };
  /** 无障碍访问 */
  accessibility: {
    /** 通知变化 */
    announceChange: (message: string) => void;
    /** 启用焦点管理 */
    enableFocusManagement: () => void;
    /** 获取 ARIA 属性 */
    getAriaAttributes: () => Record<string, string>;
  };
}

/** 仪表板布局属性 */
export interface DashboardLayoutProps extends BaseLayoutProps {
  /** 侧边栏内容 */
  sidebar?: React.ReactNode;
  /** 头部内容 */
  header?: React.ReactNode;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 布局变体 */
  variant?: LayoutVariant;
  /** 配置 */
  config?: Partial<LayoutConfig>;
  /** 响应式配置 */
  responsive?: ResponsiveConfig[];
  /** 布局变化回调 */
  onLayoutChange?: (layout: LayoutVariant) => void;
  /** 侧边栏切换回调 */
  onSidebarToggle?: (collapsed: boolean) => void;
  /** 侧边栏尺寸变化回调 */
  onSidebarResize?: (width: number) => void;
}

/** 复合组件属性 */
export interface CompoundComponentProps {
  /** 侧边栏组件 */
  Sidebar: React.ComponentType<SidebarProps>;
  /** 头部组件 */
  Header: React.ComponentType<HeaderProps>;
  /** 内容区组件 */
  Content: React.ComponentType<MainContentProps>;
  /** 底部组件 */
  Footer: React.ComponentType<BaseLayoutProps>;
}

/** 布局组件类型 */
export type LayoutComponent<T = {}> = React.ForwardRefExoticComponent<
  T & React.RefAttributes<HTMLDivElement>
> &
  CompoundComponentProps;

/** 动画配置 */
export interface AnimationConfig {
  /** 动画时长 */
  duration: number;
  /** 缓动函数 */
  easing: string;
  /** 是否禁用动画 */
  disabled: boolean;
}

/** 布局指标 */
export interface LayoutMetrics {
  /** 侧边栏宽度 */
  sidebarWidth: number;
  /** 内容区宽度 */
  contentWidth: number;
  /** 总宽度 */
  totalWidth: number;
  /** 视口高度 */
  viewportHeight: number;
  /** 滚动位置 */
  scrollPosition: number;
}

/** 性能配置 */
export interface PerformanceConfig {
  /** 启用虚拟化 */
  enableVirtualization: boolean;
  /** 懒加载组件 */
  lazyLoadComponents: boolean;
  /** 记忆化子组件 */
  memoizeChildren: boolean;
  /** 调整大小节流时间 */
  throttleResize: number;
  /** 滚动防抖时间 */
  debounceScroll: number;
}

/** 布局事件处理器 */
export interface LayoutEventHandlers {
  /** 挂载回调 */
  onMount?: () => void;
  /** 卸载回调 */
  onUnmount?: () => void;
  /** 尺寸变化回调 */
  onResize?: (metrics: LayoutMetrics) => void;
  /** 滚动回调 */
  onScroll?: (position: number) => void;
  /** 断点变化回调 */
  onBreakpointChange?: (breakpoint: keyof LayoutBreakpoints) => void;
  /** 侧边栏状态变化回调 */
  onSidebarStateChange?: (state: SidebarState) => void;
  /** 主题变化回调 */
  onThemeChange?: (theme: ThemeMode) => void;
  /** 无障碍配置变化回调 */
  onAccessibilityChange?: (config: AccessibilityConfig) => void;
}
