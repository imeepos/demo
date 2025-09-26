import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mediaTypeControllerUpdate,
  type MediaTypeControllerUpdateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationMediaTypeUpdate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MediaTypeControllerUpdateData) => {
      const response = await mediaTypeControllerUpdate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaType.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.mediaType.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
