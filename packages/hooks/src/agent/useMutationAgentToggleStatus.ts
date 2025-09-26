import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentControllerToggleStatus,
  type AgentControllerToggleStatusData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentToggleStatus = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentControllerToggleStatusData) => {
      const response = await agentControllerToggleStatus(data);
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
