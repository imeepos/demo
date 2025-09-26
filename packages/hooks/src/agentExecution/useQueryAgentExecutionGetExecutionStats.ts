import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerGetExecutionStats,
  type AgentExecutionControllerGetExecutionStatsData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionGetExecutionStats = (
  data: AgentExecutionControllerGetExecutionStatsData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agentExecution.stats(String(data.path.agentCode)),
    queryFn: async () => {
      const response = await agentExecutionControllerGetExecutionStats(data);
      return response.data;
    },
    enabled: !!data.path.agentCode,
    ...config,
  });
};
