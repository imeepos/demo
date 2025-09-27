import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from '../components/layout';
import { SimplePageHeader } from '../components/layout/SimplePageHeader';
import { EventTypeDialog } from '../components/event-type/EventTypeDialog';
import { EventTypeList } from '../components/event-type/EventTypeList';
import { EventTypeSearchForm } from '../components/event-type/EventTypeSearchForm';
import {
  useQueryEventTypeFindAll,
  useQueryEventTypeSearch,
  useMutationEventTypeCreate,
  useMutationEventTypeUpdate,
  useMutationEventTypeRemove,
} from '../hooks/eventType';
import type {
  EventType,
  EventTypeCreateInput,
  EventTypeSearchParams,
} from '../types/event-type';

/**
 * 事件类型管理页面
 *
 * 设计理念：
 * - 极致简约的卡片布局
 * - 专业的颜色管理系统
 * - 直观的状态切换体验
 * - 高效的分类管理流程
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */
export const EventTypePage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventType | null>(null);
  const [searchParams, setSearchParams] = useState<EventTypeSearchParams>({});

  // 数据查询 - 根据搜索参数决定使用哪个查询
  const hasSearchParams = Object.keys(searchParams).some(key => {
    const value = searchParams[key as keyof EventTypeSearchParams];
    return value !== undefined && value !== '' && value !== null;
  });

  const {
    data: allEventTypes = [],
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useQueryEventTypeFindAll(
    !hasSearchParams ? {} : { config: { enabled: false } }
  );

  const {
    data: searchResults = [],
    isLoading: isLoadingSearch,
    refetch: refetchSearch,
  } = useQueryEventTypeSearch(
    hasSearchParams ? { ...searchParams } : { config: { enabled: false } }
  );

  const items: EventType[] = hasSearchParams ? searchResults : allEventTypes;
  const isLoading = hasSearchParams ? isLoadingSearch : isLoadingAll;

  // API 突变
  const createMutation = useMutationEventTypeCreate();
  const updateMutation = useMutationEventTypeUpdate();
  const deleteMutation = useMutationEventTypeRemove();

  const handleSearch = (params: EventTypeSearchParams) => {
    setSearchParams(params);
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: EventType) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: EventTypeCreateInput) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync({
          path: { id: editingItem.id.toString() },
          body: data,
        });
        toast.success('事件类型更新成功');
      } else {
        await createMutation.mutateAsync({
          body: data,
        });
        toast.success('事件类型创建成功');
      }
      setDialogOpen(false);
      setEditingItem(null);

      // 根据当前状态重新获取数据
      if (hasSearchParams) {
        refetchSearch();
      } else {
        refetchAll();
      }
    } catch (error) {
      const message = editingItem ? '更新失败' : '创建失败';
      toast.error(message);
      console.error(error);
    }
  };

  const handleDelete = async (item: EventType) => {
    if (!confirm(`确定要删除事件类型"${item.name}"吗？`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        path: { id: item.id.toString() },
      });
      toast.success('事件类型删除成功');

      // 根据当前状态重新获取数据
      if (hasSearchParams) {
        refetchSearch();
      } else {
        refetchAll();
      }
    } catch (error) {
      toast.error('删除失败');
      console.error(error);
    }
  };

  const handleToggleStatus = async (item: EventType) => {
    try {
      await updateMutation.mutateAsync({
        path: { id: item.id.toString() },
        body: {
          ...item,
          isActive: !item.isActive,
        },
      });
      toast.success(`事件类型已${!item.isActive ? '启用' : '禁用'}`);

      // 根据当前状态重新获取数据
      if (hasSearchParams) {
        refetchSearch();
      } else {
        refetchAll();
      }
    } catch (error) {
      toast.error('状态切换失败');
      console.error(error);
    }
  };

  const handleRefresh = () => {
    if (hasSearchParams) {
      refetchSearch();
    } else {
      refetchAll();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // 生成搜索关键词标签
  const searchKeywords = useMemo(() => {
    const keywords: string[] = [];
    if (searchParams.keyword) keywords.push(`关键词: ${searchParams.keyword}`);
    if (searchParams.isActive !== undefined) {
      keywords.push(`状态: ${searchParams.isActive ? '启用' : '禁用'}`);
    }
    if (searchParams.sortBy) {
      const sortLabels = {
        name: '名称',
        createdAt: '创建时间',
        sortOrder: '排序权重',
      };
      keywords.push(`排序: ${sortLabels[searchParams.sortBy]}`);
    }
    return keywords;
  }, [searchParams]);

  return (
    <div className="min-h-full">
      <div className="max-w-6xl mx-auto p-6">
        {/* 页面头部 */}
        <SimplePageHeader
          title="事件类型管理"
          description="管理舆情事件的分类体系，支持自定义颜色和排序"
          primaryAction="+ 新建事件类型"
          onPrimaryAction={handleCreate}
        />

        {/* 搜索区域 */}
        <div className="mb-6">
          <EventTypeSearchForm
            onSearch={handleSearch}
            onClear={handleClearSearch}
            isSearching={isLoading}
          />
        </div>

        {/* 数据区域 */}
        <div className="bg-card border border-border/40 rounded-xl shadow-sm">
          <EventTypeList
            items={items}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </div>

        {/* 对话框 */}
        <EventTypeDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
          initialData={editingItem}
          isSubmitting={isSubmitting}
          title={editingItem ? '编辑事件类型' : '新建事件类型'}
        />
      </div>
    </div>
  );
};
