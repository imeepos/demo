import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerFindExecutions,
  type AgentExecutionControllerFindExecutionsData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionFindExecutions = (
  options?: AgentExecutionControllerFindExecutionsData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.agentExecution.list(queryParams),
    queryFn: async () => {
      const response =
        await agentExecutionControllerFindExecutions(queryParams);
      return response.data;
    },
    ...config,
  });
};
