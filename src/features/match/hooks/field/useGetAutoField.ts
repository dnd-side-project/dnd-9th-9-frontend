import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {sleep} from '../../../../utils/promise';
import {type CustomAxiosError} from '../../../../utils/types';
import {type IAutoFieldInfo} from '../../types';

interface IProps {
  fieldType: 'DUEL' | 'TEAM_BATTLE';
}

const fetcher = async ({fieldType}: IProps): Promise<IAutoFieldInfo> => {
  try {
    await sleep(500);
    const {data} = await axios.get(`/field/auto`, {
      params: {
        fieldType,
      },
    });
    return data;
  } catch (error) {
    await sleep(500);
    throw error;
  }
};

export const useGetAutoField = ({
  fieldType,
}: IProps): UseQueryResult<IAutoFieldInfo, CustomAxiosError> =>
  useQuery({
    queryKey: KEYS.auto(fieldType),
    queryFn: async () => await fetcher({fieldType}),
  });
