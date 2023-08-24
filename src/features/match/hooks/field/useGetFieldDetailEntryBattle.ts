import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IMatchDetailApply} from '../../types';

interface IProps {
  id: number;
  fieldDirection: 'RECEIVED' | 'SENT';
  page?: number;
  size?: number;
}

const fetcher = async ({
  id,
  fieldDirection,
  page,
  size,
}: IProps): Promise<IMatchDetailApply> =>
  await axios
    .get(`/field/entry/battle/${id}`, {
      params: {
        fieldDirection,
        page,
        size,
      },
    })
    .then(({data}) => data);

export const useGetFieldDetailEntryBattle = ({
  id,
  fieldDirection,
  page = 0,
  size = 3,
}: IProps): UseQueryResult<IMatchDetailApply, Error> =>
  useQuery({
    queryKey: KEYS.detailEntryBattle(id, fieldDirection, page, size),
    queryFn: async () => await fetcher({id, fieldDirection, page, size}),
  });

export const SENT_DUMMY_DATA: IMatchDetailApply = {
  fieldEntriesInfos: [
    {
      entryId: 1,
      matchId: 1,
      name: '으쌰으쌰',
      memberCount: 5,
      memberMaxCount: 5,
      fieldType: 'TEAM_BATTLE',
      period: 'ONE_WEEK',
      skillLevel: 'EXPERT',
    },
    {
      entryId: 2,
      matchId: 2,
      name: '저희랑 대결해요',
      memberCount: 5,
      memberMaxCount: 5,
      fieldType: 'TEAM_BATTLE',
      period: 'ONE_WEEK',
      skillLevel: 'BEGINNER',
    },
    {
      entryId: 3,
      matchId: 3,
      name: 'DND 모여라',
      memberCount: 5,
      memberMaxCount: 5,
      fieldType: 'TEAM_BATTLE',
      period: 'ONE_WEEK',
      skillLevel: 'INTERMEDIATE',
    },
    {
      entryId: 4,
      matchId: 4,
      name: 'DND 개발자 모여라',
      memberCount: 5,
      memberMaxCount: 5,
      fieldType: 'TEAM_BATTLE',
      period: 'ONE_WEEK',
      skillLevel: 'EXPERT',
    },
  ],
  totalCount: 4,
};

export const APPLY_DUMMY_DATA: IMatchDetailApply = {
  fieldEntriesInfos: [
    {
      entryId: 1,
      matchId: 1,
      name: '으쌰으쌰',
      memberCount: 5,
      memberMaxCount: 5,
      fieldType: 'TEAM_BATTLE',
      period: 'ONE_WEEK',
      skillLevel: 'EXPERT',
    },
  ],
  totalCount: 1,
};
