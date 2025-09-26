import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentControllerRemove,
  type AgentControllerRemoveData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentRemove = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentControllerRemoveData) => {
      const response = await agentControllerRemove(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agent.all });
      queryClient.removeQueries({
        queryKey: queryKeys.agent.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
