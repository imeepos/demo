import { useQuery } from '@tanstack/react-query';
import {
  agentControllerFindOne,
  type AgentControllerFindOneData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentFindOne = (
  data: AgentControllerFindOneData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agent.detail(String(data.path.id)),
    queryFn: async () => {
      const response = await agentControllerFindOne(data);
      return response.data;
    },
    enabled: !!data.path.id,
    ...config,
  });
};
