'use client';

/**
 * 报告生成器布局组件
 * 提供三列布局：配置面板、实时预览、导出操作
 * 支持报告模板管理和多格式导出
 */

import * as React from 'react';
import { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import {
  type ReportGeneratorLayoutProps,
  type ReportConfig,
  type ExportFormat,
  type PreviewMode,
  type ReportTemplate,
} from './types';

// 获取默认报告配置
const getDefaultConfig = (): ReportConfig => ({
  title: '舆情分析报告',
  description: '',
  dateRange: {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(),
  },
  dataSources: [],
  sections: [
    { id: '1', type: 'overview', title: '概述', enabled: true, config: {} },
    { id: '2', type: 'chart', title: '趋势图表', enabled: true, config: {} },
    { id: '3', type: 'table', title: '详细数据', enabled: false, config: {} },
    { id: '4', type: 'timeline', title: '时间线', enabled: false, config: {} },
  ],
  style: {
    theme: 'light',
    primaryColor: '#3b82f6',
    fontFamily: 'system-ui',
    headerFooter: true,
  },
  format: 'pdf',
});

// 报告预览组件
const ReportPreview = React.memo<{
  config: ReportConfig;
  mode: PreviewMode;
  className?: string;
}>(({ config, mode, className }) => {
  return (
    <div className={cn('p-6 bg-background rounded-lg', className)}>
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{config.title || '未命名报告'}</h1>
          {config.description && (
            <p className="text-muted-foreground mt-2">{config.description}</p>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            时间范围: {config.dateRange.start.toLocaleDateString()} -{' '}
            {config.dateRange.end.toLocaleDateString()}
          </div>
          <div className="text-sm text-muted-foreground">
            数据源: {config.dataSources.join(', ') || '未选择'}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="font-medium">报告内容</h3>
          {config.sections
            .filter(s => s.enabled)
            .map(section => (
              <div key={section.id} className="p-3 border rounded-md">
                <h4 className="font-medium text-sm">{section.title}</h4>
                <div className="text-xs text-muted-foreground mt-1">
                  类型: {section.type}
                </div>
              </div>
            ))}
        </div>

        <div className="text-center text-xs text-muted-foreground mt-8">
          预览模式: {mode}
        </div>
      </div>
    </div>
  );
});

ReportPreview.displayName = 'ReportPreview';

// 报告生成器布局主组件
const ReportGeneratorLayout = forwardRef<
  HTMLDivElement,
  ReportGeneratorLayoutProps
>(
  (
    {
      children,
      defaultConfig,
      templates = [],
      onConfigChange,
      onGenerate,
      onSaveTemplate,
      isGenerating = false,
      generationProgress = 0,
      className,
      ...props
    },
    ref
  ) => {
    const [config, setConfig] = useState<ReportConfig>(
      defaultConfig || getDefaultConfig()
    );
    const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
    const [showTemplates, setShowTemplates] = useState(false);

    const form = useForm<ReportConfig>({
      defaultValues: config,
    });

    // 处理配置变更
    const handleConfigChange = (newConfig: Partial<ReportConfig>) => {
      const updatedConfig = { ...config, ...newConfig };
      setConfig(updatedConfig);
      form.reset(updatedConfig);
      onConfigChange?.(updatedConfig);
    };

    // 处理报告生成
    const handleGenerate = async (format: ExportFormat) => {
      if (!onGenerate) return;

      try {
        await onGenerate(config, format);
      } catch (error) {
        console.error('报告生成失败:', error);
      }
    };

    // 处理模板保存
    const handleSaveTemplate = () => {
      if (!onSaveTemplate) return;

      onSaveTemplate({
        id: Date.now().toString(),
        name: config.title || '未命名模板',
        config,
      });
    };

    return (
      <div
        className={cn('h-screen flex flex-col bg-background', className)}
        ref={ref}
        {...props}
      >
        {/* 顶部工具栏：标题、进度条、操作按钮 */}
        <Card className="rounded-none border-x-0 border-t-0">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">报告生成器</h1>
              {isGenerating && (
                <div className="flex items-center space-x-2">
                  <Progress value={generationProgress} className="w-32" />
                  <span className="text-sm text-muted-foreground">
                    生成中... {generationProgress}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                模板库
              </Button>
              <Button variant="outline" size="sm" onClick={handleSaveTemplate}>
                保存模板
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 主体三列布局：配置面板 - 预览区域 - 操作面板 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧配置面板：报告基本信息、数据源、内容区块、样式设置 */}
          <Card className="w-80 rounded-none border-y-0 border-l-0">
            <CardHeader>
              <CardTitle>报告配置</CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-auto">
              <Form {...form}>
                <form className="space-y-6">
                  {/* 基本信息配置 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">基本信息</h3>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>报告标题</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={config.title}
                              onChange={e => {
                                field.onChange(e);
                                handleConfigChange({ title: e.target.value });
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>报告描述</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              value={config.description || ''}
                              onChange={e => {
                                field.onChange(e);
                                handleConfigChange({
                                  description: e.target.value,
                                });
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* 数据源选择配置 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">数据源</h3>
                    <FormField
                      control={form.control}
                      name="dataSources"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>选择数据源</FormLabel>
                          <div className="space-y-2">
                            {['新闻', '微博', '论坛', '视频'].map(source => (
                              <div
                                key={source}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  checked={config.dataSources.includes(source)}
                                  onCheckedChange={checked => {
                                    const newSources = checked
                                      ? [...config.dataSources, source]
                                      : config.dataSources.filter(
                                          s => s !== source
                                        );
                                    field.onChange(newSources);
                                    handleConfigChange({
                                      dataSources: newSources,
                                    });
                                  }}
                                />
                                <label className="text-sm">{source}</label>
                              </div>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* 报告内容区块配置 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">报告内容</h3>
                    {config.sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={section.enabled}
                          onCheckedChange={checked => {
                            const newSections = config.sections.map((s, i) =>
                              i === index ? { ...s, enabled: !!checked } : s
                            );
                            handleConfigChange({ sections: newSections });
                          }}
                        />
                        <label className="text-sm">{section.title}</label>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* 样式主题配置 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">样式设置</h3>
                    <FormField
                      control={form.control}
                      name="style.theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>主题</FormLabel>
                          <Select
                            value={config.style.theme}
                            onValueChange={value => {
                              field.onChange(value);
                              handleConfigChange({
                                style: { ...config.style, theme: value as any },
                              });
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">浅色</SelectItem>
                              <SelectItem value="dark">深色</SelectItem>
                              <SelectItem value="minimal">简约</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* 中间预览区域：实时预览，支持多种预览模式 */}
          <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-medium">实时预览</h3>
              <Tabs
                value={previewMode}
                onValueChange={value => setPreviewMode(value as PreviewMode)}
              >
                <TabsList>
                  <TabsTrigger value="desktop">桌面端</TabsTrigger>
                  <TabsTrigger value="mobile">移动端</TabsTrigger>
                  <TabsTrigger value="print">打印版</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 p-6 overflow-auto bg-muted/20">
              <div
                className={cn(
                  'mx-auto bg-background shadow-lg rounded-lg',
                  previewMode === 'desktop' && 'max-w-4xl',
                  previewMode === 'mobile' && 'max-w-sm',
                  previewMode === 'print' && 'max-w-[210mm]'
                )}
              >
                <ReportPreview config={config} mode={previewMode} />
              </div>
            </div>
          </div>

          {/* 右侧操作面板：导出格式选择、快捷操作 */}
          <Card className="w-64 rounded-none border-y-0 border-r-0">
            <CardHeader>
              <CardTitle>导出操作</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">导出格式</h4>
                {(
                  ['pdf', 'docx', 'html', 'excel', 'pptx'] as ExportFormat[]
                ).map(format => (
                  <Button
                    key={format}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleGenerate(format)}
                    disabled={isGenerating}
                  >
                    导出 {format.toUpperCase()}
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium text-sm">快捷操作</h4>
                <Button variant="outline" className="w-full">
                  发送邮件
                </Button>
                <Button variant="outline" className="w-full">
                  分享链接
                </Button>
                <Button variant="outline" className="w-full">
                  定时生成
                </Button>
              </div>

              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);

ReportGeneratorLayout.displayName = 'ReportGeneratorLayout';

export { ReportGeneratorLayout };
export type { ReportGeneratorLayoutProps };
