import { useQuery } from '@tanstack/react-query';
import {
  agentControllerFindAll,
  type AgentControllerFindAllData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { PaginatedResponse, QueryConfig } from '../types';

export const useQueryAgentFindAll = (
  options?: AgentControllerFindAllData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.agent.list(queryParams),
    queryFn: async (): Promise<PaginatedResponse | undefined> => {
      const response = await agentControllerFindAll(queryParams);
      return response.data;
    },
    ...config,
  });
};
