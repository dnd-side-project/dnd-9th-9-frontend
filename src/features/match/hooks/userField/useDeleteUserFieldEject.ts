import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {type AxiosError} from 'axios';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  id: number;
}

const fetcher = async ({id}: IProps): Promise<string> =>
  await axios.delete(`/user-field/${id}/eject`).then(({data}) => data);

/** DELETE: 팀원 내보내기 */
export const useDeleteUserFieldEject = ({
  id,
}: IProps): UseMutationResult<string, AxiosError, IProps> =>
  useMutation({
    mutationFn: async () => await fetcher({id}),
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
