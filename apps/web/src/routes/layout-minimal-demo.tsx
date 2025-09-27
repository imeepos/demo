import { createFileRoute } from '@tanstack/react-router';
import { SentimentDashboardLayout } from '@sker/ui';
import { Card, CardContent, Button } from '@sker/ui';
import { BarChart3, TrendingUp, Users, Calendar, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/layout-minimal-demo')({
  component: LayoutMinimalDemoPage,
});

function LayoutMinimalDemoPage() {
  const minimalSidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg mb-4 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-bold">极简风格</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 h-12 rounded-xl bg-primary/10 text-primary"
        >
          <BarChart3 className="h-5 w-5" />
          <span>概览</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-4 h-12 rounded-xl"
        >
          <TrendingUp className="h-5 w-5" />
          <span>趋势</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-4 h-12 rounded-xl"
        >
          <Users className="h-5 w-5" />
          <span>用户</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-4 h-12 rounded-xl"
        >
          <Calendar className="h-5 w-5" />
          <span>日程</span>
        </Button>
      </nav>
    </div>
  );

  const minimalHeader = (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-bold">极简风格示例</h1>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-muted rounded-full"></div>
      </div>
    </div>
  );

  const minimalContent = (
    <div className="space-y-8">
      {/* 介绍卡片 */}
      <Card className="border-none shadow-none bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <CardContent className="p-8 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-3">极致简约设计</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            这是 SentimentDashboardLayout 的极简风格展示。
            追求视觉纯净，去除不必要的装饰，专注于内容本身。
          </p>
        </CardContent>
      </Card>

      {/* 数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-none bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-8">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              2.4k
            </div>
            <div className="text-blue-800 dark:text-blue-300 font-medium">
              活跃用户
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-8">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              12.8k
            </div>
            <div className="text-green-800 dark:text-green-300 font-medium">
              总访问量
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-8">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              94.2%
            </div>
            <div className="text-purple-800 dark:text-purple-300 font-medium">
              满意度
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 设计理念 */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-6">极简设计理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">视觉层次</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 统一的间距系统</li>
                <li>• 精简的色彩搭配</li>
                <li>• 清晰的层次结构</li>
                <li>• 去除视觉干扰元素</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">交互体验</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 流畅的动画过渡</li>
                <li>• 直观的操作反馈</li>
                <li>• 一致的交互模式</li>
                <li>• 响应式适配设计</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 实现特点 */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-6">实现特点</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: '零配置启动',
                description: '默认配置即可使用，无需复杂设置',
                color: 'bg-blue-500',
              },
              {
                title: '轻量级架构',
                description: '最小化依赖，专注核心功能',
                color: 'bg-green-500',
              },
              {
                title: '极致性能',
                description: 'React.memo 优化，流畅体验',
                color: 'bg-purple-500',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-3">
                <div
                  className={`w-12 h-12 ${feature.color} rounded-xl mx-auto flex items-center justify-center`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 使用代码 */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-xl font-bold mb-6">最简使用方式</h2>
          <div className="bg-muted p-6 rounded-xl text-sm font-mono">
            <div className="text-muted-foreground mb-3">{`// 极简使用 - 只需传入内容`}</div>
            <div className="space-y-1">
              <div>&lt;SentimentDashboardLayout&gt;</div>
              <div className="ml-4 text-muted-foreground">{`{/* 你的内容 */}`}</div>
              <div>&lt;/SentimentDashboardLayout&gt;</div>
            </div>

            <div className="text-muted-foreground mt-6 mb-3">{`// 或者添加侧边栏`}</div>
            <div className="space-y-1">
              <div>
                &lt;SentimentDashboardLayout sidebar={`{<YourSidebar />}`}&gt;
              </div>
              <div className="ml-4 text-muted-foreground">{`{/* 你的内容 */}`}</div>
              <div>&lt;/SentimentDashboardLayout&gt;</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SentimentDashboardLayout
      sidebar={minimalSidebar}
      header={minimalHeader}
      defaultCollapsed={false}
      enableResize={false}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
      aria-label="极简风格布局示例页面"
    >
      {minimalContent}
    </SentimentDashboardLayout>
  );
}
