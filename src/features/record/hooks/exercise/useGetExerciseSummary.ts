import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IDailyExerciseSummary} from '../../types';

interface IProps {
  date: string;
}

const fetcher = async ({date}: IProps): Promise<IDailyExerciseSummary> =>
  await axios
    .get(`/exercise/my-summary`, {
      params: {
        date,
      },
    })
    .then(({data}) => data);

export const useGetExerciseSummary = ({
  date,
}: IProps): UseQueryResult<IDailyExerciseSummary, Error> =>
  useQuery({
    queryKey: KEYS.summary(date),
    queryFn: async () => await fetcher({date}),
    initialData: {
      totalBurnedCalorie: 0,
      totalExerciseCalorie: 0,
      totalExerciseTimeMinute: 0,
      totalRecordCount: 0,
    },
  });
