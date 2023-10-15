import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  id: number;
}

interface IUseDeleteFieldProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({id}: IProps): Promise<string> =>
  await axios.delete(`/field/${id}`).then(({data}) => data);

export const useDeleteField = ({
  onSuccessCallback,
  onErrorCallback,
}: IUseDeleteFieldProps): UseMutationResult<string, CustomAxiosError, IProps> =>
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
