import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';
import {type IUserFieldMyMatch} from '../../types';

const fetcher = async (): Promise<IUserFieldMyMatch[]> =>
  await axios.get('/user-field/progress').then(({data}) => data);

export const useGetUserFieldProgress = (): UseQueryResult<
  IUserFieldMyMatch[],
  CustomAxiosError
> =>
  useQuery({
    queryKey: KEYS.progress(),
    queryFn: async () => await fetcher(),
    initialData: [],
  });
