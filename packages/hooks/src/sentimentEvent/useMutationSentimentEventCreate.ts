import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sentimentEventControllerCreate,
  type SentimentEventControllerCreateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationSentimentEventCreate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SentimentEventControllerCreateData) => {
      const response = await sentimentEventControllerCreate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentimentEvent.all });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
