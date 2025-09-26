import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  eventTypeControllerCreate,
  type EventTypeControllerCreateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationEventTypeCreate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventTypeControllerCreateData) => {
      const response = await eventTypeControllerCreate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.eventType.all });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
