import { Outlet } from '@tanstack/react-router';

/**
 * 根布局组件
 * 职责：提供全站统一的布局结构
 */
export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="py-0 px-0">
        <Outlet />
      </main>
    </div>
  );
}
