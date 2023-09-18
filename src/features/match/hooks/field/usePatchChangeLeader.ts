import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  id: number;
}

interface IUsePatchChangeLeaderProps {
  onSuccessCallback: (id: string) => void;
}

const fetcher = async ({id}: IProps): Promise<string> =>
  await axios.patch(`/field/${id}/change-leader`).then(({data}) => data);

export const usePatchChangeLeader = ({
  onSuccessCallback,
}: IUsePatchChangeLeaderProps): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: response => {
      onSuccessCallback(response);
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
};
