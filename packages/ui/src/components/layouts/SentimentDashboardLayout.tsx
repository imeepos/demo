'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLayout } from './hooks/useLayout';

interface SentimentDashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
  enableResize?: boolean;
  minSidebarWidth?: number;
  maxSidebarWidth?: number;
  onSidebarToggle?: (collapsed: boolean) => void;
  id?: string;
  role?: string;
  'aria-label'?: string;
}

const SidebarToggleButton = React.memo(
  ({
    collapsed,
    onToggle,
    className,
    ariaAttributes,
  }: {
    collapsed: boolean;
    onToggle: () => void;
    className?: string;
    ariaAttributes?: Record<string, string>;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn(
        'h-8 w-8 p-0 transition-all duration-200',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'focus:outline-none focus-visible:ring-offset-background',
        className
      )}
      aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}
      {...ariaAttributes}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      ) : (
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  ),
  (prevProps, nextProps) =>
    prevProps.collapsed === nextProps.collapsed &&
    prevProps.className === nextProps.className
);
SidebarToggleButton.displayName = 'SidebarToggleButton';

const DashboardHeader = React.memo(
  ({
    children,
    showToggleButton,
    collapsed,
    onToggle,
    isMobile,
  }: {
    children?: React.ReactNode;
    showToggleButton?: boolean;
    collapsed?: boolean;
    onToggle?: () => void;
    isMobile?: boolean;
  }) => {
    if (!children && !showToggleButton) return null;

    return (
      <Card className="rounded-none border-x-0 border-t-0 border-b border-border/30">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {showToggleButton && !isMobile && onToggle && (
              <SidebarToggleButton
                collapsed={collapsed || false}
                onToggle={onToggle}
              />
            )}
            {children}
          </div>
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.showToggleButton === nextProps.showToggleButton &&
    prevProps.collapsed === nextProps.collapsed &&
    prevProps.onToggle === nextProps.onToggle &&
    prevProps.isMobile === nextProps.isMobile
);
DashboardHeader.displayName = 'DashboardHeader';

const DesktopSidebar = React.memo(
  ({
    children,
    collapsed,
    width,
    collapsedWidth,
    enableResize,
    minWidth,
    maxWidth,
  }: {
    children: React.ReactNode;
    collapsed: boolean;
    width: number;
    collapsedWidth: number;
    enableResize: boolean;
    minWidth: number;
    maxWidth: number;
  }) => {
    if (!enableResize) {
      return (
        <aside
          className={cn(
            'flex-shrink-0 border-r border-border/20 bg-card transition-all duration-300 ease-in-out',
            'flex flex-col overflow-hidden'
          )}
          style={{ width: collapsed ? collapsedWidth : width }}
          aria-hidden={collapsed}
        >
          <ScrollArea className="flex-1">
            <div
              className={cn(
                'transition-all duration-300 ease-in-out',
                collapsed && 'opacity-90'
              )}
            >
              {React.isValidElement(children)
                ? React.cloneElement(children, {
                    collapsed,
                    ...(children.props && typeof children.props === 'object'
                      ? children.props
                      : {}),
                  } as any)
                : children}
            </div>
          </ScrollArea>
        </aside>
      );
    }

    return (
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel
          defaultSize={(collapsed ? collapsedWidth : width) / 16}
          minSize={collapsed ? collapsedWidth / 16 : minWidth / 16}
          maxSize={collapsed ? collapsedWidth / 16 : maxWidth / 16}
          className="border-r border-border/20 bg-card"
        >
          <ScrollArea className="h-full">
            <div
              className={cn(
                'transition-all duration-300 ease-in-out',
                collapsed && 'opacity-90'
              )}
            >
              {React.isValidElement(children)
                ? React.cloneElement(children, {
                    collapsed,
                    ...(children.props && typeof children.props === 'object'
                      ? children.props
                      : {}),
                  } as any)
                : children}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={1 - (collapsed ? collapsedWidth : width) / 16}
        >
          <div className="h-full" />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
  (prevProps, nextProps) =>
    prevProps.collapsed === nextProps.collapsed &&
    prevProps.width === nextProps.width &&
    prevProps.enableResize === nextProps.enableResize &&
    prevProps.minWidth === nextProps.minWidth &&
    prevProps.maxWidth === nextProps.maxWidth &&
    prevProps.children === nextProps.children
);
DesktopSidebar.displayName = 'DesktopSidebar';

const MobileSidebar = React.memo(
  ({
    children,
    isOpen,
    onOpenChange,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
  }) => (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 md:hidden"
          aria-label="打开菜单"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <ScrollArea className="h-full">{children}</ScrollArea>
      </SheetContent>
    </Sheet>
  ),
  (prevProps, nextProps) =>
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.onOpenChange === nextProps.onOpenChange &&
    prevProps.children === nextProps.children
);
MobileSidebar.displayName = 'MobileSidebar';

const SentimentDashboardLayout = React.forwardRef<
  HTMLDivElement,
  SentimentDashboardLayoutProps
>(
  (
    {
      children,
      sidebar,
      header,
      className,
      defaultCollapsed = false,
      enableResize = true,
      minSidebarWidth = 240,
      maxSidebarWidth = 400,
      onSidebarToggle,
      id = 'dashboard-layout',
      role = 'main',
      'aria-label': ariaLabel = '仪表板布局',
      ...props
    },
    ref
  ) => {
    const layout = useLayout(
      {
        sidebar: {
          defaultWidth: 280,
          minWidth: minSidebarWidth,
          maxWidth: maxSidebarWidth,
          collapsedWidth: 64,
          defaultCollapsed,
        },
      },
      onSidebarToggle
    );

    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect(() => {
      if (layout.responsive.isMobile) {
        setMobileOpen(false);
      }
    }, [layout.responsive.isMobile]);

    React.useEffect(() => {
      layout.accessibility.announceChange(
        layout.sidebarState.collapsed ? '侧边栏已收起' : '侧边栏已展开'
      );
    }, [layout.sidebarState.collapsed, layout.accessibility]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === 'Escape' && mobileOpen) {
          setMobileOpen(false);
        }
        if (event.ctrlKey && event.key === 'b') {
          event.preventDefault();
          layout.actions.toggleSidebar();
        }
      },
      [mobileOpen, layout.actions.toggleSidebar]
    );

    const renderMainContent = React.useMemo(
      () => (
        <main
          className="flex-1 overflow-hidden"
          role="main"
          aria-label="主要内容区域"
          tabIndex={-1}
        >
          <ScrollArea className="h-full">
            <div className="p-6" role="region" aria-label="内容区域">
              {children}
            </div>
          </ScrollArea>
        </main>
      ),
      [children]
    );

    const ariaAttributes = React.useMemo(
      () => layout.accessibility.getAriaAttributes(),
      [layout.accessibility]
    );

    if (layout.responsive.isMobile && sidebar) {
      return (
        <div
          ref={ref}
          id={id}
          role={role}
          aria-label={ariaLabel}
          className={cn('flex h-screen flex-col bg-background', className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <DashboardHeader isMobile>
            <MobileSidebar isOpen={mobileOpen} onOpenChange={setMobileOpen}>
              <nav role="navigation" aria-label="主导航" {...ariaAttributes}>
                {React.isValidElement(sidebar)
                  ? React.cloneElement(sidebar, {
                      collapsed: false, // 移动端始终展开状态
                      ...(sidebar.props && typeof sidebar.props === 'object'
                        ? sidebar.props
                        : {}),
                    } as any)
                  : sidebar}
              </nav>
            </MobileSidebar>
            {header}
          </DashboardHeader>
          {renderMainContent}
        </div>
      );
    }

    if (!sidebar) {
      return (
        <div
          ref={ref}
          className={cn('flex h-screen flex-col bg-background', className)}
          {...props}
        >
          {header && <DashboardHeader>{header}</DashboardHeader>}
          {renderMainContent}
        </div>
      );
    }

    if (!enableResize) {
      return (
        <div
          ref={ref}
          className={cn('flex h-screen flex-col bg-background', className)}
          {...props}
        >
          {header && (
            <DashboardHeader
              showToggleButton={true}
              collapsed={layout.sidebarState.collapsed}
              onToggle={layout.actions.toggleSidebar}
            >
              {header}
            </DashboardHeader>
          )}
          <div className="flex flex-1 overflow-hidden">
            <DesktopSidebar
              collapsed={layout.sidebarState.collapsed}
              width={layout.sidebarState.width}
              collapsedWidth={64}
              enableResize={false}
              minWidth={minSidebarWidth}
              maxWidth={maxSidebarWidth}
            >
              {sidebar}
            </DesktopSidebar>
            {renderMainContent}
          </div>
        </div>
      );
    }

    /** 可调整大小布局 */
    return (
      <div
        ref={ref}
        className={cn('flex h-screen flex-col bg-background', className)}
        {...props}
      >
        {header && (
          <DashboardHeader
            showToggleButton={true}
            collapsed={layout.sidebarState.collapsed}
            onToggle={layout.actions.toggleSidebar}
          >
            {header}
          </DashboardHeader>
        )}
        <div className="flex flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              defaultSize={layout.sidebarState.collapsed ? 4 : 17.5}
              minSize={layout.sidebarState.collapsed ? 4 : minSidebarWidth / 16}
              maxSize={layout.sidebarState.collapsed ? 4 : maxSidebarWidth / 16}
              className="border-r border-border/20 bg-card"
              onResize={size => {
                const newWidth = size * 16;
                layout.actions.setSidebarWidth(newWidth);
              }}
            >
              <ScrollArea className="h-full">
                <div
                  className={cn(
                    'transition-all duration-300 ease-in-out',
                    layout.sidebarState.collapsed && 'opacity-90'
                  )}
                >
                  {React.isValidElement(sidebar)
                    ? React.cloneElement(sidebar, {
                        collapsed: layout.sidebarState.collapsed,
                        ...(sidebar.props && typeof sidebar.props === 'object'
                          ? sidebar.props
                          : {}),
                      } as any)
                    : sidebar}
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={layout.sidebarState.collapsed ? 96 : 82.5}
              className="bg-background"
            >
              {renderMainContent}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    );
  }
);

SentimentDashboardLayout.displayName = 'SentimentDashboardLayout';

export { SentimentDashboardLayout, type SentimentDashboardLayoutProps };
