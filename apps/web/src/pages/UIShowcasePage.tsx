/**
 * UI组件展示页面
 * 职责：完整展示@sker/ui组件库的所有组件及其组合使用效果
 */

import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
} from '@sker/ui';
import { BasicComponentsSection } from '../components/showcase/BasicComponentsSection';
import { BusinessComponentsSection } from '../components/showcase/BusinessComponentsSection';
import { ComplexComponentsSection } from '../components/showcase/ComplexComponentsSection';
import { LayoutComponentsSection } from '../components/showcase/LayoutComponentsSection';

export function UIShowcasePage() {
  const [activeSection, setActiveSection] = useState('basic');

  const sections = [
    { id: 'basic', title: '基础组件', description: 'shadcn/ui 标准组件集合' },
    { id: 'business', title: '业务组件', description: '舆情系统专用元素组件' },
    { id: 'complex', title: '复合组件', description: '高级功能组件和图表' },
    { id: 'layout', title: '布局组件', description: '完整页面布局模板' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部导航 */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                UI 组件展示
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                @sker/ui 组件库完整展示与使用指南
              </p>
            </div>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>组件分类</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-96 gap-3 p-4">
                      {sections.map(section => (
                        <NavigationMenuLink
                          key={section.id}
                          className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          onClick={() => setActiveSection(section.id)}
                        >
                          <div className="text-sm font-medium leading-none">
                            {section.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {section.description}
                          </p>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* 面包屑导航 */}
          <Breadcrumb className="mt-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">首页</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>UI展示</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-6 py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>组件展示面板</CardTitle>
            <CardDescription>
              通过真实的舆情监控场景展示各类组件的功能特性和组合使用效果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeSection}
              onValueChange={setActiveSection}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">基础组件</TabsTrigger>
                <TabsTrigger value="business">业务组件</TabsTrigger>
                <TabsTrigger value="complex">复合组件</TabsTrigger>
                <TabsTrigger value="layout">布局组件</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[600px] w-full mt-6">
                <TabsContent value="basic" className="space-y-6">
                  <BasicComponentsSection />
                </TabsContent>

                <TabsContent value="business" className="space-y-6">
                  <BusinessComponentsSection />
                </TabsContent>

                <TabsContent value="complex" className="space-y-6">
                  <ComplexComponentsSection />
                </TabsContent>

                <TabsContent value="layout" className="space-y-6">
                  <LayoutComponentsSection />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
