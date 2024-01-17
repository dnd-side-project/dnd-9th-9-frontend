import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type TFieldType} from '../../../match/types';
import {type ITeamworkRateHistory} from '../../types';

export interface IGetTeamworkRateHistoryParams {
  fieldType: TFieldType;
  page: number;
  size: number;
}

export interface TGetNotificationUserResponse {
  currentPage: number;
  currentPageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  teamworkRateHistoryDtos: ITeamworkRateHistory[];
}

const fetcher = async (
  params: IGetTeamworkRateHistoryParams,
): Promise<TGetNotificationUserResponse> =>
  await axios.get('/teamwork-rate/history', {params}).then(({data}) => data);

export const useGetTeamworkRateHistory = (
  params: IGetTeamworkRateHistoryParams,
): UseInfiniteQueryResult<TGetNotificationUserResponse, Error> =>
  useInfiniteQuery({
    queryKey: KEYS.teamworkRateHistory(),
    queryFn: async ({pageParam = 1}) =>
      await fetcher({...params, page: pageParam}),
    getNextPageParam: lastPage =>
      lastPage.isLastPage ? null : lastPage.currentPage + 1,
    cacheTime: 0,
  });
