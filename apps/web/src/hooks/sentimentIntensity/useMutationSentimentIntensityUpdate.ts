import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sentimentIntensityControllerUpdate,
  type SentimentIntensityControllerUpdateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationSentimentIntensityUpdate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SentimentIntensityControllerUpdateData) => {
      const response = await sentimentIntensityControllerUpdate(data);
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
