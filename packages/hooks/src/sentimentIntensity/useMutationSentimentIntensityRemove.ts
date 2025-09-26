import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sentimentIntensityControllerRemove,
  type SentimentIntensityControllerRemoveData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationSentimentIntensityRemove = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SentimentIntensityControllerRemoveData) => {
      const response = await sentimentIntensityControllerRemove(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.sentimentIntensity.all,
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
