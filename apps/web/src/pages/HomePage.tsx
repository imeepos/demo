import { Link } from '@tanstack/react-router';
import {
  BarChart3,
  MapPin,
  Settings,
  FileText,
  Palette,
  LucideIcon,
} from 'lucide-react';
import { DataPreviewSection } from '../components/home/DataPreviewSection';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { SystemStatusSection } from '../components/home/SystemStatusSection';
import { WelcomeSection } from '../components/home/WelcomeSection';

// ==================== 导航配置系统 ====================

type NavigationTheme =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'accent';

interface NavigationItem {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  readonly theme: NavigationTheme;
  readonly cta: string;
}

const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    path: '/dashboard-view',
    title: '舆情分析大屏',
    description: '完整的数据可视化界面，实时监控和分析',
    icon: BarChart3,
    theme: 'primary',
    cta: '立即进入',
  },
  {
    path: '/dashboard',
    title: '地图监控视图',
    description: '地理位置结合数据分析，区域舆情监控',
    icon: MapPin,
    theme: 'secondary',
    cta: '查看地图',
  },
  {
    path: '/sentiment-intensity',
    title: '情感强度管理',
    description: '配置和管理情感分析参数设置',
    icon: Settings,
    theme: 'warning',
    cta: '进入设置',
  },
  {
    path: '/sentiment-event',
    title: '舆情事件管理',
    description: '管理舆情事件数据，创建、编辑和分析',
    icon: FileText,
    theme: 'success',
    cta: '事件管理',
  },
  {
    path: '/color-test',
    title: '配色系统测试',
    description: '查看亮色科技蓝配色方案的完整展示',
    icon: Palette,
    theme: 'accent',
    cta: '配色预览',
  },
] as const;

const THEME_STYLES: Record<
  NavigationTheme,
  {
    background: string;
    text: string;
    iconBg: string;
  }
> = {
  primary: {
    background: 'bg-primary text-primary-foreground',
    text: 'text-primary-foreground/80',
    iconBg: 'bg-white/20',
  },
  secondary: {
    background: 'bg-secondary text-secondary-foreground',
    text: 'text-secondary-foreground/80',
    iconBg: 'bg-white/20',
  },
  warning: {
    background: 'bg-warning text-warning-foreground',
    text: 'text-warning-foreground/80',
    iconBg: 'bg-white/20',
  },
  success: {
    background: 'bg-success text-success-foreground',
    text: 'text-success-foreground/80',
    iconBg: 'bg-white/20',
  },
  accent: {
    background: 'bg-accent text-white',
    text: 'text-white/80',
    iconBg: 'bg-white/20',
  },
} as const;

/**
 * 现代化舆情监控系统首页
 *
 * 设计理念：
 * - 专业图标系统替代emoji
 * - 统一的视觉设计语言
 * - 清晰的信息层次
 * - 流畅的用户体验
 *
 * @author SKER Team
 * @version 2.0.0
 */
export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6 space-y-4 md:space-y-6 lg:space-y-8">
        {/* 欢迎区域 */}
        <WelcomeSection />

        {/* 实时数据预览 */}
        <DataPreviewSection />

        {/* 核心功能特性 */}
        <FeaturesGrid />

        {/* 系统状态监控 */}
        <SystemStatusSection />

        {/* 主要功能入口 */}
        <div className="text-center space-y-4 md:space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-4">
              开始使用
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              选择合适的视图，开始您的舆情监控之旅
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
            {NAVIGATION_ITEMS.map(item => {
              const Icon = item.icon;
              const themeStyles = THEME_STYLES[item.theme];

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative overflow-hidden ${themeStyles.background} rounded-2xl p-4 md:p-6 lg:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative space-y-3">
                    <div
                      className={`flex items-center justify-center w-12 h-12 ${themeStyles.iconBg} rounded-lg`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className={themeStyles.text}>{item.description}</p>
                    <div className="flex items-center justify-center text-sm font-medium">
                      {item.cta} →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
