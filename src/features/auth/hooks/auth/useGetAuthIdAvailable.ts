import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';

interface IProps {
  uid: string;
}

interface IQueryProps extends IProps {
  enabled: boolean;
}

const fetcher = async ({uid}: IProps): Promise<boolean> =>
  await axios
    .get(`/auth/id-available`, {
      params: {
        uid,
      },
    })
    .then(({data}) => data);

export const useGetAuthIdAvailable = ({
  uid,
  enabled = true,
}: IQueryProps): UseQueryResult<boolean, Error> => {
  console.log(uid, enabled);
  return useQuery({
    queryKey: KEYS.idAvailable(uid),
    queryFn: async () =>
      await fetcher({
        uid,
      }),
    initialData: false,
    enabled,
  });
};
