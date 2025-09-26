import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  mediaTypeControllerCreate,
  type MediaTypeControllerCreateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationMediaTypeCreate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MediaTypeControllerCreateData) => {
      const response = await mediaTypeControllerCreate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mediaType.all });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
