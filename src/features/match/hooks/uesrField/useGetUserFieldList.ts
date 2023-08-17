import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IUserFieldListInfo} from '../../types';

interface IProps {
  id: number;
}

const fetcher = async ({id}: IProps): Promise<IUserFieldListInfo> =>
  await axios.get(`/user-field/${id}`, {}).then(({data}) => data);

export const useGetUserFieldList = ({
  id,
}: IProps): UseQueryResult<IUserFieldListInfo, Error> =>
  useQuery({
    queryKey: KEYS.list(id),
    queryFn: async () =>
      await fetcher({
        id,
      }),
    initialData: [],
  });
