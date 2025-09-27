/**
 * 媒体类型管理页面
 *
 * 设计理念：
 * - 极致整洁的24列栅格布局
 * - 完美对称的视觉排版
 * - 一致的交互反馈体验
 * - 专业的数据展示规范
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../components/layout';
import { SimplePageHeader } from '../components/layout/SimplePageHeader';
import { MediaTypeDialog } from '../components/media-type/MediaTypeDialog';
import { MediaTypeList } from '../components/media-type/MediaTypeList';
import { MediaTypeSearchForm } from '../components/media-type/MediaTypeSearchForm';
import {
  useMutationMediaTypeCreate,
  useMutationMediaTypeRemove,
  useQueryMediaTypeFindAll,
  useQueryMediaTypeSearch,
  useMutationMediaTypeUpdate,
} from '../hooks';
import { useMediaTypeStore } from '../stores/media-type-store';
import type {
  CreateMediaTypeInput,
  SearchMediaTypeInput,
  MediaTypeItem,
} from '../types/media-type';

export const MediaTypePage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaTypeItem | null>(null);

  const { searchName, searchCode, setSearchName, setSearchCode, clearSearch } =
    useMediaTypeStore();

  // 数据查询
  const {
    data: listData = [],
    isLoading: isListLoading,
    refetch: refetchList,
  } = useQueryMediaTypeFindAll();

  const searchParams = {
    name: searchName || undefined,
    code: searchCode || undefined,
  };

  const {
    data: searchData = [],
    isLoading: isSearchLoading,
    refetch: refetchSearch,
  } = useQueryMediaTypeSearch({
    url: '/api/media-type/search',
    query: {
      ...(searchParams.name && { name: searchParams.name }),
      ...(searchParams.code && { code: searchParams.code }),
    },
  });

  // API 突变
  const createMutation = useMutationMediaTypeCreate();
  const updateMutation = useMutationMediaTypeUpdate();
  const deleteMutation = useMutationMediaTypeRemove();

  // 搜索状态计算
  const isSearchMode = !!(searchName || searchCode);
  const displayData = isSearchMode ? searchData : listData;
  const isLoading = isSearchMode ? isSearchLoading : isListLoading;

  // 处理搜索
  const handleSearch = (params: SearchMediaTypeInput) => {
    setSearchName(params.name || '');
    setSearchCode(params.code || '');
  };

  // 处理清除搜索
  const handleClearSearch = () => {
    clearSearch();
  };

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: MediaTypeItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: CreateMediaTypeInput) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({
          url: '/api/media-type/{id}',
          path: { id: editingItem.id.toString() },
          body: data,
        });
        toast.success('媒体类型更新成功');
      } else {
        await createMutation.mutateAsync({
          url: '/api/media-type',
          body: {
            code: data.code,
            name: data.name,
            ...(data.description && { description: data.description }),
          },
        });
        toast.success('媒体类型创建成功');
      }
      setDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      const message = editingItem ? '更新失败' : '创建失败';
      toast.error(message);
      console.error(error);
    }
  };

  const handleDelete = async (item: MediaTypeItem) => {
    if (!confirm(`确定要删除媒体类型"${item.name}"吗？`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        url: '/api/media-type/{id}',
        path: { id: item.id.toString() },
      });
      toast.success('媒体类型删除成功');
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
    <div className="min-h-full">
      <div className="max-w-6xl mx-auto p-6">
        {/* 页面头部 */}
        <SimplePageHeader
          title="媒体类型管理"
          description="精致管理媒体类型配置"
          primaryAction="+ 新建配置"
          onPrimaryAction={handleCreate}
        />

        {/* 精致搜索区域 */}
        <div className="mb-6">
          <MediaTypeSearchForm
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </div>

        {/* 美观数据区域 */}
        <div className="bg-card border border-border/40 rounded-xl shadow-sm">
          <MediaTypeList
            items={displayData}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* 对话框 */}
        <MediaTypeDialog
          isOpen={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          initialData={editingItem}
          isSubmitting={isSubmitting}
          title={editingItem ? '编辑媒体类型配置' : '新建媒体类型配置'}
        />
      </div>
    </div>
  );
};
