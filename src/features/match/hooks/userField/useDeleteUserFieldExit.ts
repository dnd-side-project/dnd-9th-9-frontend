import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  id: number;
}

interface IUseDeleteUserFieldExitProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({id}: IProps): Promise<string> =>
  await axios.delete(`/user-field/${id}/exit`).then(({data}) => data);

/** DELETE: 필드 나가기 */
export const useDeleteUserFieldExit = ({
  onSuccessCallback,
  onErrorCallback,
}: IUseDeleteUserFieldExitProps): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
> =>
  useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
    onError: error => {
      onErrorCallback(error);
    },
  });
