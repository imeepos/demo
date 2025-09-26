import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentControllerUpdate,
  type AgentControllerUpdateData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentUpdate = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentControllerUpdateData) => {
      const response = await agentControllerUpdate(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agent.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.agent.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
