import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {
  AppleHealthKit,
  type HealthValue,
  type HealthActivityOptions,
} from '../../../../lib/AppleHealthKit';

// TODO: 문서 수정 요청
const fetcher = async (
  options: HealthActivityOptions,
): Promise<HealthValue> => {
  return await new Promise((resolve, reject) => {
    AppleHealthKit.saveWorkout(options, (err, results) => {
      if (err != null) {
        reject(new Error(err));
      } else {
        resolve(results);
      }
    });
  });
};

export const useSaveHealthKitExercise = (): UseMutationResult<
  HealthValue,
  Error,
  HealthActivityOptions
> => {
  return useMutation({
    mutationFn: fetcher,
    onSuccess: data => {
      // TODO: 관련  query invalidate
      console.log('Workout successfully saved:', data);
    },
  });
};
