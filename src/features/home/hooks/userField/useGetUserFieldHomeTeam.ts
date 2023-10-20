import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IUserFieldHomeTeam} from '../../types/userField';

const fetcher = async (): Promise<IUserFieldHomeTeam> =>
  await axios.get(`/user-field/home/team`).then(({data}) => {
    if (data === '') return null;
    return data;
  });

/**
 * 매칭안함
 *
 *  홈화면 나의 팀 현황 조회 (팀배틀, 1:1 배틀 제외) 📜
 * - 매치 시작일부터 오늘까지의 누적 데이터
 * - 진행 중인 팀이 없을 경우 null 이 반환
 */
export const useGetUserFieldHomeTeam = (): UseQueryResult<
  IUserFieldHomeTeam,
  Error
> =>
  useQuery({
    queryKey: KEYS.homeTeam(),
    queryFn: async () => await fetcher(),
  });
