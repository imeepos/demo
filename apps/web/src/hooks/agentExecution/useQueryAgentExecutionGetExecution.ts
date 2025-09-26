import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerGetExecution,
  type AgentExecutionControllerGetExecutionData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionGetExecution = (
  data: AgentExecutionControllerGetExecutionData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agentExecution.detail(String(data.path.id)),
    queryFn: async () => {
      const response = await agentExecutionControllerGetExecution(data);
      return response.data;
    },
    enabled: !!data.path.id,
    ...config,
  });
};
