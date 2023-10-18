import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';
import {type CustomAxiosError} from '../../../../utils/types';

interface IProps {
  id: number;
  formData: FormData;
}

interface IUsePostFieldProfileProps {
  onSuccessCallback: () => void;
  onErrorCallback: (error: CustomAxiosError) => void;
}

const fetcher = async ({id, formData}: IProps): Promise<string> =>
  await axios
    .post(`/field/${id}/profile`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then(({data}) => data);

export const usePostFieldProfile = ({
  onSuccessCallback,
  onErrorCallback,
}: IUsePostFieldProfileProps): UseMutationResult<
  string,
  CustomAxiosError,
  IProps
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
