import { useQuery } from '@tanstack/react-query';
import {
  agentControllerGetStats,
  type AgentControllerGetStatsData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentGetStats = (
  data: AgentControllerGetStatsData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agent.stats(String(data.path.id)),
    queryFn: async () => {
      const response = await agentControllerGetStats(data);
      return response.data;
    },
    enabled: !!data.path.id,
    ...config,
  });
};
