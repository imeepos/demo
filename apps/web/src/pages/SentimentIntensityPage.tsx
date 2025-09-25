import { Button, Card } from '@sker/ui';
import { Plus } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { SentimentIntensityDialog } from '../components/sentiment-intensity/SentimentIntensityDialog';
import { SentimentIntensityList } from '../components/sentiment-intensity/SentimentIntensityList';
import { SentimentIntensitySearchForm } from '../components/sentiment-intensity/SentimentIntensitySearchForm';
import {
  useCreateSentimentIntensity,
  useDeleteSentimentIntensity,
  useSentimentIntensityList,
  useSentimentIntensitySearch,
  useUpdateSentimentIntensity,
} from '../hooks/use-sentiment-intensity';
import { useSentimentIntensityStore } from '../stores/sentiment-intensity-store';
import type {
  CreateSentimentIntensityInput,
  SearchSentimentIntensityInput,
} from '../types/sentiment-intensity';

export const SentimentIntensityPage: React.FC = () => {
  const {
    // 状态
    searchTitle,
    searchIntensity,
    isCreateDialogOpen,
    isEditDialogOpen,
    editingItem,

    // 搜索 Actions
    setSearchTitle,
    setSearchIntensity,
    clearSearch,

    // 对话框 Actions
    openCreateDialog,
    closeCreateDialog,
    openEditDialog,
    closeEditDialog,
  } = useSentimentIntensityStore();

  // 查询
  const { data: listData = [], isLoading: isListLoading } = useSentimentIntensityList();

  const searchParams = {
    title: searchTitle || undefined,
    intensity: searchIntensity || undefined,
  };

  const { data: searchData = [], isLoading: isSearchLoading } =
    useSentimentIntensitySearch(searchParams);

  // 突变
  const createMutation = useCreateSentimentIntensity();
  const updateMutation = useUpdateSentimentIntensity();
  const deleteMutation = useDeleteSentimentIntensity();

  // 判断是否在搜索模式
  const isSearchMode = !!(searchTitle || searchIntensity !== null);
  const displayData = isSearchMode ? searchData : listData;
  const isLoading = isSearchMode ? isSearchLoading : isListLoading;

  // 处理搜索
  const handleSearch = (params: SearchSentimentIntensityInput) => {
    setSearchTitle(params.title || '');
    setSearchIntensity(params.intensity ?? null);
  };

  // 处理清除搜索
  const handleClearSearch = () => {
    clearSearch();
  };

  // 处理创建
  const handleCreate = async (data: CreateSentimentIntensityInput) => {
    try {
      await createMutation.mutateAsync(data);
      closeCreateDialog();
      toast.success('情感强度创建成功');
    } catch (error) {
      toast.error('创建失败，请稍后重试');
      console.error('Create error:', error);
    }
  };

  // 处理更新
  const handleUpdate = async (data: CreateSentimentIntensityInput) => {
    if (!editingItem) return;

    try {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        data,
      });
      closeEditDialog();
      toast.success('情感强度更新成功');
    } catch (error) {
      toast.error('更新失败，请稍后重试');
      console.error('Update error:', error);
    }
  };

  // 处理删除
  const handleDelete = async (item: typeof editingItem) => {
    if (!item) return;

    if (window.confirm(`确定要删除"${item.title}"吗？此操作不可撤销。`)) {
      try {
        await deleteMutation.mutateAsync(item.id);
        toast.success('情感强度删除成功');
      } catch (error) {
        toast.error('删除失败，请稍后重试');
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 页面标题和操作按钮 */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">情感强度管理</h1>
            <p className="text-gray-600">管理系统中的情感强度定义，用于情感分析和舆情监控。</p>
          </div>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            新建情感强度
          </Button>
        </div>
      </Card>

      {/* 搜索表单 */}
      <SentimentIntensitySearchForm onSearch={handleSearch} onClear={handleClearSearch} />

      {/* 搜索结果提示 */}
      {isSearchMode && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-sm text-blue-800">
            {isSearchLoading ? (
              '搜索中...'
            ) : (
              <>
                搜索结果：共找到 {displayData.length} 条记录
                {searchTitle && <span className="ml-2">标题包含&quot;{searchTitle}&quot;</span>}
                {searchIntensity !== null && (
                  <span className="ml-2">强度值为{searchIntensity}</span>
                )}
              </>
            )}
          </div>
        </Card>
      )}

      {/* 列表 */}
      <SentimentIntensityList
        items={displayData}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      {/* 创建对话框 */}
      <SentimentIntensityDialog
        isOpen={isCreateDialogOpen}
        onClose={closeCreateDialog}
        onSubmit={handleCreate}
        isSubmitting={createMutation.isPending}
        title="新建情感强度"
      />

      {/* 编辑对话框 */}
      <SentimentIntensityDialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        onSubmit={handleUpdate}
        initialData={editingItem}
        isSubmitting={updateMutation.isPending}
        title="编辑情感强度"
      />
    </div>
  );
};
