import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../lib/axios';
import {type INotificationResponse, type IHomeNotification} from '../types';

export interface IGetNotificationUserParams {
  offset?: number;
  pageNumber: number;
  pageSize: number;
}

type TGetNotificationUserResponse = INotificationResponse<IHomeNotification>;

const fetcher = async (
  params: IGetNotificationUserParams,
): Promise<TGetNotificationUserResponse> =>
  await axios.get('/notification/user', {params}).then(({data}) => data);

export const useGetNotificationUser = (
  params: IGetNotificationUserParams,
): UseInfiniteQueryResult<TGetNotificationUserResponse, Error> =>
  useInfiniteQuery({
    queryKey: KEYS.user(),
    queryFn: async ({pageParam = 1}) =>
      await fetcher({...params, pageNumber: pageParam}),
    getNextPageParam: lastPage => {
      const {notificationInfos, currentPageNumber} = lastPage;
      return notificationInfos.length < params.pageSize
        ? undefined
        : currentPageNumber + 1;
    },
    cacheTime: 0,
  });
