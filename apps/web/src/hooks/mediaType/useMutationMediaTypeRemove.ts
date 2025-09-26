import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mediaTypeControllerRemove,
  type MediaTypeControllerRemoveData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationMediaTypeRemove = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MediaTypeControllerRemoveData) => {
      const response = await mediaTypeControllerRemove(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaType.all });
      queryClient.removeQueries({
        queryKey: queryKeys.mediaType.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
