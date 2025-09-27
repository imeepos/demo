import { useQuery } from '@tanstack/react-query';
import {
  sentimentEventControllerSearch,
  type SentimentEventControllerSearchData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQuerySentimentEventSearch = (
  options?: SentimentEventControllerSearchData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.sentimentEvent.search(queryParams),
    queryFn: async () => {
      const response = await sentimentEventControllerSearch(queryParams);
      return response.data || [];
    },
    ...config,
  });
};
