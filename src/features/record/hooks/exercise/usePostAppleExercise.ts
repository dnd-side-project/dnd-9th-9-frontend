import {type UseMutationResult, useMutation} from '@tanstack/react-query';

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

export const usePostAppleExercise = (): UseMutationResult<
  string,
  Error,
  IProps
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
    },
  });
};
