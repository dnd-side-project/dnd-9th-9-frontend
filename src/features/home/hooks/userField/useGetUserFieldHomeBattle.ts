import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {
  type IUserFieldHomeBattle,
  type TUserFieldBattleType,
} from '../../types';

interface IProps {
  battleType: TUserFieldBattleType;
}

interface IResponse {
  fieldId: number;
  away: IUserFieldHomeBattle;
  home: IUserFieldHomeBattle;
  /** 완료까지 남은 일수 */
  daysLeft: number;
}

const fetcher = async ({battleType}: IProps): Promise<IResponse> =>
  await axios
    .get(`/user-field/home/battle`, {
      params: {
        battleType,
      },
    })
    .then(({data}) => data)
    .then(() => ({
      away: {
        goalAchievedCount: 0,
        name: 'test우저',
        totalBurnedCalorie: 0,
        totalExerciseTimeMinute: 0,
        totalRecordCount: 0,
      },
      daysLeft: 0,
      fieldId: 0,
      home: {
        goalAchievedCount: 0,
        name: 'test우저2',
        totalBurnedCalorie: 0,
        totalExerciseTimeMinute: 0,
        totalRecordCount: 0,
      },
    }));

/**
 * 홈화면 나의 배틀 현황 조회 (팀 제외)
 */
export const useGetUserFieldHomeBattle = ({
  battleType,
}: IProps): UseQueryResult<IResponse, Error> =>
  useQuery({
    queryKey: KEYS.homeBattle(battleType),
    queryFn: async () => await fetcher({battleType}),
  });
