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

/** 报告生成器和监测中心相关类型 */

/** 报告内容区块类型 */
export type ReportSectionType =
  | 'overview'
  | 'chart'
  | 'table'
  | 'text'
  | 'timeline';

/** 导出格式类型 */
export type ExportFormat = 'pdf' | 'docx' | 'html' | 'excel' | 'pptx';

/** 预览模式 */
export type PreviewMode = 'desktop' | 'mobile' | 'print';

/** 报告主题 */
export type ReportTheme = 'light' | 'dark' | 'minimal';

/** 报告区块配置 */
export interface ReportSection {
  /** 区块ID */
  id: string;
  /** 区块类型 */
  type: ReportSectionType;
  /** 区块标题 */
  title: string;
  /** 是否启用 */
  enabled: boolean;
  /** 区块配置 */
  config: Record<string, any>;
}

/** 报告样式配置 */
export interface ReportStyle {
  /** 主题 */
  theme: ReportTheme;
  /** 主色调 */
  primaryColor: string;
  /** 字体 */
  fontFamily: string;
  /** 标志URL */
  logoUrl?: string;
  /** 是否显示页眉页脚 */
  headerFooter: boolean;
}

/** 报告配置 */
export interface ReportConfig {
  /** 报告标题 */
  title: string;
  /** 报告描述 */
  description?: string;
  /** 时间范围 */
  dateRange: {
    start: Date;
    end: Date;
  };
  /** 数据源 */
  dataSources: string[];
  /** 报告区块 */
  sections: ReportSection[];
  /** 样式配置 */
  style: ReportStyle;
  /** 导出格式 */
  format: ExportFormat;
}

/** 报告模板 */
export interface ReportTemplate {
  /** 模板ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板描述 */
  description?: string;
  /** 报告配置 */
  config: ReportConfig;
  /** 缩略图 */
  thumbnail?: string;
  /** 是否默认模板 */
  isDefault?: boolean;
}

/** 报告生成器布局属性 */
export interface ReportGeneratorLayoutProps extends BaseLayoutProps {
  /** 默认配置 */
  defaultConfig?: ReportConfig;
  /** 模板列表 */
  templates?: ReportTemplate[];
  /** 配置变更回调 */
  onConfigChange?: (config: ReportConfig) => void;
  /** 报告生成回调 */
  onGenerate?: (config: ReportConfig, format: ExportFormat) => Promise<void>;
  /** 保存模板回调 */
  onSaveTemplate?: (template: ReportTemplate) => void;
  /** 是否正在生成 */
  isGenerating?: boolean;
  /** 生成进度 */
  generationProgress?: number;
}

/** 报告预览组件属性 */
export interface ReportPreviewProps {
  /** 报告配置 */
  config: ReportConfig;
  /** 预览模式 */
  mode: PreviewMode;
  /** 自定义样式 */
  className?: string;
}

/** 监测中心布局相关类型 */

/** 预警等级 */
export type AlertLevel = 'critical' | 'high' | 'medium' | 'low';

/** 预警状态 */
export type AlertStatus = 'new' | 'processing' | 'resolved';

/** 预警操作 */
export interface AlertAction {
  /** 操作ID */
  id: string;
  /** 操作标签 */
  label: string;
  /** 按钮变体 */
  variant?: 'default' | 'destructive' | 'outline';
  /** 点击回调 */
  onClick: () => void;
}

/** 预警项 */
export interface AlertItem {
  /** 预警ID */
  id: string;
  /** 预警等级 */
  level: AlertLevel;
  /** 预警标题 */
  title: string;
  /** 预警描述 */
  description: string;
  /** 数据源 */
  source: string;
  /** 时间戳 */
  timestamp: Date;
  /** 预警状态 */
  status: AlertStatus;
  /** 可执行操作 */
  actions?: AlertAction[];
}

/** 监测标签页 */
export interface MonitoringTab {
  /** 标签页ID */
  id: string;
  /** 标签页名称 */
  label: string;
  /** 标签页内容 */
  content: React.ReactNode;
  /** 徽章数字 */
  badge?: number;
  /** 是否紧急 */
  urgent?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/** 监测中心布局属性 */
export interface MonitoringCenterLayoutProps extends BaseLayoutProps {
  /** 监测标签页列表 */
  tabs?: MonitoringTab[];
  /** 预警信息列表 */
  alerts?: AlertItem[];
  /** 默认激活的标签页 */
  defaultTab?: string;
  /** 标签页切换回调 */
  onTabChange?: (tabId: string) => void;
  /** 预警操作回调 */
  onAlertAction?: (alertId: string, action: string) => void;
  /** 是否启用全屏功能 */
  enableFullscreen?: boolean;
  /** 是否自动刷新 */
  autoRefresh?: boolean;
  /** 刷新间隔（毫秒） */
  refreshInterval?: number;
  /** 数据刷新回调 */
  onRefresh?: () => void;
}

/** 趋势分析图表相关类型 */

/** 图表类型 */
export type ChartType = 'line' | 'area' | 'bar' | 'heatmap' | 'scatter';

/** 时间范围类型 */
export type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d' | '90d' | 'custom';

/** 导出格式类型 */
export type ChartExportFormat = 'png' | 'svg' | 'pdf' | 'csv' | 'excel';

/** 趋势数据 */
export interface TrendData {
  /** 时间戳 */
  timestamp: Date;
  /** 数据值映射 */
  values: Record<string, number>;
  /** 元数据 */
  metadata?: {
    /** 事件标记 */
    events?: EventMarker[];
    /** 异常点 */
    anomalies?: AnomalyPoint[];
  };
}

/** 事件标记 */
export interface EventMarker {
  /** 事件ID */
  id: string;
  /** 时间戳 */
  timestamp: Date;
  /** 标题 */
  title: string;
  /** 描述 */
  description?: string;
  /** 事件类型 */
  type: 'positive' | 'negative' | 'neutral' | 'crisis';
  /** 影响程度 */
  impact: 'high' | 'medium' | 'low';
}

/** 异常点 */
export interface AnomalyPoint {
  /** 时间戳 */
  timestamp: Date;
  /** 实际值 */
  value: number;
  /** 期望值 */
  expectedValue: number;
  /** 偏差 */
  deviation: number;
  /** 严重程度 */
  severity: 'high' | 'medium' | 'low';
}

/** 数据源配置 */
export interface DataSource {
  /** 数据源ID */
  id: string;
  /** 数据源名称 */
  name: string;
  /** 颜色 */
  color: string;
  /** 是否启用 */
  enabled: boolean;
  /** 数据源类型 */
  type: 'sentiment' | 'volume' | 'engagement' | 'reach';
}

/** 趋势分析图表属性 */
export interface TrendAnalysisChartProps extends BaseLayoutProps {
  /** 趋势数据 */
  data?: TrendData[];
  /** 图表类型 */
  chartType?: ChartType;
  /** 时间范围 */
  timeRange?: TimeRange;
  /** 数据源配置 */
  dataSources?: DataSource[];
  /** 是否加载中 */
  isLoading?: boolean;
  /** 图表类型变化回调 */
  onChartTypeChange?: (type: ChartType) => void;
  /** 时间范围变化回调 */
  onTimeRangeChange?: (range: TimeRange) => void;
  /** 数据源变化回调 */
  onDataSourceChange?: (sources: string[]) => void;
  /** 导出回调 */
  onExport?: (format: ChartExportFormat) => void;
  /** 是否显示预测 */
  showPrediction?: boolean;
  /** 是否显示异常检测 */
  showAnomalies?: boolean;
  /** 图表高度 */
  height?: number;
}
