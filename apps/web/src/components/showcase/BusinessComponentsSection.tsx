/**
 * 业务组件展示区域
 * 职责：展示舆情系统专用的业务组件和元素组件
 */

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Separator,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Alert,
  AlertDescription,
  AlertTitle,
} from '@sker/ui';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MessageCircle,
  Heart,
  Share,
  Eye,
  Flag,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { mockSentimentData } from '../../data/showcaseData';

// 模拟组件实现，用于展示设计效果
const MockSentimentIndicator = ({ sentiment, score, confidence }: any) => (
  <div className="flex items-center gap-2 p-2 border rounded">
    <div
      className={`w-3 h-3 rounded-full ${
        sentiment === 'positive'
          ? 'bg-green-500'
          : sentiment === 'negative'
            ? 'bg-red-500'
            : 'bg-gray-500'
      }`}
    />
    <span className="text-sm font-medium">
      {sentiment === 'positive'
        ? '正面'
        : sentiment === 'negative'
          ? '负面'
          : '中性'}
    </span>
    <span className="text-xs text-muted-foreground">
      {score.toFixed(2)} ({(confidence * 100).toFixed(0)}%)
    </span>
  </div>
);

const MockStatusIndicator = ({ status, size = 'md' }: any) => (
  <div
    className={`rounded-full ${
      size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
    } ${
      status === 'pending'
        ? 'bg-yellow-500'
        : status === 'processing'
          ? 'bg-blue-500'
          : status === 'completed'
            ? 'bg-green-500'
            : 'bg-red-500'
    }`}
  />
);

const MockSourceTag = ({ source, count, variant = 'default' }: any) => (
  <Badge
    variant={variant === 'filled' ? 'default' : 'outline'}
    className="flex items-center gap-1"
  >
    <MessageCircle className="h-3 w-3" />
    {source === 'weibo'
      ? '微博'
      : source === 'wechat'
        ? '微信'
        : source === 'news'
          ? '新闻'
          : '论坛'}
    {count && <span className="text-xs">({count})</span>}
  </Badge>
);

const MockUrgencyLevel = ({ level, showLabel }: any) => (
  <div className="flex items-center gap-1">
    <div
      className={`w-2 h-2 rounded-full ${
        level === 'low'
          ? 'bg-green-500'
          : level === 'medium'
            ? 'bg-yellow-500'
            : level === 'high'
              ? 'bg-orange-500'
              : 'bg-red-500'
      }`}
    />
    {showLabel && (
      <span className="text-xs">
        {level === 'low'
          ? '低'
          : level === 'medium'
            ? '中'
            : level === 'high'
              ? '高'
              : '紧急'}
      </span>
    )}
  </div>
);

const MockTrendArrow = ({ direction }: any) => (
  <div className="flex items-center">
    {direction === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : direction === 'down' ? (
      <TrendingDown className="h-4 w-4 text-red-500" />
    ) : (
      <Minus className="h-4 w-4 text-gray-500" />
    )}
  </div>
);

const MockTimelineMarker = ({
  type,
  timestamp,
  title,
  description,
  size = 'md',
}: any) => (
  <div className="flex items-start gap-3">
    <div
      className={`rounded-full flex items-center justify-center ${
        size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
      } ${
        type === 'event'
          ? 'bg-blue-100 text-blue-600'
          : type === 'milestone'
            ? 'bg-green-100 text-green-600'
            : type === 'alert'
              ? 'bg-red-100 text-red-600'
              : 'bg-yellow-100 text-yellow-600'
      }`}
    >
      <Clock
        className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`}
      />
    </div>
    {(title || description) && (
      <div className="flex-1">
        {timestamp && (
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        )}
        {title && <div className="text-sm font-medium">{title}</div>}
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    )}
  </div>
);

const MockQuickActionButton = ({
  icon,
  label,
  variant = 'default',
  size = 'md',
  onClick,
}: any) => (
  <Button
    variant={
      variant === 'outline'
        ? 'outline'
        : variant === 'ghost'
          ? 'ghost'
          : 'default'
    }
    size={size}
    onClick={onClick}
    className="flex items-center gap-1"
  >
    {icon === 'eye' && <Eye className="h-4 w-4" />}
    {icon === 'heart' && <Heart className="h-4 w-4" />}
    {icon === 'share' && <Share className="h-4 w-4" />}
    {icon === 'flag' && <Flag className="h-4 w-4" />}
    {label && <span className="sr-only">{label}</span>}
  </Button>
);

export function BusinessComponentsSection() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* 组件概述说明 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>业务组件展示</AlertTitle>
        <AlertDescription>
          以下展示的是舆情系统专用的业务组件设计效果。这些组件正在开发中，当前展示为设计预览版本。
        </AlertDescription>
      </Alert>

      {/* 情感指示器区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            情感指示器
          </CardTitle>
          <CardDescription>
            展示不同情感状态和置信度的视觉指示器
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">正面情感</h4>
              <div className="space-y-3">
                <MockSentimentIndicator
                  sentiment="positive"
                  score={0.85}
                  confidence={0.92}
                />
                <MockSentimentIndicator
                  sentiment="positive"
                  score={0.72}
                  confidence={0.88}
                />
                <MockSentimentIndicator
                  sentiment="positive"
                  score={0.95}
                  confidence={0.96}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">负面情感</h4>
              <div className="space-y-3">
                <MockSentimentIndicator
                  sentiment="negative"
                  score={-0.65}
                  confidence={0.89}
                />
                <MockSentimentIndicator
                  sentiment="negative"
                  score={-0.78}
                  confidence={0.94}
                />
                <MockSentimentIndicator
                  sentiment="negative"
                  score={-0.45}
                  confidence={0.82}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">中性情感</h4>
              <div className="space-y-3">
                <MockSentimentIndicator
                  sentiment="neutral"
                  score={0.05}
                  confidence={0.75}
                />
                <MockSentimentIndicator
                  sentiment="neutral"
                  score={-0.15}
                  confidence={0.68}
                />
                <MockSentimentIndicator
                  sentiment="neutral"
                  score={0.12}
                  confidence={0.85}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 状态指示器区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            状态指示器
          </CardTitle>
          <CardDescription>监控任务和数据处理状态的可视化展示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <MockStatusIndicator status="pending" />
              <span className="text-sm text-muted-foreground">待处理</span>
            </div>
            <div className="text-center space-y-2">
              <MockStatusIndicator status="processing" />
              <span className="text-sm text-muted-foreground">处理中</span>
            </div>
            <div className="text-center space-y-2">
              <MockStatusIndicator status="completed" />
              <span className="text-sm text-muted-foreground">已完成</span>
            </div>
            <div className="text-center space-y-2">
              <MockStatusIndicator status="alert" />
              <span className="text-sm text-muted-foreground">警报</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">不同尺寸</h4>
            <div className="flex items-center gap-4">
              <MockStatusIndicator status="completed" size="sm" />
              <MockStatusIndicator status="processing" size="md" />
              <MockStatusIndicator status="alert" size="lg" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 数据源标签区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            数据源标签
          </CardTitle>
          <CardDescription>不同社交媒体和数据源的标识标签</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <MockSourceTag source="weibo" count={1234} />
            <MockSourceTag source="wechat" count={856} />
            <MockSourceTag source="news" count={423} />
            <MockSourceTag source="forum" count={167} />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">不同样式</h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <MockSourceTag source="weibo" variant="filled" />
                <MockSourceTag source="wechat" variant="outline" />
                <MockSourceTag source="news" variant="ghost" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 紧急程度指示器区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            紧急程度指示器
          </CardTitle>
          <CardDescription>事件紧急程度的可视化分级展示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <MockUrgencyLevel level="low" />
              <span className="text-sm text-muted-foreground">低</span>
            </div>
            <div className="text-center space-y-2">
              <MockUrgencyLevel level="medium" />
              <span className="text-sm text-muted-foreground">中</span>
            </div>
            <div className="text-center space-y-2">
              <MockUrgencyLevel level="high" />
              <span className="text-sm text-muted-foreground">高</span>
            </div>
            <div className="text-center space-y-2">
              <MockUrgencyLevel level="critical" />
              <span className="text-sm text-muted-foreground">紧急</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">带文本标签</h4>
            <div className="space-y-2">
              <MockUrgencyLevel level="low" showLabel />
              <MockUrgencyLevel level="medium" showLabel />
              <MockUrgencyLevel level="high" showLabel />
              <MockUrgencyLevel level="critical" showLabel />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 趋势箭头区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            趋势指示器
          </CardTitle>
          <CardDescription>数据趋势变化的方向性指示器</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <MockTrendArrow direction="up" />
              <span className="text-sm text-muted-foreground">上升趋势</span>
            </div>
            <div className="text-center space-y-2">
              <MockTrendArrow direction="down" />
              <span className="text-sm text-muted-foreground">下降趋势</span>
            </div>
            <div className="text-center space-y-2">
              <MockTrendArrow direction="stable" />
              <span className="text-sm text-muted-foreground">稳定趋势</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">带数值变化</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MockTrendArrow direction="up" />
                <span className="text-sm font-medium text-green-600">
                  +15.3%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MockTrendArrow direction="down" />
                <span className="text-sm font-medium text-red-600">-8.7%</span>
              </div>
              <div className="flex items-center gap-2">
                <MockTrendArrow direction="stable" />
                <span className="text-sm font-medium text-gray-600">±0.2%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 时间线标记区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            时间线标记
          </CardTitle>
          <CardDescription>事件时间轴上的关键节点标记</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <MockTimelineMarker
              type="event"
              timestamp="10:30"
              title="负面评论激增"
              description="检测到相关话题负面情绪明显上升"
            />
            <MockTimelineMarker
              type="milestone"
              timestamp="11:15"
              title="危机处理响应"
              description="客服团队开始积极回应用户关切"
            />
            <MockTimelineMarker
              type="alert"
              timestamp="12:00"
              title="媒体关注"
              description="主流媒体开始报道相关事件"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">不同类型标记</h4>
            <div className="flex flex-wrap gap-4">
              <MockTimelineMarker type="event" size="sm" />
              <MockTimelineMarker type="milestone" size="md" />
              <MockTimelineMarker type="alert" size="lg" />
              <MockTimelineMarker type="warning" size="md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速操作按钮区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            快速操作按钮
          </CardTitle>
          <CardDescription>常用功能的快速访问按钮</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <MockQuickActionButton
              icon="eye"
              label="查看详情"
              onClick={() => setSelectedItem('detail')}
            />
            <MockQuickActionButton
              icon="heart"
              label="关注"
              onClick={() => setSelectedItem('follow')}
            />
            <MockQuickActionButton
              icon="share"
              label="分享"
              onClick={() => setSelectedItem('share')}
            />
            <MockQuickActionButton
              icon="flag"
              label="标记"
              onClick={() => setSelectedItem('flag')}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">不同样式和尺寸</h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <MockQuickActionButton icon="eye" variant="default" size="sm" />
                <MockQuickActionButton
                  icon="heart"
                  variant="outline"
                  size="md"
                />
                <MockQuickActionButton icon="share" variant="ghost" size="lg" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 综合应用示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            综合应用示例
          </CardTitle>
          <CardDescription>
            真实舆情数据展示中的业务组件组合使用
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockSentimentData.map(item => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{item.author[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{item.author}</span>
                    <MockSourceTag source={item.source} />
                    <MockStatusIndicator status={item.status} size="sm" />
                    <MockUrgencyLevel level={item.urgency} />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <MockSentimentIndicator
                        sentiment={item.sentiment}
                        score={item.score}
                        confidence={item.confidence}
                      />
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {item.region}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.publishTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MockQuickActionButton icon="eye" size="sm" />
                      <MockQuickActionButton icon="heart" size="sm" />
                      <MockQuickActionButton icon="share" size="sm" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.keywords.map(keyword => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="text-xs"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
