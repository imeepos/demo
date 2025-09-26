import { Card, Button } from '@sker/ui';
import { cn } from '@sker/ui';
import {
  Search,
  Filter,
  RotateCcw,
  Database,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

/**
 * 专业数据展示区域组件
 *
 * 设计理念：
 * - 严格对称的数据排版
 * - 清晰的搜索状态反馈
 * - 一致的数据加载状态
 * - 优雅的空状态处理
 *
 * @author 专业表单布局艺术家
 * @version 1.0.0
 */

// ==================== 类型定义 ====================

interface SearchResultHeaderProps {
  /** 搜索模式 */
  isSearchMode: boolean;
  /** 结果总数 */
  totalCount: number;
  /** 当前搜索关键词 */
  searchKeywords?: string[];
  /** 清除搜索回调 */
  onClearSearch: () => void;
  /** 导出数据回调 */
  onExport?: () => void;
  /** 是否显示导出按钮 */
  showExport?: boolean;
}

interface DataLoadingStateProps {
  /** 加载状态类型 */
  type: 'loading' | 'empty' | 'error' | 'noResults';
  /** 自定义消息 */
  message?: string;
  /** 重试回调 */
  onRetry?: () => void;
  /** 创建数据回调 */
  onCreate?: () => void;
  /** 数据类型名称 */
  dataTypeName?: string;
}

interface DataSectionProps {
  /** 子组件 */
  children: React.ReactNode;
  /** 搜索结果头部配置 */
  searchHeader?: SearchResultHeaderProps;
  /** 加载状态配置 */
  loadingState?: DataLoadingStateProps;
  /** 额外样式 */
  className?: string;
}

// ==================== 样式配置 ====================

const SECTION_STYLES = cn(
  'space-y-6',
  'animate-in fade-in-0 slide-in-from-top-2 duration-500'
);

const SEARCH_HEADER_STYLES = cn(
  'bg-gradient-to-r from-slate-50/90 via-white/95 to-slate-50/90',
  'border border-slate-200/60 rounded-3xl',
  'backdrop-blur-lg shadow-sm',
  'hover:shadow-lg transition-all duration-500 ease-out',
  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
  'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
  'relative overflow-hidden'
);

const KEYWORD_TAG_STYLES = cn(
  'inline-flex items-center gap-2 px-4 py-2',
  'bg-slate-100/80 text-slate-700 border border-slate-200/60',
  'rounded-full text-sm font-medium',
  'hover:bg-slate-200/60 hover:scale-105 transition-all duration-300 ease-out',
  'backdrop-blur-sm shadow-sm hover:shadow-md'
);

const EMPTY_STATE_STYLES = cn(
  'text-center py-20 px-10',
  'bg-gradient-to-br from-slate-50/60 to-white/80',
  'border-2 border-dashed border-slate-300/40',
  'rounded-3xl backdrop-blur-sm',
  'hover:border-slate-400/50 transition-all duration-500'
);

const ACTION_BUTTON_STYLES = cn(
  'bg-gradient-to-r from-slate-900 to-slate-800',
  'hover:from-slate-800 hover:to-slate-700',
  'text-white font-semibold px-8 py-3.5',
  'rounded-2xl shadow-lg hover:shadow-xl hover:shadow-slate-900/25',
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-95',
  'transition-all duration-400 ease-out',
  'backdrop-blur-sm border border-slate-700/30'
);

// ==================== 子组件 ====================

function SearchResultHeader({
  isSearchMode,
  totalCount,
  searchKeywords = [],
  onClearSearch,
  onExport,
  showExport = false,
}: SearchResultHeaderProps) {
  if (!isSearchMode) return null;

  return (
    <Card className={SEARCH_HEADER_STYLES}>
      <div className="relative z-10 p-8">
        <div className="flex items-center justify-between">
          {/* 左侧：搜索结果信息 */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100/80 rounded-2xl border border-slate-200/60 backdrop-blur-sm">
                <Search className="h-6 w-6 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  搜索结果
                </h3>
                <p className="text-sm font-medium text-slate-600">
                  共找到{' '}
                  <span className="font-bold text-slate-900">{totalCount}</span>{' '}
                  条匹配记录
                </p>
              </div>
            </div>

            {/* 搜索关键词标签 */}
            {searchKeywords.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-slate-500">
                  搜索条件:
                </span>
                {searchKeywords.map((keyword, index) => (
                  <div key={index} className={KEYWORD_TAG_STYLES}>
                    <Filter className="h-4 w-4" />
                    <span>{keyword}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex items-center gap-4">
            {showExport && onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                className="border-slate-300/60 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400/60 rounded-2xl px-6 py-3 font-medium transition-all duration-400 ease-out hover:-translate-y-0.5 active:scale-95"
              >
                <Database className="h-4 w-4 mr-2" />
                导出数据
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onClearSearch}
              className="border-slate-300/60 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400/60 rounded-2xl px-6 py-3 font-medium transition-all duration-400 ease-out hover:-translate-y-0.5 active:scale-95"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              显示全部
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function DataLoadingState({
  type,
  message,
  onRetry,
  onCreate,
  dataTypeName = '数据',
}: DataLoadingStateProps) {
  const stateConfigs = {
    loading: {
      icon: Clock,
      title: '正在加载数据...',
      description: message || '请稍候，系统正在获取最新数据',
      iconColor: 'text-blue-600',
      showActions: false,
    },
    empty: {
      icon: Database,
      title: `暂无${dataTypeName}`,
      description:
        message || `系统中还没有任何${dataTypeName}，点击下方按钮开始创建`,
      iconColor: 'text-slate-500',
      showActions: true,
      primaryAction: '创建数据',
      primaryHandler: onCreate,
    },
    error: {
      icon: AlertCircle,
      title: '数据加载失败',
      description: message || '网络连接异常，请检查网络后重试',
      iconColor: 'text-red-500',
      showActions: true,
      primaryAction: '重新加载',
      primaryHandler: onRetry,
    },
    noResults: {
      icon: Eye,
      title: '未找到匹配结果',
      description: message || '请尝试调整搜索条件或清除筛选器',
      iconColor: 'text-amber-600',
      showActions: false,
    },
  };

  const config = stateConfigs[type];
  const Icon = config.icon;

  return (
    <Card>
      <div className={EMPTY_STATE_STYLES}>
        {/* 状态图标 */}
        <div className="mb-8">
          <div
            className={cn(
              'w-24 h-24 mx-auto rounded-full',
              'bg-gradient-to-br from-slate-100/80 to-white/60',
              'flex items-center justify-center',
              'border border-slate-200/60 backdrop-blur-sm',
              'shadow-sm hover:shadow-md transition-all duration-500',
              type === 'loading' && 'animate-pulse animate-bounce'
            )}
          >
            <Icon className={cn('h-12 w-12', config.iconColor)} />
          </div>
        </div>

        {/* 状态文本 */}
        <div className="space-y-4 mb-10">
          <h3 className="text-2xl font-bold text-slate-900">{config.title}</h3>
          <p className="text-slate-600 max-w-lg mx-auto leading-relaxed text-base">
            {config.description}
          </p>
        </div>

        {/* 操作按钮 */}
        {config.showActions && config.primaryHandler && (
          <Button
            onClick={config.primaryHandler}
            className={ACTION_BUTTON_STYLES}
          >
            {config.primaryAction}
          </Button>
        )}
      </div>
    </Card>
  );
}

// ==================== 主组件 ====================

export function DataSection({
  children,
  searchHeader,
  loadingState,
  className,
}: DataSectionProps) {
  return (
    <div className={cn(SECTION_STYLES, className)}>
      {/* 搜索结果头部 */}
      {searchHeader && <SearchResultHeader {...searchHeader} />}

      {/* 数据加载状态或内容 */}
      {loadingState ? (
        <DataLoadingState {...loadingState} />
      ) : (
        <div className="space-y-4">{children}</div>
      )}
    </div>
  );
}

// ==================== 导出子组件 ====================

export { SearchResultHeader, DataLoadingState };
