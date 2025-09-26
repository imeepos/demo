import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerGetExecutionsByAgent,
  type AgentExecutionControllerGetExecutionsByAgentData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionGetExecutionsByAgent = (
  data: AgentExecutionControllerGetExecutionsByAgentData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agentExecution.byAgent(String(data.path.agentId)),
    queryFn: async () => {
      const response = await agentExecutionControllerGetExecutionsByAgent(data);
      return response.data;
    },
    enabled: !!data.path.agentId,
    ...config,
  });
};
