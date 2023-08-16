import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  id: number;
}

interface IFieldListInfo
  extends Array<{
    id: number;
    isLeader: boolean;
    name: string;
    profileImg: string;
    skillLevel: string;
  }> {}

const fetcher = async ({id}: IProps): Promise<IFieldListInfo> =>
  await axios.get(`/user-field/${id}`, {}).then(({data}) => data);

export const useGetUserFieldList = ({
  id,
}: IProps): UseQueryResult<IFieldListInfo, Error> =>
  useQuery({
    queryKey: KEYS.list(id),
    queryFn: async () =>
      await fetcher({
        id,
      }),
    initialData: [],
  });
