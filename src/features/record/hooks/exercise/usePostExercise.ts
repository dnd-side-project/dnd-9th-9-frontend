import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  formData: FormData;
}

const fetcher = async ({formData}: IProps): Promise<string> =>
  await axios
    .post(`/exercise`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then(({data}) => data);

export const usePostExercise = (): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
};
