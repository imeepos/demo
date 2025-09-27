import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../components/layout';
import { SimplePageHeader } from '../components/layout/SimplePageHeader';
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

  return (
    <DashboardLayout>
      <div className="min-h-full">
        <div className="max-w-6xl mx-auto p-6">
          {/* 页面头部 */}
          <SimplePageHeader
            title="舆情事件管理"
            description="实时监控和管理舆情事件数据"
            primaryAction="+ 新建舆情事件"
            onPrimaryAction={handleCreate}
          />

          {/* 搜索区域 */}
          <div className="mb-6">
            <SentimentEventSearchForm
              onSearch={handleSearch}
              onClear={handleClearSearch}
              isSearching={isLoading}
            />
          </div>

          {/* 数据区域 */}
          <div className="bg-card border border-border/40 rounded-xl shadow-sm">
            <SentimentEventList
              items={items}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

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
      </div>
    </DashboardLayout>
  );
};
