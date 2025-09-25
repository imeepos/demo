import { Button } from '@sker/ui';
import { Plus, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { SentimentEventDialog } from '../components/sentiment-event/SentimentEventDialog';
import { SentimentEventList } from '../components/sentiment-event/SentimentEventList';
import { SentimentEventSearchForm } from '../components/sentiment-event/SentimentEventSearchForm';
import {
  useCreateSentimentEvent,
  useDeleteSentimentEvent,
  useSearchSentimentEvents,
  useUpdateSentimentEvent,
} from '../hooks/use-sentiment-event';
import { useSentimentEventStore } from '../stores/sentiment-event-store';
import type {
  CreateSentimentEventInput,
  QuerySentimentEventInput,
  SentimentEvent,
} from '../types/sentiment-event';

export const SentimentEventPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SentimentEvent | null>(null);

  const { searchParams, setSearchParams, clearSearchParams } = useSentimentEventStore();
  
  const { data: items = [], isLoading, refetch } = useSearchSentimentEvents(searchParams);
  const createMutation = useCreateSentimentEvent();
  const updateMutation = useUpdateSentimentEvent();
  const deleteMutation = useDeleteSentimentEvent();

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
          id: editingItem.id,
          data,
        });
        toast.success('舆情事件更新成功');
      } else {
        await createMutation.mutateAsync(data);
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
      await deleteMutation.mutateAsync(item.id);
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
  const hasSearchParams = Object.keys(searchParams).length > 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">舆情事件管理</h1>
          <p className="text-gray-600 mt-1">
            管理和监控舆情事件数据，支持创建、编辑、删除和搜索功能
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            新建舆情事件
          </Button>
        </div>
      </div>

      <SentimentEventSearchForm
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isLoading}
      />

      {hasSearchParams && (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md">
          <div className="text-sm text-blue-600">
            当前显示搜索结果，共找到 {items.length} 条记录
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearSearch}>
            显示全部
          </Button>
        </div>
      )}

      <SentimentEventList
        items={items}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SentimentEventDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        initialData={editingItem}
        isSubmitting={isSubmitting}
        title={editingItem ? '编辑舆情事件' : '新建舆情事件'}
      />
    </div>
  );
};