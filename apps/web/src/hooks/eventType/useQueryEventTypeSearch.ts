import { useQuery } from '@tanstack/react-query';
import {
  eventTypeControllerSearch,
  type EventTypeControllerSearchData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryEventTypeSearch = (
  options?: EventTypeControllerSearchData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.eventType.search(queryParams),
    queryFn: async () => {
      const response = await eventTypeControllerSearch(queryParams);
      return response.data;
    },
    ...config,
  });
};
