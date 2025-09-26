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

/**
 * 亮色科技蓝配色方案测试页面
 * 展示所有组件在新配色下的视觉效果
 */
export function ColorSystemTestPage() {
  return (
    <div className="dashboard-container p-2">
      <div className="w-full space-y-4">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black metric-highlight mb-4">
            亮色科技蓝配色方案
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <LiveIndicator status="online" />
            <span className="text-muted-foreground">
              配色方案测试 · 实时预览
            </span>
          </div>
        </div>

        {/* 核心指标卡片 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
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
          <h2 className="text-2xl font-bold text-foreground mb-6">
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
          <h2 className="text-2xl font-bold text-foreground mb-6 ">
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

        {/* 配色展示 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 ">
            配色方案展示
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-tech-gradient p-6 rounded-xl text-white text-center shadow-tech-lg">
              <h3 className="font-bold mb-2 ">主渐变色</h3>
              <p className="text-sm opacity-90">Primary Gradient</p>
            </div>

            <div className="bg-primary p-6 rounded-xl text-white text-center shadow-tech">
              <h3 className="font-bold mb-2 ">主品牌色</h3>
              <p className="text-sm opacity-90">#1e40af</p>
            </div>

            <div className="bg-accent p-6 rounded-xl text-white text-center shadow-tech">
              <h3 className="font-bold mb-2 ">辅助色</h3>
              <p className="text-sm opacity-90">#0ea5e9</p>
            </div>

            <div className="bg-card border-2 border-tech p-6 rounded-xl text-center shadow-tech">
              <h3 className="font-bold mb-2 text-foreground ">卡片背景</h3>
              <p className="text-sm text-muted-foreground">#ffffff</p>
            </div>
          </div>
        </section>

        {/* 字体展示 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 ">
            字体系统展示
          </h2>
          <DashboardCard>
            <div className="space-y-4">
              <div className="font-rubik-black text-4xl metric-highlight">
                Rubik Black - 舆情监控系统
              </div>
              <div className="font-rubik-bold text-2xl text-foreground ">
                Rubik Bold - 数据可视化大屏
              </div>
              <div className="font-rubik-semibold text-lg text-muted-foreground ">
                Rubik Semibold - 实时监控与智能分析
              </div>
              <div className="font-rubik-medium text-base text-muted-foreground ">
                Rubik Medium - 为企业和机构提供专业的舆情分析服务
              </div>
              <div className="font-rubik-regular text-sm text-muted-foreground ">
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
