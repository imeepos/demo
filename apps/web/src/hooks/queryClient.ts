import { QueryClient } from '@tanstack/react-query';

// 创建 QueryClient 实例，配置全局设置
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据被认为是新鲜的时间（半分钟）
      staleTime: 0.5 * 60 * 1000,
      // 缓存时间（半分钟）
      gcTime: 0.5 * 60 * 1000,
      // 失败重试次数
      retry: 3,
      // 重试延迟
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // 窗口重新获得焦点时重新获取数据
      refetchOnWindowFocus: false,
      // 网络重连时重新获取数据
      refetchOnReconnect: true,
    },
    mutations: {
      // 失败重试次数
      retry: 1,
    },
  },
});
