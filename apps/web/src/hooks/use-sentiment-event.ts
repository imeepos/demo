import {
  client,
  sentimentEventControllerCreate,
  sentimentEventControllerFindAll,
  sentimentEventControllerFindOne,
  sentimentEventControllerRemove,
  sentimentEventControllerSearch,
  sentimentEventControllerUpdate,
} from '@sker/sdk';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateSentimentEventInput,
  QuerySentimentEventInput,
  SentimentEvent,
  SentimentEventResponse,
  UpdateSentimentEventInput,
} from '../types/sentiment-event';

// 配置 SDK 客户端
client.setConfig({
  baseUrl: 'http://localhost:3011',
});

// Query Keys
export const sentimentEventKeys = {
  all: ['sentiment-event'] as const,
  lists: () => [...sentimentEventKeys.all, 'list'] as const,
  search: (params: QuerySentimentEventInput) =>
    [...sentimentEventKeys.all, 'search', params] as const,
  detail: (id: number) => [...sentimentEventKeys.all, 'detail', id] as const,
};

// 获取所有舆情事件（简化版）
export const useSentimentEvents = () => {
  return useQuery({
    queryKey: sentimentEventKeys.lists(),
    queryFn: async () => {
      const response = await sentimentEventControllerFindAll();
      return response.data as SentimentEventResponse[];
    },
  });
};

// 搜索舆情事件
export const useSearchSentimentEvents = (params: QuerySentimentEventInput) => {
  return useQuery({
    queryKey: sentimentEventKeys.search(params),
    queryFn: async () => {
      const response = await sentimentEventControllerSearch({
        query: {
          ...(params.title && { title: params.title }),
          ...(params.minScore !== undefined && { minScore: params.minScore }),
          ...(params.maxScore !== undefined && { maxScore: params.maxScore }),
          ...(params.startTime && { startTime: params.startTime.toISOString() }),
          ...(params.endTime && { endTime: params.endTime.toISOString() }),
        },
      });
      return response.data as SentimentEvent[];
    },
    enabled: !!(
      params.title ||
      params.minScore !== undefined ||
      params.maxScore !== undefined ||
      params.startTime ||
      params.endTime
    ),
  });
};

// 获取单个舆情事件详情
export const useSentimentEventById = (id: number | undefined) => {
  return useQuery({
    queryKey: sentimentEventKeys.detail(id!),
    queryFn: async () => {
      if (!id) throw new Error('ID is required');
      const response = await sentimentEventControllerFindOne({
        path: { id: id.toString() },
      });
      return response.data as SentimentEvent;
    },
    enabled: !!id,
  });
};

// 创建舆情事件
export const useCreateSentimentEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSentimentEventInput) => {
      const response = await sentimentEventControllerCreate({
        body: {
          title: data.title,
          score: data.score,
          latitude: data.latitude,
          longitude: data.longitude,
          source: data.source,
          timestamp: data.timestamp,
          ...(data.content && { content: data.content }),
          ...(data.address && { address: data.address }),
          ...(data.hotness !== undefined && { hotness: data.hotness }),
          ...(data.tags && data.tags.length > 0 && { tags: data.tags }),
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentimentEventKeys.lists() });
    },
  });
};

// 更新舆情事件
export const useUpdateSentimentEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateSentimentEventInput }) => {
      const response = await sentimentEventControllerUpdate({
        path: { id: id.toString() },
        body: {
          ...(data.title && { title: data.title }),
          ...(data.score !== undefined && { score: data.score }),
          ...(data.latitude !== undefined && { latitude: data.latitude }),
          ...(data.longitude !== undefined && { longitude: data.longitude }),
          ...(data.source && { source: data.source }),
          ...(data.timestamp && { timestamp: data.timestamp }),
          ...(data.content !== undefined && { content: data.content }),
          ...(data.address !== undefined && { address: data.address }),
          ...(data.hotness !== undefined && { hotness: data.hotness }),
          ...(data.tags !== undefined && { tags: data.tags }),
        },
      });
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: sentimentEventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sentimentEventKeys.detail(id) });
    },
  });
};

// 删除舆情事件
export const useDeleteSentimentEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await sentimentEventControllerRemove({
        path: { id: id.toString() },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentimentEventKeys.lists() });
    },
  });
};
