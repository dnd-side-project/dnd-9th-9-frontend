import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IMatchDetailRecordTeamRanking} from '../../types';

interface IProps {
  id: number;
  date: string;
  fieldSide: 'AWAY' | 'HOME';
}

const fetcher = async ({
  id,
  date,
  fieldSide,
}: IProps): Promise<IMatchDetailRecordTeamRanking> =>
  await axios
    .get(`/field/${id}/team/ranking`, {
      params: {
        date,
        fieldSide,
      },
    })
    .then(({data}) => data);

export const useGetFieldDetailTeamRanking = ({
  id,
  date,
  fieldSide,
}: IProps): UseQueryResult<IMatchDetailRecordTeamRanking, Error> =>
  useQuery({
    queryKey: KEYS.detailRecordTeamRanking(id, fieldSide, date),
    queryFn: async () => await fetcher({id, date, fieldSide}),
    initialData: {
      burnedCalorieRanking: [],
      exerciseTimeRanking: [],
      goalAchievedCountRanking: [],
      recordCountRanking: [],
    },
  });
