import { cn } from '@sker/ui';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * 专业管理后台布局组件
 * 职责：提供统一的后台管理界面布局结构
 */
export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* 侧边导航栏 */}
      <Sidebar />

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <TopBar />

        {/* 页面内容 */}
        <main
          className={cn(
            'flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/20',
            'p-4 md:p-6 lg:p-8 space-y-6',
            className
          )}
        >
          <div className="max-w-screen-2xl mx-auto">{children}</div>
        </main>

        {/* 底部状态栏 */}
        <div className="h-6 bg-muted/50 border-t border-border flex items-center justify-between px-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© 2025 舆情监控系统 v2.1.0</span>
            <span className="hidden md:inline">
              最后更新: {new Date().toLocaleString('zh-CN')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">数据源连接正常</span>
            <span>响应时间: 156ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
