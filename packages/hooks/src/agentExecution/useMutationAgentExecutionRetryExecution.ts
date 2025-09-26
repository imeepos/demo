import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentExecutionControllerRetryExecution,
  type AgentExecutionControllerRetryExecutionData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentExecutionRetryExecution = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentExecutionControllerRetryExecutionData) => {
      const response = await agentExecutionControllerRetryExecution(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agentExecution.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.agentExecution.detail(String(variables.path.id)),
      });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
