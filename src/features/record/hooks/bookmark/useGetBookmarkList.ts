import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IBookmarkListInfo} from '../../types';

const fetcher = async (): Promise<IBookmarkListInfo> =>
  await axios.get(`/bookmarks`).then(({data}) => data);

export const useGetBookmarkList = (): UseQueryResult<
  IBookmarkListInfo,
  Error
> =>
  useQuery({
    queryKey: KEYS.list(),
    queryFn: async () => await fetcher(),
    initialData: {
      bookmarks: [],
      totalCount: 0,
    },
  });
