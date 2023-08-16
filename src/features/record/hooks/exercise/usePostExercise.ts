import {
  type UseMutationResult,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import {KEYS} from './keys';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  body: {
    burnedCalorie: number;
    durationMinute: number;
    exerciseDate: string;
    isMemoPublic: boolean;
    memoContent: string;
    memoImg: string;
    sports: string;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/exercise`, {
      body,
    })
    .then(({data}) => data);

export const usePostExercise = (
  options?: UseMutationOptions<string, Error, IProps>,
): UseMutationResult<string, Error, IProps> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
    ...options,
  });
};
