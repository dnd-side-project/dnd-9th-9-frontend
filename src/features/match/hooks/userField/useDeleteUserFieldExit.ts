import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {type AxiosError} from 'axios';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  id: number;
}

const fetcher = async ({id}: IProps): Promise<string> =>
  await axios.delete(`/user-field/${id}/exit`).then(({data}) => data);

/** DELETE: 필드 나가기 */
export const useDeleteUserFieldExit = (): UseMutationResult<
  string,
  AxiosError,
  IProps
> =>
  useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
