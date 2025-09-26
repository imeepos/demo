import { createFileRoute } from '@tanstack/react-router';
import {
  DashboardCard,
  MetricCard,
  MetricValue,
  MetricLabel,
  TrendIndicator,
  LiveIndicator,
  StatusDot,
  ProgressBar,
  SentimentBadge,
  WordcloudTag,
  WordcloudContainer,
} from '../components/dashboard/DashboardComponents';
import { Badge } from '@sker/ui';

export const Route = createFileRoute('/color-test')({
  component: ColorSystemTestPage,
});

/**
 * 专业UI配色方案测试页面
 * 展示统一设计系统下的所有组件视觉效果
 * 作为设计规范和开发参考
 */
function ColorSystemTestPage() {
  return (
    <div className="dashboard-container p-6">
      <div className="w-full space-y-8">
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6">
            核心指标展示
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard variant="primary" className="animate-card-float">
              <MetricCard variant="primary">
                <MetricLabel>总监控数据</MetricLabel>
                <MetricValue variant="primary" size="lg" className="data-value">
                  2,847
                </MetricValue>
                <TrendIndicator
                  trend="up"
                  value="+12.5%"
                  icon={<span>↗</span>}
                />
              </MetricCard>
            </DashboardCard>

            <DashboardCard variant="success">
              <MetricCard variant="success">
                <MetricLabel>正面情感</MetricLabel>
                <MetricValue variant="success" size="lg" className="data-value">
                  1,634
                </MetricValue>
                <TrendIndicator
                  trend="up"
                  value="+8.3%"
                  icon={<span>↗</span>}
                />
              </MetricCard>
            </DashboardCard>

            <DashboardCard variant="danger">
              <MetricCard variant="danger">
                <MetricLabel>负面情感</MetricLabel>
                <MetricValue variant="danger" size="lg" className="data-value">
                  321
                </MetricValue>
                <TrendIndicator
                  trend="down"
                  value="-5.7%"
                  icon={<span>↘</span>}
                />
              </MetricCard>
            </DashboardCard>

            <DashboardCard variant="warning">
              <MetricCard variant="warning">
                <MetricLabel>中性情感</MetricLabel>
                <MetricValue variant="warning" size="lg" className="data-value">
                  892
                </MetricValue>
                <TrendIndicator
                  trend="neutral"
                  value="±2.1%"
                  icon={<span>→</span>}
                />
              </MetricCard>
            </DashboardCard>
          </div>
        </section>

        {/* 系统状态监控 */}
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6">
            系统状态监控
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <StatusDot status="online" pulse />
                  数据采集状态
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2 ">
                      <span>数据抓取</span>
                      <span className="data-value">98.5%</span>
                    </div>
                    <ProgressBar value={98.5} variant="success" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2 ">
                      <span>情感分析</span>
                      <span className="data-value">87.2%</span>
                    </div>
                    <ProgressBar value={87.2} variant="warning" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2 ">
                      <span>实时推送</span>
                      <span className="data-value">96.8%</span>
                    </div>
                    <ProgressBar value={96.8} variant="primary" />
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold ">情感分析标签</h3>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <SentimentBadge sentiment="very-positive">
                      非常积极
                    </SentimentBadge>
                    <SentimentBadge sentiment="positive">积极</SentimentBadge>
                    <SentimentBadge sentiment="neutral">中性</SentimentBadge>
                    <SentimentBadge sentiment="negative">消极</SentimentBadge>
                    <SentimentBadge sentiment="very-negative">
                      非常消极
                    </SentimentBadge>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 ">
                      实时状态指示器
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <LiveIndicator status="online">
                        数据同步正常
                      </LiveIndicator>
                      <LiveIndicator status="warning">部分延迟</LiveIndicator>
                      <LiveIndicator status="offline">连接异常</LiveIndicator>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </section>

        {/* 热词云展示 */}
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6 ">
            热词云展示
          </h2>
          <DashboardCard>
            <WordcloudContainer>
              <WordcloudTag variant="primary" shine>
                舆情监控
              </WordcloudTag>
              <WordcloudTag variant="secondary" shine>
                数据分析
              </WordcloudTag>
              <WordcloudTag variant="primary">实时监控</WordcloudTag>
              <WordcloudTag variant="secondary">情感分析</WordcloudTag>
              <WordcloudTag variant="primary" shine>
                智能预警
              </WordcloudTag>
              <WordcloudTag variant="secondary">热点追踪</WordcloudTag>
              <WordcloudTag variant="primary">地理分析</WordcloudTag>
              <WordcloudTag variant="secondary" shine>
                趋势预测
              </WordcloudTag>
              <WordcloudTag variant="primary">关键词</WordcloudTag>
              <WordcloudTag variant="secondary">数据挖掘</WordcloudTag>
              <WordcloudTag variant="primary" shine>
                可视化
              </WordcloudTag>
              <WordcloudTag variant="secondary">报告生成</WordcloudTag>
            </WordcloudContainer>
          </DashboardCard>
        </section>

        {/* 配色方案详细展示 */}
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6">
            核心配色方案
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 主色系 */}
            <DashboardCard>
              <h3 className="text-lg font-semibold mb-4">
                主色系 (Primary Palette)
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary p-4 rounded-lg text-white text-center">
                    <div className="font-semibold mb-1">Primary</div>
                    <div className="text-xs opacity-90">#1e40af</div>
                    <div className="text-xs opacity-75">主品牌色</div>
                  </div>
                  <div className="bg-accent p-4 rounded-lg text-white text-center">
                    <div className="font-semibold mb-1">Accent</div>
                    <div className="text-xs opacity-90">#0ea5e9</div>
                    <div className="text-xs opacity-75">强调色</div>
                  </div>
                </div>
                <div className="bg-gradient-primary p-4 rounded-lg text-white text-center">
                  <div className="font-semibold mb-1">Primary Gradient</div>
                  <div className="text-xs opacity-90">渐变主色</div>
                </div>
              </div>
            </DashboardCard>

            {/* 功能色系 */}
            <DashboardCard>
              <h3 className="text-lg font-semibold mb-4">
                功能色系 (Functional Palette)
              </h3>
              <div className="space-y-3">
                <div className="bg-[var(--success)] p-4 rounded-lg text-white text-center">
                  <div className="font-semibold mb-1">Success</div>
                  <div className="text-xs opacity-90">#059669</div>
                  <div className="text-xs opacity-75">成功/正面</div>
                </div>
                <div className="bg-[var(--warning)] p-4 rounded-lg text-white text-center">
                  <div className="font-semibold mb-1">Warning</div>
                  <div className="text-xs opacity-90">#d97706</div>
                  <div className="text-xs opacity-75">警告/中性</div>
                </div>
                <div className="bg-[var(--destructive)] p-4 rounded-lg text-white text-center">
                  <div className="font-semibold mb-1">Danger</div>
                  <div className="text-xs opacity-90">#dc2626</div>
                  <div className="text-xs opacity-75">危险/负面</div>
                </div>
              </div>
            </DashboardCard>

            {/* 中性色系 */}
            <DashboardCard>
              <h3 className="text-lg font-semibold mb-4">
                中性色系 (Neutral Palette)
              </h3>
              <div className="space-y-3">
                <div className="bg-background border-2 border-border p-4 rounded-lg text-center">
                  <div className="font-semibold mb-1 text-foreground">
                    Background
                  </div>
                  <div className="text-xs text-muted-foreground">#f8fafc</div>
                  <div className="text-xs text-muted-foreground">页面背景</div>
                </div>
                <div className="bg-card border-2 border-border p-4 rounded-lg text-center">
                  <div className="font-semibold mb-1 text-foreground">Card</div>
                  <div className="text-xs text-muted-foreground">#ffffff</div>
                  <div className="text-xs text-muted-foreground">卡片背景</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="font-semibold mb-1 text-muted-foreground">
                    Muted
                  </div>
                  <div className="text-xs text-muted-foreground">#f1f5f9</div>
                  <div className="text-xs text-muted-foreground">静默背景</div>
                </div>
              </div>
            </DashboardCard>

            {/* 文字色系 */}
            <DashboardCard>
              <h3 className="text-lg font-semibold mb-4">
                文字色系 (Typography Palette)
              </h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-foreground font-semibold mb-2">
                    Foreground
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    #0f172a - 主要文字
                  </div>
                  <div className="text-foreground">这是主要文字颜色的示例</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-foreground font-semibold mb-2">
                    Muted Foreground
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    #64748b - 次要文字
                  </div>
                  <div className="text-muted-foreground">
                    这是次要文字颜色的示例
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </section>

        {/* 配色使用规范 */}
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6">
            配色使用规范
          </h2>
          <DashboardCard>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">✅ 推荐做法</h4>
                <div className="space-y-2 text-sm">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    使用 CSS 变量
                  </Badge>
                  <p className="text-muted-foreground">
                    text-primary, bg-[var(--success)]
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    主题统一性
                  </Badge>
                  <p className="text-muted-foreground">
                    所有组件遵循同一配色体系
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">❌ 避免做法</h4>
                <div className="space-y-2 text-sm">
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-200"
                  >
                    硬编码颜色
                  </Badge>
                  <p className="text-muted-foreground">
                    text-blue-600, bg-green-100
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200"
                  >
                    过多颜色变体
                  </Badge>
                  <p className="text-muted-foreground">避免超过8种主要颜色</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">💡 最佳实践</h4>
                <div className="space-y-2 text-sm">
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    语义化命名
                  </Badge>
                  <p className="text-muted-foreground">
                    success/warning/danger
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-teal-50 text-teal-700 border-teal-200"
                  >
                    渐进式增强
                  </Badge>
                  <p className="text-muted-foreground">hover状态和动画效果</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </section>

        {/* 组件对比展示 */}
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6">
            组件对比展示
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 标准化组件 */}
            <DashboardCard variant="success">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-[var(--success)]">✅</span>
                标准化配色组件
              </h3>
              <div className="space-y-4">
                <MetricCard variant="primary">
                  <MetricLabel>使用主题变量</MetricLabel>
                  <MetricValue variant="primary" size="default">
                    2,847
                  </MetricValue>
                  <TrendIndicator trend="up" value="+12.5%" />
                </MetricCard>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">
                    进度条示例
                  </div>
                  <ProgressBar value={85} variant="primary" />
                  <ProgressBar value={92} variant="success" />
                  <ProgressBar value={67} variant="warning" />
                </div>

                <div className="flex flex-wrap gap-2">
                  <SentimentBadge sentiment="positive">正面</SentimentBadge>
                  <SentimentBadge sentiment="neutral">中性</SentimentBadge>
                  <SentimentBadge sentiment="negative">负面</SentimentBadge>
                </div>
              </div>
            </DashboardCard>

            {/* 问题组件对比 */}
            <DashboardCard>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-[var(--destructive)]">❌</span>
                硬编码配色问题
              </h3>
              <div className="space-y-4 opacity-75">
                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-blue-700 font-medium mb-1">
                    硬编码蓝色
                  </div>
                  <div className="text-3xl font-bold text-blue-600">1,234</div>
                  <div className="text-xs text-blue-500">不跟随主题变化</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">
                    混乱的颜色使用
                  </div>
                  <div className="h-2 bg-green-200 rounded">
                    <div
                      className="h-full bg-green-500 rounded"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <div className="h-2 bg-blue-200 rounded">
                    <div
                      className="h-full bg-blue-600 rounded"
                      style={{ width: '92%' }}
                    ></div>
                  </div>
                  <div className="h-2 bg-orange-200 rounded">
                    <div
                      className="h-full bg-orange-400 rounded"
                      style={{ width: '67%' }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    绿色
                  </span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                    黄色
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                    红色
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-600 border-red-200"
                >
                  不遵循设计系统
                </Badge>
              </div>
            </DashboardCard>
          </div>
        </section>

        {/* 字体展示 */}
        <section>
          <h2 className="text-xl font-medium text-foreground mb-6">
            字体系统展示
          </h2>
          <DashboardCard>
            <div className="space-y-4">
              <div className="font-rubik-black text-4xl metric-highlight">
                Rubik Black - 舆情监控系统
              </div>
              <div className="font-rubik-bold text-2xl text-foreground">
                Rubik Bold - 数据可视化大屏
              </div>
              <div className="font-rubik-semibold text-lg text-muted-foreground">
                Rubik Semibold - 实时监控与智能分析
              </div>
              <div className="font-rubik-medium text-base text-muted-foreground">
                Rubik Medium - 为企业和机构提供专业的舆情分析服务
              </div>
              <div className="font-rubik-regular text-sm text-muted-foreground">
                Rubik Regular -
                基于人工智能的全网数据采集、情感分析、热点追踪解决方案
              </div>
            </div>
          </DashboardCard>
        </section>
      </div>
    </div>
  );
}
