import {
  BarChart3,
  Map,
  TrendingUp,
  Zap,
  Settings,
  FileText,
  Palette,
  Search,
  Activity,
  Tag,
  type LucideIcon,
} from 'lucide-react';

/**
 * 统一路由配置管理系统
 *
 * 设计理念：
 * - 类型安全的路由配置
 * - 层次化分组管理
 * - 主题色彩系统集成
 * - 权限控制支持
 *
 * @author SKER Team
 * @version 2.0.0
 */

// ==================== 类型定义 ====================

/** 路由分组类型 */
export type RouteGroup = 'dashboard' | 'analysis' | 'management' | 'system';

/** 主题色彩类型 */
export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent';

/** 路由配置接口 */
export interface RouteConfig {
  /** 路由路径 */
  readonly path: string;
  /** 页面标题 */
  readonly title: string;
  /** 页面描述 */
  readonly description: string;
  /** 图标组件 */
  readonly icon: LucideIcon;
  /** 分组 */
  readonly group: RouteGroup;
  /** 颜色主题 */
  readonly theme: ThemeColor;
  /** 在导航中显示 */
  readonly showInNav: boolean;
  /** 需要管理员权限 */
  readonly requireAdmin?: boolean;
  /** 排序权重 */
  readonly order?: number;
  /** 关键词标签 */
  readonly tags?: readonly string[];
}

/** 分组配置接口 */
export interface GroupConfig {
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly color: ThemeColor;
  readonly order: number;
}

// ==================== 配置数据 ====================

/** 路由分组配置 */
export const ROUTE_GROUPS: Record<RouteGroup, GroupConfig> = {
  dashboard: {
    title: '仪表板',
    description: '数据展示与实时监控',
    icon: BarChart3,
    color: 'primary',
    order: 1,
  },
  analysis: {
    title: '数据分析',
    description: '深度分析与洞察工具',
    icon: Search,
    color: 'accent',
    order: 2,
  },
  management: {
    title: '事件管理',
    description: '舆情事件处理与管控',
    icon: FileText,
    color: 'success',
    order: 3,
  },
  system: {
    title: '系统工具',
    description: '系统配置与维护工具',
    icon: Settings,
    color: 'secondary',
    order: 4,
  },
} as const;

/** 全局路由配置表 */
export const ROUTES_CONFIG: readonly RouteConfig[] = [
  // ==================== 仪表板类 ====================
  {
    path: '/dashboard-view',
    title: '舆情分析大屏',
    description: '实时数据可视化界面，全方位监控舆情动态',
    icon: BarChart3,
    group: 'dashboard',
    theme: 'primary',
    showInNav: true,
    order: 1,
    tags: ['实时监控', '数据可视化', '舆情分析'],
  },
  {
    path: '/dashboard',
    title: '地图监控视图',
    description: '地理位置可视化，区域舆情态势感知',
    icon: Map,
    group: 'dashboard',
    theme: 'secondary',
    showInNav: true,
    order: 2,
    tags: ['地图可视化', '区域监控', '态势感知'],
  },
  {
    path: '/enhanced-dashboard',
    title: '增强仪表板',
    description: '多维度交互式数据分析面板',
    icon: TrendingUp,
    group: 'dashboard',
    theme: 'primary',
    showInNav: true,
    order: 3,
    tags: ['交互分析', '多维数据', '深度洞察'],
  },
  {
    path: '/admin-dashboard',
    title: '管理员控制台',
    description: '系统管理中心，运维监控与配置',
    icon: Zap,
    group: 'dashboard',
    theme: 'danger',
    showInNav: true,
    requireAdmin: true,
    order: 4,
    tags: ['系统管理', '运维监控', '配置中心'],
  },

  // ==================== 数据分析类 ====================
  {
    path: '/data-visualization',
    title: '数据可视化工具',
    description: '专业图表分析，多种可视化组件',
    icon: Activity,
    group: 'analysis',
    theme: 'accent',
    showInNav: true,
    order: 1,
    tags: ['数据图表', '可视化组件', '专业分析'],
  },
  {
    path: '/sentiment-intensity',
    title: '情感强度分析',
    description: '情感分析参数配置与强度评估',
    icon: Settings,
    group: 'analysis',
    theme: 'warning',
    showInNav: true,
    order: 2,
    tags: ['情感分析', '参数配置', '强度评估'],
  },

  // ==================== 事件管理类 ====================
  {
    path: '/sentiment-event',
    title: '舆情事件中心',
    description: '舆情事件全生命周期管理',
    icon: FileText,
    group: 'management',
    theme: 'success',
    showInNav: true,
    order: 1,
    tags: ['事件管理', '生命周期', '舆情处置'],
  },
  {
    path: '/event-type',
    title: '事件类型管理',
    description: '舆情事件分类体系，自定义颜色和排序',
    icon: Tag,
    group: 'management',
    theme: 'accent',
    showInNav: true,
    order: 2,
    tags: ['事件类型', '分类管理', '颜色标识'],
  },
  {
    path: '/media-type',
    title: '媒体类型管理',
    description: '媒体类型配置与分类管理',
    icon: Settings,
    group: 'management',
    theme: 'warning',
    showInNav: true,
    order: 3,
    tags: ['媒体类型', '配置管理', '分类设置'],
  },

  // ==================== 系统工具类 ====================
  {
    path: '/color-test',
    title: '设计系统预览',
    description: '完整的配色方案与组件系统展示',
    icon: Palette,
    group: 'system',
    theme: 'accent',
    showInNav: true,
    order: 1,
    tags: ['设计系统', '配色方案', '组件展示'],
  },
  {
    path: '/layout-basic-demo',
    title: '布局组件-基础示例',
    description: 'SentimentDashboardLayout 基础功能展示',
    icon: BarChart3,
    group: 'system',
    theme: 'primary',
    showInNav: true,
    order: 2,
    tags: ['布局组件', '基础示例', '组件库'],
  },
  {
    path: '/layout-minimal-demo',
    title: '布局组件-极简示例',
    description: 'SentimentDashboardLayout 极简风格展示',
    icon: Palette,
    group: 'system',
    theme: 'accent',
    showInNav: true,
    order: 3,
    tags: ['布局组件', '极简风格', '组件库'],
  },
] as const;

// ==================== 工具函数 ====================

/** 按分组获取路由配置 */
export function getRoutesByGroup(group: RouteGroup): RouteConfig[] {
  return ROUTES_CONFIG.filter(
    route => route.group === group && route.showInNav
  ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** 根据路径获取路由配置 */
export function getRouteConfig(path: string): RouteConfig | undefined {
  return ROUTES_CONFIG.find(route => route.path === path);
}

/** 获取导航路由（按分组和顺序排序） */
export function getNavRoutes(): RouteConfig[] {
  const groups = Object.keys(ROUTE_GROUPS) as RouteGroup[];

  return groups
    .sort((a, b) => ROUTE_GROUPS[a].order - ROUTE_GROUPS[b].order)
    .flatMap(group => getRoutesByGroup(group));
}

/** 获取管理员路由 */
export function getAdminRoutes(): RouteConfig[] {
  return ROUTES_CONFIG.filter(route => route.requireAdmin && route.showInNav);
}

/** 按标签搜索路由 */
export function searchRoutesByTag(tag: string): RouteConfig[] {
  return ROUTES_CONFIG.filter(
    route =>
      route.tags?.some(t => t.includes(tag)) ||
      route.title.includes(tag) ||
      route.description.includes(tag)
  );
}

/** 获取分组统计信息 */
export function getGroupStats(): Record<RouteGroup, number> {
  const stats = {} as Record<RouteGroup, number>;

  for (const group of Object.keys(ROUTE_GROUPS) as RouteGroup[]) {
    stats[group] = getRoutesByGroup(group).length;
  }

  return stats;
}

/** 验证路由配置完整性 */
export function validateRouteConfig(): boolean {
  const paths = new Set<string>();

  for (const route of ROUTES_CONFIG) {
    if (paths.has(route.path)) {
      console.error(`Duplicate route path: ${route.path}`);
      return false;
    }
    paths.add(route.path);

    if (!ROUTE_GROUPS[route.group]) {
      console.error(`Invalid group for route: ${route.path}`);
      return false;
    }
  }

  return true;
}

// 开发时验证配置
if (process.env.NODE_ENV === 'development') {
  validateRouteConfig();
}
