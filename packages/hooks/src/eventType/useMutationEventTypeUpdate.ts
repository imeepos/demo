import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  eventTypeControllerUpdate,
  type EventTypeControllerUpdateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationEventTypeUpdate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventTypeControllerUpdateData) => {
      const response = await eventTypeControllerUpdate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventType.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.eventType.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
