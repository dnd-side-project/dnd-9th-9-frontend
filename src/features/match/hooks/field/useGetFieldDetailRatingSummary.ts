import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IMatchDetailRecordSummary} from '../../types';

interface IProps {
  id: number;
  date: string;
  fieldSide: 'AWAY' | 'HOME';
}

const fetcher = async ({
  id,
  date,
  fieldSide,
}: IProps): Promise<IMatchDetailRecordSummary> =>
  await axios
    .get(`/field/${id}/rating-summary`, {
      params: {
        date,
        fieldSide,
      },
    })
    .then(({data}) => data);

export const useGetFieldDetailRatingSummary = ({
  id,
  date,
  fieldSide,
}: IProps): UseQueryResult<IMatchDetailRecordSummary, Error> =>
  useQuery({
    queryKey: KEYS.detailRecordSummary(id, fieldSide, date),
    queryFn: async () => await fetcher({id, date, fieldSide}),
    initialData: {
      goalAchievedCount: 0,
      opponentFieldName: '',
      totalBurnedCalorie: 0,
      totalExerciseTimeMinute: 0,
      totalRecordCount: 0,
      winStatus: 'DRAW',
    },
  });
