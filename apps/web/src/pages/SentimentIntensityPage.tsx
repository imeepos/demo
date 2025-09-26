import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@sker/ui';
import { DashboardLayout } from '../components/layout';
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
      {/* 极简优雅的容器 */}
      <div className="min-h-full">
        <div className="max-w-6xl mx-auto px-10 py-16">
          {/* 艺术级页面头部 */}
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-1.5 h-16 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-lg"></div>
                  <div>
                    <h1 className="text-3xl font-extralight text-slate-900 tracking-wide leading-tight">
                      情感强度管理
                    </h1>
                    <p className="text-slate-400 text-base font-light mt-3 tracking-wide">
                      精致管理情感数据配置
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium px-10 py-4 rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="text-sm">+ 新建配置</span>
              </Button>
            </div>
          </div>

          {/* 精致搜索区域 */}
          <div className="mb-12">
            <SentimentIntensitySearchForm
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </div>

          {/* 美观数据区域 */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/60">
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
