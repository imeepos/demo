import { Button } from '@sker/ui';
import { Plus, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardCard, LiveIndicator } from '../components/dashboard/DashboardComponents';
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

  console.log('当前搜索参数:', searchParams);

  // 始终使用搜索接口，即使没有搜索参数也调用搜索接口（会返回所有数据）
  const { data: searchResults = [], isLoading, refetch } = useSearchSentimentEvents(searchParams);
  
  // 转换搜索结果，添加 id 字段（实际应用中 API 应该返回带 id 的数据）
  const items: SentimentEvent[] = searchResults.map((item, index) => ({
    ...item,
    id: Date.now() + index, // 临时 ID，实际应该由 API 返回
  }));
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
  
  // 检查是否有搜索参数用于显示搜索结果提示
  const hasActiveSearch = Object.keys(searchParams).some(key => {
    const value = searchParams[key as keyof typeof searchParams];
    return value !== undefined && value !== '' && value !== null;
  });

  return (
    <div className="dashboard-container min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 页面标题栏 - 左右布局 */}
        <div className="flex items-center justify-between mb-8">
          {/* 左侧：标题和简介 */}
          <div>
            <h1 className="text-2xl font-black metric-highlight mb-2">
              舆情事件管理系统
            </h1>
            <div className="flex items-center gap-2">
              <LiveIndicator status="online" />
              <span className="text-muted-foreground">事件数据管理 · 实时监控</span>
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
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? '刷新中...' : '刷新数据'}
            </Button>
            
            <Button 
              onClick={handleCreate}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Plus className="w-5 h-5 mr-2" />
              新建舆情事件
            </Button>
          </div>
        </div>

        <SentimentEventSearchForm
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isLoading}
        />

        {hasActiveSearch && (
          <DashboardCard className="mb-6">
            <div className="p-4 border-l-4 border-primary bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  🔍 搜索结果：共找到 {items.length} 条记录
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
    </div>
  );
};
