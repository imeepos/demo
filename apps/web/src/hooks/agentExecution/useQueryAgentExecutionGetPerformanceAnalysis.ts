import { useQuery } from '@tanstack/react-query';
import {
  agentExecutionControllerGetPerformanceAnalysis,
  type AgentExecutionControllerGetPerformanceAnalysisData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryAgentExecutionGetPerformanceAnalysis = (
  data: AgentExecutionControllerGetPerformanceAnalysisData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.agentExecution.performanceAnalysis(
      String(data.path.agentCode)
    ),
    queryFn: async () => {
      const response =
        await agentExecutionControllerGetPerformanceAnalysis(data);
      return response.data;
    },
    enabled: !!data.path.agentCode,
    ...config,
  });
};
