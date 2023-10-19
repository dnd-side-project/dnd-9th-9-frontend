import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  id: number;
  ids: number[];
}

interface IUseDeleteUserFieldEjectProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({id, ids}: IProps): Promise<string> =>
  await axios
    .delete(`/user-field/${id}/eject?ids=${ids.toString()}`)
    .then(({data}) => data);

/** DELETE: 팀원 내보내기 */
export const useDeleteUserFieldEject = ({
  onSuccessCallback,
  onErrorCallback,
}: IUseDeleteUserFieldEjectProps): UseMutationResult<
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
