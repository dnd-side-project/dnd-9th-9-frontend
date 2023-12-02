import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';
import {
  type IFieldNotification,
  type INotificationResponse,
} from '../../../notification/types';

export interface IGetInfiniteNotificationFieldParams {
  id: number;
  pageNumber: number;
  pageSize: number;
}

type TGetNotificationUserResponse = INotificationResponse<IFieldNotification>;

const fetcher = async ({
  id,
  pageNumber,
  pageSize,
}: IGetInfiniteNotificationFieldParams): Promise<TGetNotificationUserResponse> =>
  await axios
    .get(`/notification/field/${id}`, {
      params: {pageNumber, pageSize},
    })
    .then(({data}) => data);

export const useGetInfiniteNotificationField = ({
  id,
  pageNumber,
  pageSize,
}: IGetInfiniteNotificationFieldParams): UseInfiniteQueryResult<
  TGetNotificationUserResponse,
  CustomAxiosError
> =>
  useInfiniteQuery({
    queryKey: KEYS.field(id),
    queryFn: async ({pageParam = 1}) =>
      await fetcher({id, pageSize, pageNumber: pageParam}),
    getNextPageParam: lastPage => {
      const {
        currentPageNumber,
        currentPageSize,
        totalCount,
        notificationInfos,
      } = lastPage;

      const currentDataCount =
        currentPageNumber > 0
          ? (currentPageNumber - 1) * currentPageSize + notificationInfos.length
          : notificationInfos.length;

      return totalCount > currentDataCount ? currentPageNumber + 1 : undefined;
    },
    cacheTime: 0,
    initialData: {
      pageParams: [],
      pages: [
        {
          notificationInfos: [],
          currentPageNumber: 0,
          currentPageSize: 0,
          totalCount: 0,
        },
      ],
    },
  });
