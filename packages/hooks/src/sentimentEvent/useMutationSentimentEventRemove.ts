import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sentimentEventControllerRemove,
  type SentimentEventControllerRemoveData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationSentimentEventRemove = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SentimentEventControllerRemoveData) => {
      const response = await sentimentEventControllerRemove(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentimentEvent.all });
      queryClient.removeQueries({
        queryKey: queryKeys.sentimentEvent.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
