import {type UseMutationResult, useMutation} from '@tanstack/react-query';
import axios from 'axios';

import {KEYS} from './keys';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IUsePatchNotificationUserReadQuery {
  id: number;
}

interface IUsePatchNotificationReadProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({
  id,
}: IUsePatchNotificationUserReadQuery): Promise<string> =>
  await axios.patch(`/notification/${id}/read`).then(({data}) => data);

export const usePatchNotificationRead = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePatchNotificationReadProps): UseMutationResult<
  string,
  CustomAxiosError,
  IUsePatchNotificationUserReadQuery
> => {
  return useMutation({
    mutationFn: fetcher,

    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
    onError: error => {
      onErrorCallback(error);
    },
  });
};
