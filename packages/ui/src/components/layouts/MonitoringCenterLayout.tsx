'use client';

/**
 * 监测中心布局组件
 * 提供多标签页面板和侧滑预警信息流
 * 适用于实时舆情监测和预警处理场景
 */

import * as React from 'react';
import { useState, useEffect, forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';

import {
  type MonitoringCenterLayoutProps,
  type MonitoringTab,
  type AlertItem,
} from './types';

// 监测中心布局主组件
const MonitoringCenterLayout = forwardRef<
  HTMLDivElement,
  MonitoringCenterLayoutProps
>(
  (
    {
      children,
      tabs = [],
      alerts = [],
      defaultTab,
      onTabChange,
      onAlertAction,
      onRefresh,
      enableFullscreen = true,
      autoRefresh = true,
      refreshInterval = 30000,
      className,
      ...props
    },
    ref
  ) => {
    // 状态管理
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id); // 当前激活标签页
    const [isFullscreen, setIsFullscreen] = useState(false); // 是否全屏模式
    const [alertsOpen, setAlertsOpen] = useState(false); // 预警面板是否打开

    // 自动刷新逻辑
    useEffect(() => {
      if (!autoRefresh || !onRefresh) return;

      const interval = setInterval(() => {
        onRefresh();
      }, refreshInterval);

      return () => clearInterval(interval);
    }, [autoRefresh, refreshInterval, onRefresh]);

    // 新预警提醒逻辑
    useEffect(() => {
      const newAlerts = alerts.filter(alert => alert.status === 'new');
      if (newAlerts.length > 0) {
        setAlertsOpen(true);
      }
    }, [alerts]);

    // 处理标签页切换
    const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
      onTabChange?.(tabId);
    };

    // 计算预警数量
    const criticalAlerts = alerts.filter(
      alert => alert.level === 'critical' && alert.status === 'new'
    ); // 紧急预警
    const newAlertsCount = alerts.filter(a => a.status === 'new').length; // 新预警数量

    return (
      <div
        className={cn(
          'h-screen flex flex-col bg-background',
          isFullscreen && 'fixed inset-0 z-50',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* 顶部控制栏：标题、紧急预警提示、操作按钮 */}
        <Card className="rounded-none border-x-0 border-t-0">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">监测中心</h1>
              {criticalAlerts.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {criticalAlerts.length} 紧急预警
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* 预警中心侧滑面板 */}
              <Sheet open={alertsOpen} onOpenChange={setAlertsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    预警中心
                    {newAlertsCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                      >
                        {newAlertsCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-96">
                  <SheetHeader>
                    <SheetTitle>预警信息</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full mt-4">
                    <div className="space-y-4">
                      {alerts.map(alert => (
                        <Alert key={alert.id} className="relative">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge
                                  variant={
                                    alert.level === 'critical'
                                      ? 'destructive'
                                      : alert.level === 'high'
                                        ? 'destructive'
                                        : alert.level === 'medium'
                                          ? 'default'
                                          : 'secondary'
                                  }
                                >
                                  {alert.level}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {alert.source}
                                </span>
                              </div>
                              <h4 className="font-medium">{alert.title}</h4>
                              <AlertDescription>
                                {alert.description}
                              </AlertDescription>
                              <div className="flex space-x-2 mt-2">
                                {alert.actions?.map(action => (
                                  <Button
                                    key={action.id}
                                    size="sm"
                                    variant={action.variant}
                                    onClick={() => {
                                      action.onClick();
                                      onAlertAction?.(alert.id, action.id);
                                    }}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Alert>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {/* 全屏模式切换 */}
              {enableFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? '退出全屏' : '全屏'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 主要监测区域：多标签页监测面板 */}
        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="h-full flex flex-col"
          >
            {/* 标签页列表 */}
            <div className="border-b bg-muted/50">
              <TabsList className="h-12 p-1 bg-transparent">
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    disabled={tab.disabled}
                    className="relative data-[state=active]:bg-background"
                  >
                    {tab.label}
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <Badge
                        variant={tab.urgent ? 'destructive' : 'secondary'}
                        className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                      >
                        {tab.badge > 99 ? '99+' : tab.badge}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* 标签页内容区域 */}
            <div className="flex-1 overflow-hidden">
              {tabs.map(tab => (
                <TabsContent key={tab.id} value={tab.id} className="h-full m-0">
                  <ScrollArea className="h-full">
                    <div className="p-6">{tab.content}</div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {children}
      </div>
    );
  }
);

MonitoringCenterLayout.displayName = 'MonitoringCenterLayout';

export { MonitoringCenterLayout };
export type { MonitoringCenterLayoutProps };
