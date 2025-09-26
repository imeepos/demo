import { useQuery } from '@tanstack/react-query';
import {
  sentimentIntensityControllerSearch,
  type SentimentIntensityControllerSearchData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQuerySentimentIntensitySearch = (
  options?: SentimentIntensityControllerSearchData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.sentimentIntensity.search(queryParams),
    queryFn: async () => {
      const response = await sentimentIntensityControllerSearch(queryParams);
      return response.data;
    },
    ...config,
  });
};
