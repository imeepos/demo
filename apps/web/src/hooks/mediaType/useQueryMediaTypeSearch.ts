import { useQuery } from '@tanstack/react-query';
import {
  mediaTypeControllerSearch,
  type MediaTypeControllerSearchData,
} from '@sker/sdk';
import { queryKeys } from '../constants/queryKeys';
import type { QueryConfig } from '../types';

export const useQueryMediaTypeSearch = (
  options?: MediaTypeControllerSearchData & {
    config?: QueryConfig<any, Error>;
  }
) => {
  const { config, ...queryParams } = options || {};

  return useQuery({
    queryKey: queryKeys.mediaType.search(queryParams),
    queryFn: async () => {
      const response = await mediaTypeControllerSearch(queryParams);
      return response.data;
    },
    ...config,
  });
};
