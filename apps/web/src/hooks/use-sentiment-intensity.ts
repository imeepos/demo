import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  sentimentIntensityControllerFindAll,
  sentimentIntensityControllerCreate,
  sentimentIntensityControllerUpdate,
  sentimentIntensityControllerRemove,
  sentimentIntensityControllerSearch,
  client
} from '@sker/sdk';
import type { 
  CreateSentimentIntensityInput, 
  SearchSentimentIntensityInput,
  SentimentIntensityItem 
} from '../types/sentiment-intensity';

// 配置 SDK 客户端
client.setConfig({
  baseUrl: 'http://localhost:3000',
});

// Query Keys
export const sentimentIntensityKeys = {
  all: ['sentiment-intensity'] as const,
  lists: () => [...sentimentIntensityKeys.all, 'list'] as const,
  search: (params: SearchSentimentIntensityInput) => 
    [...sentimentIntensityKeys.all, 'search', params] as const,
};

// 获取所有情感强度记录
export const useSentimentIntensityList = () => {
  return useQuery({
    queryKey: sentimentIntensityKeys.lists(),
    queryFn: async () => {
      const response = await sentimentIntensityControllerFindAll();
      return response.data as SentimentIntensityItem[];
    },
  });
};

// 搜索情感强度记录
export const useSentimentIntensitySearch = (params: SearchSentimentIntensityInput) => {
  return useQuery({
    queryKey: sentimentIntensityKeys.search(params),
    queryFn: async () => {
      const response = await sentimentIntensityControllerSearch({
        query: {
          title: params.title,
          intensity: params.intensity,
        },
      });
      return response.data as SentimentIntensityItem[];
    },
    enabled: !!(params.title || params.intensity !== undefined),
  });
};

// 创建情感强度记录
export const useCreateSentimentIntensity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateSentimentIntensityInput) => {
      const response = await sentimentIntensityControllerCreate({
        body: data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentimentIntensityKeys.lists() });
    },
  });
};

// 更新情感强度记录
export const useUpdateSentimentIntensity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CreateSentimentIntensityInput> }) => {
      const response = await sentimentIntensityControllerUpdate({
        path: { id: id.toString() },
        body: data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentimentIntensityKeys.lists() });
    },
  });
};

// 删除情感强度记录
export const useDeleteSentimentIntensity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await sentimentIntensityControllerRemove({
        path: { id: id.toString() },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentimentIntensityKeys.lists() });
    },
  });
};