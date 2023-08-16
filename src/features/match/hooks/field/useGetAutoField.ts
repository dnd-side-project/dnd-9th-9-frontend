import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  fieldType: string;
}

interface IAutoFieldInfo {
  currentSize: number;
  goal: string;
  id: number;
  maxSize: number;
  name: string;
  period: string;
  profileImg: string;
  skillLevel: string;
  strength: string;
}

const fetcher = async ({fieldType}: IProps): Promise<IAutoFieldInfo> =>
  await axios
    .get(`/field/auto`, {
      params: {
        fieldType,
      },
    })
    .then(({data}) => data);

export const useGetAutoField = ({
  fieldType,
}: IProps): UseQueryResult<IAutoFieldInfo, Error> =>
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
