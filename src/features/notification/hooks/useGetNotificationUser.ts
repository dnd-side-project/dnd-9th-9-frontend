import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../lib/axios';
import {dayjs} from '../../../lib/dayjs';
import {type INotificationResponse, type IHomeNotification} from '../types';

interface DummyData {
  currentPageNumber: number;
  currentPageSize: number;
  totalCount: number;
  notificationInfos: IHomeNotification[];
}

function generateDummyData(
  pageNumber: number = 1,
  pageSize: number = 10,
): DummyData {
  const dummyData: DummyData = {
    currentPageNumber: pageNumber,
    currentPageSize: pageSize,
    totalCount: 0,
    notificationInfos: [] as any[],
  };

  const startDate = dayjs('2023-11-26 12:11:02', {
    format: 'YYYY-MM-DD HH:mm:ss',
  });
  const endDate = dayjs(startDate).add(pageNumber - 1, 'day');

  for (let i = 1; i <= pageSize; i++) {
    const newNotification = {
      content: `Notification ${i}`,
      createdAt: endDate.format('YYYY-MM-DD HH:mm:ss'),
      fieldId: 100 + i + pageNumber,
      id: Date.now(),
      isRead: pageNumber > 2,
    };
    dummyData.notificationInfos.push(newNotification);
    startDate.add(1, 'day');
  }

  return dummyData;
}

export interface IGetNotificationUserParams {
  offset?: number;
  pageNumber: number;
  pageSize: number;
}

type TGetNotificationUserResponse = INotificationResponse<IHomeNotification>;

const fetcher = async (
  params: IGetNotificationUserParams,
): Promise<TGetNotificationUserResponse> =>
  await axios
    .get('/notification/user', {
      params,
    })
    .then(() => generateDummyData(params.pageNumber, params.pageSize));

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
