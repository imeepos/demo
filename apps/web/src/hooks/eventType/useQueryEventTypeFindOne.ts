import { useQuery } from '@tanstack/react-query';
import {
  eventTypeControllerFindOne,
  type EventTypeControllerFindOneData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryEventTypeFindOne = (
  data: EventTypeControllerFindOneData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.eventType.detail(String(data.path.id)),
    queryFn: async () => {
      const response = await eventTypeControllerFindOne(data);
      return response.data;
    },
    enabled: !!data.path.id,
    ...config,
  });
};
