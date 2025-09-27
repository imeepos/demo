import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../components/layout';
import { SimplePageHeader } from '../components/layout/SimplePageHeader';
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

/**
 * 情感强度管理页面
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
export const SentimentIntensityPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SentimentIntensityItem | null>(
    null
  );

  const {
    searchTitle,
    searchMinIntensity,
    searchMaxIntensity,
    setSearchTitle,
    setSearchMinIntensity,
    setSearchMaxIntensity,
    clearSearch,
  } = useSentimentIntensityStore();

  // 数据查询
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

  // API 突变
  const createMutation = useMutationSentimentIntensityCreate();
  const updateMutation = useMutationSentimentIntensityUpdate();
  const deleteMutation = useMutationSentimentIntensityRemove();

  // 搜索状态计算
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

  return (
    <DashboardLayout>
      <div className="min-h-full">
        <div className="max-w-6xl mx-auto p-6">
          {/* 页面头部 */}
          <SimplePageHeader
            title="情感强度管理"
            description="精致管理情感数据配置"
            primaryAction="+ 新建配置"
            onPrimaryAction={handleCreate}
          />

          {/* 搜索区域 */}
          <div className="mb-6">
            <SentimentIntensitySearchForm
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </div>

          {/* 数据区域 */}
          <div className="bg-card border border-border/40 rounded-xl shadow-sm">
            <SentimentIntensityList
              items={displayData}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* 对话框 */}
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
    </DashboardLayout>
  );
};
