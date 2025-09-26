import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sentimentEventControllerUpdate,
  type SentimentEventControllerUpdateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationSentimentEventUpdate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SentimentEventControllerUpdateData) => {
      const response = await sentimentEventControllerUpdate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentimentEvent.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.sentimentEvent.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
