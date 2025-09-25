import { Button } from '@sker/ui';
import { Plus, RefreshCw, Calendar, BarChart3, Activity } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardCard, MetricCard, MetricValue, MetricLabel, LiveIndicator } from '../components/dashboard/DashboardComponents';
import { SentimentEventDialog } from '../components/sentiment-event/SentimentEventDialog';
import { SentimentEventList } from '../components/sentiment-event/SentimentEventList';
import { SentimentEventSearchForm } from '../components/sentiment-event/SentimentEventSearchForm';
import {
  useCreateSentimentEvent,
  useDeleteSentimentEvent,
  useSentimentEvents,
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

  // 使用 findAll 而不是 search 以确保返回的数据包含 id
  const { data: items = [], isLoading, refetch } = useSentimentEvents();
  const createMutation = useCreateSentimentEvent();
  const updateMutation = useUpdateSentimentEvent();
  const deleteMutation = useDeleteSentimentEvent();

  const handleSearch = (params: QuerySentimentEventInput) => {
    // TODO: 搜索功能由于API类型不一致问题暂时禁用
    console.log('Search functionality temporarily disabled due to API type inconsistency:', params);
    // setSearchParams(params);
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
    <div className="dashboard-container min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 页面标题和状态 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black metric-highlight mb-4">
            舆情事件管理系统
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <LiveIndicator status="online" />
            <span className="text-muted-foreground">事件数据管理 · 实时监控</span>
          </div>
        </div>

        {/* 数据概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard variant="primary" className="animate-card-float">
            <MetricCard variant="primary">
              <MetricLabel>事件总数</MetricLabel>
              <MetricValue variant="primary" size="lg" className="data-value">{items.length}</MetricValue>
              <div className="flex items-center gap-1 text-sm text-primary">
                <Calendar className="w-4 h-4" />
                个事件
              </div>
            </MetricCard>
          </DashboardCard>

          <DashboardCard variant="success">
            <MetricCard variant="success">
              <MetricLabel>正面事件</MetricLabel>
              <MetricValue variant="success" size="lg" className="data-value">
                {items.filter(item => (item.sentimentScore || 0) > 0.6).length}
              </MetricValue>
              <div className="flex items-center gap-1 text-sm text-success">
                <BarChart3 className="w-4 h-4" />
                高评分
              </div>
            </MetricCard>
          </DashboardCard>

          <DashboardCard variant="warning">
            <MetricCard variant="warning">
              <MetricLabel>待处理事件</MetricLabel>
              <MetricValue variant="warning" size="lg" className="data-value">
                {items.filter(item => (item.sentimentScore || 0) < 0.4).length}
              </MetricValue>
              <div className="flex items-center gap-1 text-sm text-warning">
                <Activity className="w-4 h-4" />
                需关注
              </div>
            </MetricCard>
          </DashboardCard>
        </div>

        {/* 操作按钮区域 */}
        <div className="flex justify-center gap-4 mb-8">
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
            className="bg-tech-gradient hover:shadow-tech-lg text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            新建舆情事件
          </Button>
        </div>

        <SentimentEventSearchForm
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isLoading}
        />

        {hasSearchParams && (
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
