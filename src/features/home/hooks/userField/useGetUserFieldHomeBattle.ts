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
  // TODO(@minimalKim): 유저 썸네일 추가 요청 또는 디자인 명세 수정 요청
  await axios
    .get(`/user-field/home/battle`, {
      params: {
        battleType,
      },
    })
    // TODO(@minimalKim): 진행 중인 배틀이 없을 경우 null이 아닌 빈 string 반환 됨 -> 백엔드 수정요청
    .then(({data}) => {
      if (data === '') return null;
      return data;
    });

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
