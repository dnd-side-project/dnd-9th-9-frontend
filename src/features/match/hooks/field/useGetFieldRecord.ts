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

export const DUMMY_DATA: IMatchDetailRecord[] = [
  {
    burnedCalorie: 100,
    durationMinute: 300,
    exerciseDateTime: '2023-08-23 23:59:00',
    id: 1,
    isLeader: true,
    isMemoPublic: true,
    memoContent:
      '오운완 인증합니다!!! 오늘도 빠이팅이에요. 몸짱 되는 그 날까지 계속입니다!!! 저번에 못 이룬 바디 프로필을 꼬옥 찍겠어요 이번에는~',
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
    isMemoPublic: false,
    memoContent: '야구는 재밌어!',
    memoImg: '',
    name: '치치',
    profileImg: '',
    sports: 'BASEBALL',
    userId: 2,
  },
  {
    burnedCalorie: 300,
    durationMinute: 600,
    exerciseDateTime: '2023-08-23 10:02:00',
    id: 3,
    isLeader: false,
    isMemoPublic: true,
    memoContent:
      '오클완! 등산 입문했는데 재밌네용. 클라이밍 영역도 있었어요...! 팔 근력을 키워야겠어요.',
    memoImg: '',
    name: '차차',
    profileImg: '',
    sports: 'CLIMBING',
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
