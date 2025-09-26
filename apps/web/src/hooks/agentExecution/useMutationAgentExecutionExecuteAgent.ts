import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  agentExecutionControllerExecuteAgent,
  type AgentExecutionControllerExecuteAgentData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { MutationConfig } from '../types';

export const useMutationAgentExecutionExecuteAgent = (config?: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AgentExecutionControllerExecuteAgentData) => {
      const response = await agentExecutionControllerExecuteAgent(data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agentExecution.all });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
