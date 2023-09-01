import {type UseMutationResult, useMutation} from '@tanstack/react-query';

import {KEYS} from './keys';
import {type HealthActivity} from '../../../../lib/AppleHealthKit';
import {axios} from '../../../../lib/axios';
import {queryClient} from '../../../../lib/react-query';

interface IProps {
  body: {
    burnedCalorie: number;
    durationMinute: number;
    exerciseDate: string;
    isMemoPublic: boolean;
    memoContent?: string;
    memoImgFile?: string;
    sports: HealthActivity;
  };
}

const fetcher = async ({body}: IProps): Promise<string> =>
  await axios
    .post(`/exercise`, {
      body,
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
