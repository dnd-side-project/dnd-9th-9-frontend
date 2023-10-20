import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  id: number;
}

interface IUsePatchChangeLeaderProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({id}: IProps): Promise<string> =>
  await axios.patch(`/field/${id}/change-leader`).then(({data}) => data);

export const usePatchChangeLeader = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePatchChangeLeaderProps): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: response => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
    onError: error => {
      onErrorCallback(error);
    },
  });
};
