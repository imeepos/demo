import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  eventTypeControllerRemove,
  type EventTypeControllerRemoveData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationEventTypeRemove = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventTypeControllerRemoveData) => {
      const response = await eventTypeControllerRemove(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventType.all });
      queryClient.removeQueries({
        queryKey: queryKeys.eventType.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
