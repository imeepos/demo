# ReportGeneratorLayout - 报告生成器布局

## 📋 组件概述

ReportGeneratorLayout 是专为舆情报告生成设计的三列式布局组件，提供配置面板、实时预览和导出功能的完整工作流。适用于需要自定义报告生成和批量数据导出的场景。

### 核心业务场景

- 舆情分析报告生成
- 数据可视化报告制作
- 定制化报表配置
- 批量报告导出系统

## 🎯 设计准则

### 基于 shadcn/ui 组装策略

```typescript
基础组件组合：
- Form: 报告配置表单
- Card: 内容区域容器
- Progress: 生成进度条
- Button: 操作控制按钮
- Separator: 区域分隔线
- Tabs: 预览模式切换
- Select: 配置选项选择
- Calendar: 时间范围选择
- Checkbox: 多选配置项
```

### 视觉一致性要求

- 三列布局：配置 - 预览 - 操作
- 清晰的流程指引
- 实时预览反馈
- 统一的表单样式

### 交互行为规范

- 配置变更实时更新预览
- 渐进式表单引导
- 异步操作状态反馈
- 快捷操作支持

## 🔧 核心用途

### 主要功能

1. **报告配置**: 灵活的报告内容和样式配置
2. **实时预览**: 即时查看报告生成效果
3. **格式导出**: 支持多种格式输出
4. **模板管理**: 保存和复用报告模板

### 适用业务场景

- 政府舆情分析报告
- 企业品牌监测报告
- 媒体数据统计报告
- 危机事件分析报告

### 用户交互流程

1. 选择报告模板或创建新报告
2. 配置报告参数和数据源
3. 实时预览报告内容
4. 调整样式和布局
5. 导出或分享报告

## 🛠️ 技术实现

### 组装的基础组件清单

```typescript
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
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
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
```

### TypeScript 接口定义

```typescript
interface ReportGeneratorLayoutProps {
  children?: React.ReactNode;
  defaultConfig?: ReportConfig;
  templates?: ReportTemplate[];
  onConfigChange?: (config: ReportConfig) => void;
  onGenerate?: (config: ReportConfig, format: ExportFormat) => Promise<void>;
  onSaveTemplate?: (template: ReportTemplate) => void;
  isGenerating?: boolean;
  generationProgress?: number;
  className?: string;
}

interface ReportConfig {
  title: string;
  description?: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  dataSources: string[];
  sections: ReportSection[];
  style: ReportStyle;
  format: ExportFormat;
}

interface ReportSection {
  id: string;
  type: 'overview' | 'chart' | 'table' | 'text' | 'timeline';
  title: string;
  enabled: boolean;
  config: Record<string, any>;
}

interface ReportTemplate {
  id: string;
  name: string;
  description?: string;
  config: ReportConfig;
  thumbnail?: string;
  isDefault?: boolean;
}

interface ReportStyle {
  theme: 'light' | 'dark' | 'minimal';
  primaryColor: string;
  fontFamily: string;
  logoUrl?: string;
  headerFooter: boolean;
}

type ExportFormat = 'pdf' | 'docx' | 'html' | 'excel' | 'pptx';
```

### 关键实现逻辑

```typescript
const ReportGeneratorLayout = forwardRef<HTMLDivElement, ReportGeneratorLayoutProps>(
  ({
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
  }, ref) => {
    const [config, setConfig] = useState<ReportConfig>(
      defaultConfig || getDefaultConfig()
    );
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'print'>('desktop');
    const [showTemplates, setShowTemplates] = useState(false);

    const form = useForm<ReportConfig>({
      defaultValues: config,
    });

    // 配置变更处理
    const handleConfigChange = (newConfig: Partial<ReportConfig>) => {
      const updatedConfig = { ...config, ...newConfig };
      setConfig(updatedConfig);
      onConfigChange?.(updatedConfig);
    };

    // 报告生成处理
    const handleGenerate = async (format: ExportFormat) => {
      if (!onGenerate) return;

      try {
        await onGenerate(config, format);
      } catch (error) {
        console.error('报告生成失败:', error);
      }
    };

    return (
      <div
        className={cn("h-screen flex flex-col bg-background", className)}
        ref={ref}
        {...props}
      >
        {/* 顶部工具栏 */}
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSaveTemplate?.({
                  id: Date.now().toString(),
                  name: config.title || '未命名模板',
                  config
                })}
              >
                保存模板
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 主体三列布局 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 左侧配置面板 */}
          <Card className="w-80 rounded-none border-y-0 border-l-0">
            <CardHeader>
              <CardTitle>报告配置</CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-auto">
              <Form {...form}>
                <form className="space-y-6">
                  {/* 基本信息 */}
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
                              onChange={(e) => {
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
                              onChange={(e) => {
                                field.onChange(e);
                                handleConfigChange({ description: e.target.value });
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* 数据源配置 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">数据源</h3>
                    <FormField
                      control={form.control}
                      name="dataSources"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>选择数据源</FormLabel>
                          <div className="space-y-2">
                            {['新闻', '微博', '论坛', '视频'].map((source) => (
                              <div key={source} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={field.value?.includes(source)}
                                  onCheckedChange={(checked) => {
                                    const newSources = checked
                                      ? [...(field.value || []), source]
                                      : field.value?.filter(s => s !== source) || [];
                                    field.onChange(newSources);
                                    handleConfigChange({ dataSources: newSources });
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

                  {/* 报告内容 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">报告内容</h3>
                    {config.sections?.map((section, index) => (
                      <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox
                          checked={section.enabled}
                          onCheckedChange={(checked) => {
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

                  {/* 样式配置 */}
                  <div className="space-y-4">
                    <h3 className="font-medium">样式设置</h3>
                    <FormField
                      control={form.control}
                      name="style.theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>主题</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleConfigChange({
                                style: { ...config.style, theme: value as any }
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

          {/* 中间预览区域 */}
          <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-medium">实时预览</h3>
              <Tabs value={previewMode} onValueChange={setPreviewMode}>
                <TabsList>
                  <TabsTrigger value="desktop">桌面端</TabsTrigger>
                  <TabsTrigger value="mobile">移动端</TabsTrigger>
                  <TabsTrigger value="print">打印版</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 p-6 overflow-auto bg-muted/20">
              <div className={cn(
                "mx-auto bg-background shadow-lg rounded-lg",
                previewMode === 'desktop' && "max-w-4xl",
                previewMode === 'mobile' && "max-w-sm",
                previewMode === 'print' && "max-w-[210mm]"
              )}>
                {/* 报告预览内容 */}
                <ReportPreview config={config} mode={previewMode} />
              </div>
            </div>
          </div>

          {/* 右侧操作面板 */}
          <Card className="w-64 rounded-none border-y-0 border-r-0">
            <CardHeader>
              <CardTitle>导出操作</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">导出格式</h4>
                {(['pdf', 'docx', 'html', 'excel', 'pptx'] as ExportFormat[]).map((format) => (
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
```

### 样式和动画规范

```css
/* 预览模式切换动画 */
.preview-transition {
  @apply transition-all duration-300 ease-in-out;
}

/* 生成进度动画 */
.generation-progress {
  @apply bg-gradient-to-r from-blue-500 to-purple-500;
}

/* 配置面板滚动样式 */
.config-panel::-webkit-scrollbar {
  @apply w-2;
}

.config-panel::-webkit-scrollbar-thumb {
  @apply bg-border rounded-full;
}
```

## 📝 使用示例

### 基本使用

```typescript
import { ReportGeneratorLayout } from "@/components/layouts";

function ReportGeneratorPage() {
  const [config, setConfig] = useState<ReportConfig>({
    title: '舆情分析报告',
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    dataSources: ['新闻', '微博'],
    sections: [
      { id: '1', type: 'overview', title: '概述', enabled: true, config: {} },
      { id: '2', type: 'chart', title: '趋势图表', enabled: true, config: {} },
      { id: '3', type: 'table', title: '详细数据', enabled: false, config: {} }
    ],
    style: {
      theme: 'light',
      primaryColor: '#3b82f6',
      fontFamily: 'system-ui',
      headerFooter: true
    },
    format: 'pdf'
  });

  const handleGenerate = async (config: ReportConfig, format: ExportFormat) => {
    // 调用报告生成 API
    await generateReport(config, format);
  };

  return (
    <ReportGeneratorLayout
      defaultConfig={config}
      onConfigChange={setConfig}
      onGenerate={handleGenerate}
    />
  );
}
```

### 高级配置示例

```typescript
function AdvancedReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async (config: ReportConfig, format: ExportFormat) => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // 模拟进度更新
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      await generateReport(config, format);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <ReportGeneratorLayout
      templates={reportTemplates}
      isGenerating={isGenerating}
      generationProgress={progress}
      onGenerate={handleGenerate}
      onSaveTemplate={saveTemplate}
    />
  );
}
```

## 📖 API 文档

### Props 接口

| 属性               | 类型                                                          | 默认值 | 描述             |
| ------------------ | ------------------------------------------------------------- | ------ | ---------------- |
| defaultConfig      | ReportConfig                                                  | -      | 默认报告配置     |
| templates          | ReportTemplate[]                                              | []     | 报告模板列表     |
| onConfigChange     | (config: ReportConfig) => void                                | -      | 配置变更回调     |
| onGenerate         | (config: ReportConfig, format: ExportFormat) => Promise<void> | -      | 报告生成回调     |
| onSaveTemplate     | (template: ReportTemplate) => void                            | -      | 保存模板回调     |
| isGenerating       | boolean                                                       | false  | 是否正在生成     |
| generationProgress | number                                                        | 0      | 生成进度 (0-100) |

### 事件回调

- `onConfigChange`: 配置变更时触发
- `onGenerate`: 开始生成报告时触发
- `onSaveTemplate`: 保存模板时触发

## 🎨 最佳实践

### 设计建议

1. 配置面板保持清晰的逻辑分组
2. 预览区域提供多种视图模式
3. 操作面板功能明确且易于理解
4. 异步操作提供清晰的状态反馈

### 性能优化

1. 预览内容使用防抖更新
2. 大型报告使用分页预览
3. 模板缓存和懒加载
4. 生成过程使用 Web Workers
