import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IAutoFieldInfo} from '../../types';

interface IProps {
  fieldType: 'DUEL' | 'TEAM_BATTLE';
}

const fetcher = async ({fieldType}: IProps): Promise<IAutoFieldInfo> => {
  const {data} = await axios.get(`/field/auto`, {
    params: {
      fieldType,
    },
  });
  await new Promise(resolve => setTimeout(resolve, 3000));
  return data;
};

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
