import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerGetAnalyticsOverview,
  type AgentExecutionControllerGetAnalyticsOverviewData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionGetAnalyticsOverview = (
  options?: AgentExecutionControllerGetAnalyticsOverviewData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.agentExecution.analyticsOverview(),
    queryFn: async () => {
      const response =
        await agentExecutionControllerGetAnalyticsOverview(queryParams);
      return response.data;
    },
    ...config,
  });
};
