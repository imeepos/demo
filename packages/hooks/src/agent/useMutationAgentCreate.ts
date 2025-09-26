import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentControllerCreate,
  type AgentControllerCreateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentCreate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentControllerCreateData) => {
      const response = await agentControllerCreate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agent.all });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
