import { Link } from '@tanstack/react-router';
import { Globe, Search, Bell, Settings, User } from 'lucide-react';
import { Button } from '@sker/ui';
import { cn } from '@sker/ui';

interface TopNavigationProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
  variant?: 'default' | 'glass' | 'floating';
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
}

/**
 * 现代化顶部导航组件
 * 职责：提供主导航菜单，支持响应式设计和多种美观样式
 */
export function TopNavigation({
  onMenuToggle,
  showMobileMenu,
  variant = 'default',
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
}: TopNavigationProps) {
  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        variant === 'glass' &&
          'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg',
        variant === 'floating' &&
          'bg-card/95 backdrop-blur-sm border-b border-border/50 shadow-xl',
        variant === 'default' && 'bg-card border-b border-border shadow-sm'
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo区域 */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={cn(
                'flex items-center space-x-3 group transition-all duration-300',
                'text-primary hover:text-primary/80 hover:scale-105'
              )}
            >
              <div className="relative">
                <Globe className="h-8 w-8 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  舆情监控系统
                </span>
                <div className="text-xs text-muted-foreground font-medium">
                  专业版 v2.0
                </div>
              </div>
            </Link>
          </div>

          {/* 中间功能区域 */}
          <div className="flex items-center space-x-4">
            {/* 搜索框 */}
            {showSearch && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索关键词..."
                  className={cn(
                    'pl-10 pr-4 py-2 bg-muted/50 border border-muted rounded-lg',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    'transition-all duration-200 w-64 hover:bg-muted/70'
                  )}
                />
              </div>
            )}

            {/* 快捷操作 */}
            <div className="flex items-center space-x-2">
              {/* 通知按钮 */}
              {showNotifications && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-primary/10"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </span>
                </Button>
              )}

              {/* 设置按钮 */}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <Settings className="h-5 w-5" />
              </Button>

              {/* 用户菜单 */}
              {showUserMenu && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* 实时状态指示器 */}
          <div className="hidden xl:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">系统正常</span>
            </div>
            <div className="text-xs text-muted-foreground">
              最后更新: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* 装饰性渐变条 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </nav>
  );
}
