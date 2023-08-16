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
    appleWorkouts: Array<{
      appleUid: string;
      burnedCalorie: number;
      endDateTime: string;
      sports: string;
      startDateTime: string;
    }>;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/exercise/apple-workouts`, {
      body,
    })
    .then(({data}) => data);

export const usePostAppleExercise = (
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
