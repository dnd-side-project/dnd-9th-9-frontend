import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type TAutoFieldInfo} from '../../types';

interface IProps {
  fieldType: string;
}

const fetcher = async ({fieldType}: IProps): Promise<TAutoFieldInfo> =>
  await axios
    .get(`/field/auto`, {
      params: {
        fieldType,
      },
    })
    .then(({data}) => data);

export const useGetAutoField = ({
  fieldType,
}: IProps): UseQueryResult<TAutoFieldInfo, Error> =>
  useQuery({
    queryKey: KEYS.auto(fieldType),
    queryFn: async () => await fetcher({fieldType}),
    initialData: {
      currentSize: 0,
      goal: '',
      id: 0,
      maxSize: 0,
      name: '',
      period: '',
      profileImg: '',
      skillLevel: '',
      strength: '',
    },
  });
