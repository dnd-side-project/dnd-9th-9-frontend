import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IRecentExercise} from '../../types';

interface IProps {
  date: string;
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
    placeholderData: {
      recentSports: [],
      totalBurnedCalorie: 0,
      totalExerciseMinute: 0,
    },
  });
