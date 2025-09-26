import { useQuery } from '@tanstack/react-query';
import {
  sentimentEventControllerFindAll,
  type SentimentEventControllerFindAllData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQuerySentimentEventFindAll = (
  options?: SentimentEventControllerFindAllData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.sentimentEvent.list(queryParams),
    queryFn: async () => {
      const response = await sentimentEventControllerFindAll(queryParams);
      return response.data;
    },
    ...config,
  });
};
