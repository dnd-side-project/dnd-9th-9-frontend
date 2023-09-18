import {useMutation, type UseMutationResult} from '@tanstack/react-query';
import {type AxiosError} from 'axios';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  id: number;
  ids: number[];
}

interface IUseDeleteUserFieldEjectProps {
  onSuccessCallback?: () => void;
}

const fetcher = async ({id, ids}: IProps): Promise<string> =>
  await axios
    .delete(`/user-field/${id}/eject?ids=${ids.toString()}`)
    .then(({data}) => data);

/** DELETE: 팀원 내보내기 */
export const useDeleteUserFieldEject = ({
  onSuccessCallback = () => {},
}: IUseDeleteUserFieldEjectProps): UseMutationResult<
  string,
  AxiosError,
  IProps
> =>
  useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessCallback();
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
