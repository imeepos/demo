import { Button } from '@sker/ui';
import { Plus, Settings, TrendingUp } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import {
  DashboardCard,
  LiveIndicator,
  MetricCard,
  MetricLabel,
  MetricValue,
} from '../components/dashboard/DashboardComponents';
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
    searchMinIntensity,
    searchMaxIntensity,
    isCreateDialogOpen,
    isEditDialogOpen,
    editingItem,

    // 搜索 Actions
    setSearchTitle,
    setSearchMinIntensity,
    setSearchMaxIntensity,
    clearSearch,

    // 对话框 Actions
    openCreateDialog,
    closeCreateDialog,
    openEditDialog,
    closeEditDialog,
  } = useSentimentIntensityStore();

  // 查询
  const { data: listData = [], isLoading: isListLoading } =
    useSentimentIntensityList();

  const searchParams = {
    title: searchTitle || undefined,
    minIntensity: searchMinIntensity || undefined,
    maxIntensity: searchMaxIntensity || undefined,
  };

  const { data: searchData = [], isLoading: isSearchLoading } =
    useSentimentIntensitySearch(searchParams);

  // 突变
  const createMutation = useCreateSentimentIntensity();
  const updateMutation = useUpdateSentimentIntensity();
  const deleteMutation = useDeleteSentimentIntensity();

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
    <div className="dashboard-container min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 页面标题和操作区域 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black metric-highlight mb-4">
            情感强度管理系统
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <LiveIndicator status="online" />
            <span className="text-muted-foreground">
              配置参数管理 · 实时监控
            </span>
          </div>
        </div>

        {/* 系统概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard variant="primary" className="animate-card-float">
            <MetricCard variant="primary">
              <MetricLabel>总配置数量</MetricLabel>
              <MetricValue variant="primary" size="lg" className="data-value">
                {displayData.length}
              </MetricValue>
              <div className="flex items-center gap-1 text-sm text-primary">
                <Settings className="w-4 h-4" />
                个配置项
              </div>
            </MetricCard>
          </DashboardCard>

          <DashboardCard variant="success">
            <MetricCard variant="success">
              <MetricLabel>活跃配置</MetricLabel>
              <MetricValue variant="success" size="lg" className="data-value">
                {displayData.filter(item => item.isActive !== false).length}
              </MetricValue>
              <div className="flex items-center gap-1 text-sm text-success">
                <TrendingUp className="w-4 h-4" />
                正在使用
              </div>
            </MetricCard>
          </DashboardCard>

          <DashboardCard variant="warning">
            <MetricCard variant="warning">
              <MetricLabel>搜索结果</MetricLabel>
              <MetricValue variant="warning" size="lg" className="data-value">
                {isSearchMode ? displayData.length : '全部'}
              </MetricValue>
              <div className="flex items-center gap-1 text-sm text-warning">
                <span>当前显示</span>
              </div>
            </MetricCard>
          </DashboardCard>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={openCreateDialog}
            className="bg-tech-gradient hover:shadow-tech-lg text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            <Plus className="w-5 h-5 mr-2" />
            新建情感强度配置
          </Button>
        </div>

        {/* 搜索表单 */}
        <SentimentIntensitySearchForm
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {/* 搜索结果提示 */}
        {isSearchMode && (
          <DashboardCard className="mb-6">
            <div className="p-4 border-l-4 border-primary bg-primary/5">
              <div className="text-sm font-medium text-primary">
                {isSearchLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    搜索中...
                  </div>
                ) : (
                  <>
                    <div className="font-semibold mb-2">
                      🔍 搜索结果：共找到 {displayData.length} 条记录
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      {searchTitle && <div>• 标题包含："{searchTitle}"</div>}
                      {(searchMinIntensity !== null ||
                        searchMaxIntensity !== null) && (
                        <div>
                          • 强度范围：
                          {searchMinIntensity !== null &&
                          searchMaxIntensity !== null
                            ? `${searchMinIntensity} - ${searchMaxIntensity}`
                            : searchMinIntensity !== null
                              ? `≥ ${searchMinIntensity}`
                              : `≤ ${searchMaxIntensity}`}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </DashboardCard>
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
          title="新建情感强度配置"
        />

        {/* 编辑对话框 */}
        <SentimentIntensityDialog
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          onSubmit={handleUpdate}
          initialData={editingItem}
          isSubmitting={updateMutation.isPending}
          title="编辑情感强度配置"
        />
      </div>
    </div>
  );
};
