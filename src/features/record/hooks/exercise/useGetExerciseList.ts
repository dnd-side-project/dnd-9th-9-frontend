import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IExerciseListInfo} from '../../types';

interface IProps {
  date: string;
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
    placeholderData: {
      exerciseList: [],
      totalCount: 0,
    },
  });
