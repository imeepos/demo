import { useQuery } from '@tanstack/react-query';
import {
  mediaTypeControllerFindOne,
  type MediaTypeControllerFindOneData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryMediaTypeFindOne = (
  data: MediaTypeControllerFindOneData,
  config?: QueryConfig<any, Error>
) => {
  return useQuery({
    queryKey: queryKeys.mediaType.detail(String(data.path.id)),
    queryFn: async () => {
      const response = await mediaTypeControllerFindOne(data);
      return response.data;
    },
    enabled: !!data.path.id,
    ...config,
  });
};
