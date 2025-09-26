import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentExecutionControllerBatchExecute,
  type AgentExecutionControllerBatchExecuteData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentExecutionBatchExecute = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentExecutionControllerBatchExecuteData) => {
      const response = await agentExecutionControllerBatchExecute(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agentExecution.all });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
