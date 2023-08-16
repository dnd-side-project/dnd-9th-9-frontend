import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  date: string;
}

interface IExerciseListInfo {
  exerciseList: Array<{
    appleUid: string;
    burnedCalorie: number;
    durationMinute: number;
    exerciseDate: string; // yyyy-MM-dd
    id: number;
    isMemoPublic: true;
    memoContent: string;
    memoImg: string;
    recordProvider: string;
    sports: string;
  }>;
  totalCount: number;
}

const fetcher = async ({date}: IProps): Promise<IExerciseListInfo> =>
  await axios
    .get(`/exercise`, {
      params: {
        date,
      },
    })
    .then(({data}) => data);

export const useGetExerciseList = ({
  date,
}: IProps): UseQueryResult<IExerciseListInfo, Error> =>
  useQuery({
    queryKey: KEYS.list(date),
    queryFn: async () => await fetcher({date}),
    initialData: {
      exerciseList: [],
      totalCount: 0,
    },
  });
