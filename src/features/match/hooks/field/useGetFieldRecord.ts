import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IMatchDetailRecord, type TFieldType} from '../../types';

interface IProps {
  id: number;
  date: string;
  fieldType: TFieldType;
  page?: number;
  size?: number;
}

export const DUMMY_DATA = [
  {
    burnedCalorie: 100,
    durationMinute: 300,
    exerciseDateTime: '2023-08-23 23:59:00',
    id: 1,
    isLeader: true,
    isMemoPublic: true,
    memoContent:
      '오운완 인증합니다!!! 오늘도 빠이팅이에요. 몸짱 되는 그날까지 계속',
    memoImg: '',
    name: '주주',
    profileImg: '',
    sports: 'AMERICAN_FOOTBALL',
    userId: 1,
  },
  {
    burnedCalorie: 120,
    durationMinute: 500,
    exerciseDateTime: '2023-08-23 12:59:00',
    id: 2,
    isLeader: false,
    isMemoPublic: true,
    memoContent:
      '오늘은 운동을 매우매우 열심히 하였어요...!! 퇴근하고 정말 운동하기 싫었는데 해냈다',
    memoImg: '',
    name: '치치',
    profileImg: '',
    sports: 'AMERICAN_FOOTBALL',
    userId: 2,
  },
  {
    burnedCalorie: 300,
    durationMinute: 600,
    exerciseDateTime: '2023-08-23 10:02:00',
    id: 3,
    isLeader: false,
    isMemoPublic: true,
    memoContent: '오늘도 해냈다!! 오운완!',
    memoImg: '',
    name: '차차',
    profileImg: '',
    sports: 'AMERICAN_FOOTBALL',
    userId: 3,
  },
];

const fetcher = async ({
  id,
  date,
  fieldType,
  page,
  size,
}: IProps): Promise<string> =>
  await axios
    .get(`/field/${id}/record`, {
      params: {
        date,
        fieldType,
        page,
        size,
      },
    })
    .then(({data}) => data);

export const useGetFieldRecord = ({
  id,
  date,
  fieldType,
  page = 0,
  size = 3,
}: IProps): UseQueryResult<IMatchDetailRecord[], Error> =>
  useQuery({
    queryKey: KEYS.detailRecord(id, date, fieldType, page, size),
    queryFn: async () =>
      await fetcher({
        id,
        date,
        fieldType,
        page,
        size,
      }),
  });
