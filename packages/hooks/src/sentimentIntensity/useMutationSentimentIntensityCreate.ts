import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sentimentIntensityControllerCreate,
  type SentimentIntensityControllerCreateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationSentimentIntensityCreate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SentimentIntensityControllerCreateData) => {
      const response = await sentimentIntensityControllerCreate(data);
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
