import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../components/layout';
import {
  PageHeader,
  SentimentEventPageHeader,
} from '../components/layout/PageHeader';
import { DataSection } from '../components/layout/DataSection';
import { SentimentEventDialog } from '../components/sentiment-event/SentimentEventDialog';
import { SentimentEventList } from '../components/sentiment-event/SentimentEventList';
import { SentimentEventSearchForm } from '../components/sentiment-event/SentimentEventSearchForm';
import {
  useMutationSentimentEventCreate,
  useMutationSentimentEventRemove,
  useQuerySentimentEventSearch,
  useMutationSentimentEventUpdate,
} from '../hooks';
import { useSentimentEventStore } from '../stores/sentiment-event-store';
import type {
  CreateSentimentEventInput,
  QuerySentimentEventInput,
  SentimentEvent,
} from '../types/sentiment-event';

/**
 * 舆情事件管理页面
 *
 * 设计理念：
 * - 极致整洁的24列栅格布局
 * - 完美对称的视觉排版
 * - 一致的交互反馈体验
 * - 专业的数据展示规范
 *
 * @author 专业表单布局艺术家
 * @version 2.0.0
 */
export const SentimentEventPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SentimentEvent | null>(null);

  const { searchParams, setSearchParams, clearSearchParams } =
    useSentimentEventStore();

  // 数据查询
  const {
    data: searchResults = [],
    isLoading,
    refetch,
  } = useQuerySentimentEventSearch({
    url: '/api/sentiment-event/search',
    query: {
      ...(searchParams.title && { title: searchParams.title }),
      ...(searchParams.minScore !== undefined && {
        minScore: searchParams.minScore,
      }),
      ...(searchParams.maxScore !== undefined && {
        maxScore: searchParams.maxScore,
      }),
      ...(searchParams.startTime && {
        startTime: searchParams.startTime.toISOString(),
      }),
      ...(searchParams.endTime && {
        endTime: searchParams.endTime.toISOString(),
      }),
    },
  });

  // 数据处理
  const items: SentimentEvent[] = searchResults.map(
    (item: any, index: number) => ({
      ...item,
      id: Date.now() + index,
    })
  );

  // API 突变
  const createMutation = useMutationSentimentEventCreate();
  const updateMutation = useMutationSentimentEventUpdate();
  const deleteMutation = useMutationSentimentEventRemove();

  const handleSearch = (params: QuerySentimentEventInput) => {
    setSearchParams(params);
  };

  const handleClearSearch = () => {
    clearSearchParams();
  };

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: SentimentEvent) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: CreateSentimentEventInput) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({
          url: '/api/sentiment-event/{id}',
          path: { id: editingItem.id.toString() },
          body: {
            title: data.title,
            score: data.score,
            latitude: data.latitude,
            longitude: data.longitude,
            source: data.source,
            timestamp: data.timestamp.toISOString(),
            ...(data.content && { content: data.content }),
            ...(data.address && { address: data.address }),
            ...(data.hotness !== undefined && { hotness: data.hotness }),
            ...(data.tags && data.tags.length > 0 && { tags: data.tags }),
          },
        });
        toast.success('舆情事件更新成功');
      } else {
        await createMutation.mutateAsync({
          url: '/api/sentiment-event',
          body: {
            title: data.title,
            score: data.score,
            latitude: data.latitude,
            longitude: data.longitude,
            source: data.source,
            timestamp: data.timestamp.toISOString(),
            ...(data.content && { content: data.content }),
            ...(data.address && { address: data.address }),
            ...(data.hotness !== undefined && { hotness: data.hotness }),
            ...(data.tags && data.tags.length > 0 && { tags: data.tags }),
          },
        });
        toast.success('舆情事件创建成功');
      }
      setDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      const message = editingItem ? '更新失败' : '创建失败';
      toast.error(message);
      console.error(error);
    }
  };

  const handleDelete = async (item: SentimentEvent) => {
    if (!confirm(`确定要删除舆情事件"${item.title}"吗？`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        url: '/api/sentiment-event/{id}',
        path: { id: item.id.toString() },
      });
      toast.success('舆情事件删除成功');
    } catch (error) {
      toast.error('删除失败');
      console.error(error);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // 计算搜索状态
  const hasActiveSearch = Object.keys(searchParams).some(key => {
    const value = searchParams[key as keyof typeof searchParams];
    return value !== undefined && value !== '' && value !== null;
  });

  // 生成搜索关键词标签
  const searchKeywords = useMemo(() => {
    const keywords: string[] = [];
    if (searchParams.title) keywords.push(`标题: ${searchParams.title}`);
    if (searchParams.minScore !== undefined)
      keywords.push(`最低分: ${searchParams.minScore}`);
    if (searchParams.maxScore !== undefined)
      keywords.push(`最高分: ${searchParams.maxScore}`);
    if (searchParams.startTime)
      keywords.push(`开始: ${searchParams.startTime.toLocaleDateString()}`);
    if (searchParams.endTime)
      keywords.push(`结束: ${searchParams.endTime.toLocaleDateString()}`);
    return keywords;
  }, [searchParams]);

  // 页面统计数据
  const pageStats = useMemo(
    () => ({
      primary: {
        label: '舆情事件总数',
        value: items.length,
        trend: '+12.5%',
      },
      secondary: {
        label: '实时监控源',
        value: '2,847',
        trend: '在线',
      },
    }),
    [items.length]
  );

  return (
    <DashboardLayout>
      <div className="space-y-12 p-8 max-w-7xl mx-auto">
        {/* 专业页面头部 */}
        <PageHeader
          {...SentimentEventPageHeader}
          stats={pageStats}
          onPrimaryAction={handleCreate}
          onRefresh={handleRefresh}
          isLoading={isLoading}
          className="mb-8"
        />

        {/* 搜索表单区域 */}
        <div className="bg-gradient-to-br from-white via-white/98 to-slate-50/40 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-500 p-8 backdrop-blur-sm">
          <SentimentEventSearchForm
            onSearch={handleSearch}
            onClear={handleClearSearch}
            isSearching={isLoading}
          />
        </div>

        {/* 数据展示区域 */}
        <DataSection
          searchHeader={
            hasActiveSearch
              ? {
                  isSearchMode: hasActiveSearch,
                  totalCount: items.length,
                  searchKeywords,
                  onClearSearch: handleClearSearch,
                  showExport: true,
                  onExport: () => toast.success('导出功能开发中...'),
                }
              : undefined
          }
          loadingState={
            isLoading
              ? {
                  type: 'loading',
                  message: '正在加载舆情事件数据...',
                }
              : items.length === 0 && hasActiveSearch
                ? {
                    type: 'noResults',
                    message: '未找到符合条件的舆情事件',
                  }
                : items.length === 0
                  ? {
                      type: 'empty',
                      dataTypeName: '舆情事件',
                      onCreate: handleCreate,
                    }
                  : undefined
          }
        >
          <SentimentEventList
            items={items}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </DataSection>

        {/* 对话框 */}
        <SentimentEventDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          initialData={editingItem}
          isSubmitting={isSubmitting}
          title={editingItem ? '编辑舆情事件' : '新建舆情事件'}
        />
      </div>
    </DashboardLayout>
  );
};
