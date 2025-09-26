import { useQuery } from '@tanstack/react-query';
import {
  eventTypeControllerFindAll,
  type EventTypeControllerFindAllData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryEventTypeFindAll = (
  options?: EventTypeControllerFindAllData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.eventType.list(queryParams),
    queryFn: async () => {
      const response = await eventTypeControllerFindAll(queryParams);
      return response.data;
    },
    ...config,
  });
};
