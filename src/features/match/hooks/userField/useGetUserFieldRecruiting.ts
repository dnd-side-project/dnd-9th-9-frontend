import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type CustomAxiosError} from '../../../../utils/types';
import {type IUserFieldMyMatch} from '../../types';

const fetcher = async (): Promise<IUserFieldMyMatch[]> =>
  await axios.get('/user-field/recruiting').then(({data}) => data);

export const useGetUserFieldRecruiting = (): UseQueryResult<
  IUserFieldMyMatch[],
  CustomAxiosError
> =>
  useQuery({
    queryKey: KEYS.recruiting(),
    queryFn: async () => await fetcher(),
    initialData: [],
  });
