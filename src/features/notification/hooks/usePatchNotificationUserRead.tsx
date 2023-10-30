import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../lib/axios';
import {queryClient} from '../../../lib/react-query';

const fetcher = async (): Promise<string> =>
  await axios.patch(`/notification/user/read`).then(({data}) => data);

export const usePatchNotificationUserRead = (): UseMutationResult<
  string,
  Error
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.user());
    },
  });
};
