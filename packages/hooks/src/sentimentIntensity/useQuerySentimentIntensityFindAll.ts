import { useQuery } from '@tanstack/react-query';
import {
  sentimentIntensityControllerFindAll,
  type SentimentIntensityControllerFindAllData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQuerySentimentIntensityFindAll = (
  options?: SentimentIntensityControllerFindAllData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.sentimentIntensity.list(queryParams),
    queryFn: async () => {
      const response = await sentimentIntensityControllerFindAll(queryParams);
      return response.data;
    },
    ...config,
  });
};
