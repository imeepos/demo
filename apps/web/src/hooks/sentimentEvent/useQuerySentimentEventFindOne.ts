import { useQuery } from '@tanstack/react-query';
import {
  sentimentEventControllerFindOne,
  type SentimentEventControllerFindOneData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQuerySentimentEventFindOne = (
  data: SentimentEventControllerFindOneData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.sentimentEvent.detail(String(data.path.id)),
    queryFn: async () => {
      const response = await sentimentEventControllerFindOne(data);
      return response.data;
    },
    enabled: !!data.path.id,
    ...config,
  });
};
