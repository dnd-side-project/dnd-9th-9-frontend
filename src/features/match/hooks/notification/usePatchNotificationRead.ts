import {type UseMutationResult, useMutation} from '@tanstack/react-query';
import axios from 'axios';

import {KEYS} from './keys';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IUsePatchNotificationUserReadQuery {
  id: number;
}

const fetcher = async ({
  id,
}: IUsePatchNotificationUserReadQuery): Promise<string> =>
  await axios.patch(`/notification/${id}/read`).then(({data}) => data);

export const usePatchNotificationRead = (): UseMutationResult<
  string,
  CustomAxiosError,
  IUsePatchNotificationUserReadQuery
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
};
