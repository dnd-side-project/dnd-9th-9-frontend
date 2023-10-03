import {useQuery, type UseQueryResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {type IUseGetAuthIdAvailableParams} from '../../types';

const fetcher = async ({
  name,
  phoneNum,
}: IUseGetAuthIdAvailableParams): Promise<string[]> =>
  await axios
    .get(`/auth/find-id`, {
      params: {
        name,
        phoneNum,
      },
    })
    .then(({data}) => {
      console.log('data', data);
      return data.uids;
    });

export const useGetFindId = ({
  name,
  phoneNum,
}: IUseGetAuthIdAvailableParams): UseQueryResult<string[], Error> =>
  useQuery({
    queryKey: KEYS.findId({name, phoneNum}),
    queryFn: async () =>
      await fetcher({
        name,
        phoneNum,
      }),
    initialData: [],
  });
