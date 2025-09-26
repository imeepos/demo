import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerGetExecutionHistory,
  type AgentExecutionControllerGetExecutionHistoryData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionGetExecutionHistory = (
  data: AgentExecutionControllerGetExecutionHistoryData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agentExecution.history(String(data.path.agentCode)),
    queryFn: async () => {
      const response = await agentExecutionControllerGetExecutionHistory(data);
      return response.data;
    },
    enabled: !!data.path.agentCode,
    ...config,
  });
};
