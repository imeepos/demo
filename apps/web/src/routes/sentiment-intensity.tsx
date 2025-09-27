import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@sker/ui';
import { Plus, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardCard } from '../components/dashboard/DashboardComponents';
import { SentimentIntensityDialog } from '../components/sentiment-intensity/SentimentIntensityDialog';
import { SentimentIntensityList } from '../components/sentiment-intensity/SentimentIntensityList';
import { SentimentIntensitySearchForm } from '../components/sentiment-intensity/SentimentIntensitySearchForm';
import {
  useMutationSentimentIntensityCreate,
  useMutationSentimentIntensityRemove,
  useQuerySentimentIntensityFindAll,
  useQuerySentimentIntensitySearch,
  useMutationSentimentIntensityUpdate,
} from '../hooks';
import { useSentimentIntensityStore } from '../stores/sentiment-intensity-store';
import type {
  CreateSentimentIntensityInput,
  SearchSentimentIntensityInput,
  SentimentIntensityItem,
} from '../types/sentiment-intensity';

export const Route = createFileRoute('/sentiment-intensity')({
  component: SentimentIntensityPage,
});

function SentimentIntensityPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SentimentIntensityItem | null>(
    null
  );

  const {
    // 状态
    searchTitle,
    searchMinIntensity,
    searchMaxIntensity,

    // 搜索 Actions
    setSearchTitle,
    setSearchMinIntensity,
    setSearchMaxIntensity,
    clearSearch,
  } = useSentimentIntensityStore();

  // 查询
  const {
    data: listData = [],
    isLoading: isListLoading,
    refetch: refetchList,
  } = useQuerySentimentIntensityFindAll();

  const searchParams = {
    title: searchTitle || undefined,
    minIntensity: searchMinIntensity || undefined,
    maxIntensity: searchMaxIntensity || undefined,
  };

  const {
    data: searchData = [],
    isLoading: isSearchLoading,
    refetch: refetchSearch,
  } = useQuerySentimentIntensitySearch({
    url: '/api/sentiment-intensity/search',
    query: {
      ...(searchParams.title && { title: searchParams.title }),
      ...(searchParams.minIntensity !== undefined && {
        minIntensity: searchParams.minIntensity,
      }),
      ...(searchParams.maxIntensity !== undefined && {
        maxIntensity: searchParams.maxIntensity,
      }),
    },
  });

  // 突变
  const createMutation = useMutationSentimentIntensityCreate();
  const updateMutation = useMutationSentimentIntensityUpdate();
  const deleteMutation = useMutationSentimentIntensityRemove();

  // 判断是否在搜索模式
  const isSearchMode = !!(
    searchTitle ||
    searchMinIntensity !== null ||
    searchMaxIntensity !== null
  );
  const displayData = isSearchMode ? searchData : listData;
  const isLoading = isSearchMode ? isSearchLoading : isListLoading;

  // 处理搜索
  const handleSearch = (params: SearchSentimentIntensityInput) => {
    setSearchTitle(params.title || '');
    setSearchMinIntensity(params.minIntensity ?? null);
    setSearchMaxIntensity(params.maxIntensity ?? null);
  };

  // 处理清除搜索
  const handleClearSearch = () => {
    clearSearch();
  };

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: SentimentIntensityItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: CreateSentimentIntensityInput) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({
          url: '/api/sentiment-intensity/{id}',
          path: { id: editingItem.id.toString() },
          body: data,
        });
        toast.success('情感强度更新成功');
      } else {
        await createMutation.mutateAsync({
          url: '/api/sentiment-intensity',
          body: {
            title: data.title,
            intensity: data.intensity,
            ...(data.description && { description: data.description }),
          },
        });
        toast.success('情感强度创建成功');
      }
      setDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      const message = editingItem ? '更新失败' : '创建失败';
      toast.error(message);
      console.error(error);
    }
  };

  const handleDelete = async (item: SentimentIntensityItem) => {
    if (!confirm(`确定要删除情感强度"${item.title}"吗？`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        url: '/api/sentiment-intensity/{id}',
        path: { id: item.id.toString() },
      });
      toast.success('情感强度删除成功');
    } catch (error) {
      toast.error('删除失败');
      console.error(error);
    }
  };

  const handleRefresh = () => {
    if (isSearchMode) {
      refetchSearch();
    } else {
      refetchList();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // 检查是否有搜索参数用于显示搜索结果提示
  const hasActiveSearch = isSearchMode;

  return (
    <div className="dashboard-container p-2">
      <div className="w-full space-y-4">
        {/* 页面标题栏 - 左右布局 */}
        <div className="flex items-center justify-between mb-8">
          {/* 左侧：标题和简介 */}
          <div>
            <h1 className="text-2xl font-black metric-highlight mb-2">
              情感强度管理系统
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                配置参数管理 · 实时监控
              </span>
            </div>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
              className="border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
              />
              {isLoading ? '刷新中...' : '刷新数据'}
            </Button>

            <Button
              onClick={handleCreate}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 mr-2" />
              新建情感强度配置
            </Button>
          </div>
        </div>

        <SentimentIntensitySearchForm
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {hasActiveSearch && (
          <DashboardCard className="mb-6">
            <div className="p-4 border-l-4 border-primary bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  🔍 搜索结果：共找到 {displayData.length} 条记录
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  显示全部数据
                </Button>
              </div>
            </div>
          </DashboardCard>
        )}

        <SentimentIntensityList
          items={displayData}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <SentimentIntensityDialog
          isOpen={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          initialData={editingItem}
          isSubmitting={isSubmitting}
          title={editingItem ? '编辑情感强度配置' : '新建情感强度配置'}
        />
      </div>
    </div>
  );
}
