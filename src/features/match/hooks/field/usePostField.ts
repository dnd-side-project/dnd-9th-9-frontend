import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  formData: FormData;
}

interface IUsePostFieldProps {
  onSuccessCallback: (id: string) => void;
}

const fetcher = async ({formData}: IProps): Promise<string> =>
  await axios
    .post('/field', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then(({data}) => data);

export const usePostField = ({
  onSuccessCallback,
}: IUsePostFieldProps): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: response => {
      onSuccessCallback(response);
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
};
