import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IField} from '../../types';

const fetcher = async (): Promise<IField[]> =>
  await axios.get('/user-field/progress').then(({data}) => data);

export const useGetUserFieldProgress = (): UseQueryResult<IField[], Error> =>
  useQuery({
    queryKey: KEYS.progress(),
    queryFn: async () => await fetcher(),
    initialData: [],
  });
