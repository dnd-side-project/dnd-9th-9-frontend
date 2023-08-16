import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  date: string;
}

interface IRecentExercise {
  recentSports: Array<{
    burnedCalorie: number;
    exerciseMinute: number;
    sports: string;
  }>;
  totalBurnedCalorie: number;
  totalExerciseMinute: number;
}

const fetcher = async ({date}: IProps): Promise<IRecentExercise> =>
  await axios
    .get(`/exercise/recent`, {
      params: {
        date,
      },
    })
    .then(({data}) => data);

export const useGetRecentExercise = ({
  date,
}: IProps): UseQueryResult<IRecentExercise, Error> =>
  useQuery({
    queryKey: KEYS.recent(date),
    queryFn: async () => await fetcher({date}),
    initialData: {
      recentSports: [],
      totalBurnedCalorie: 0,
      totalExerciseMinute: 0,
    },
  });
