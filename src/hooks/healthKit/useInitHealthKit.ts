import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {initHealthKit} from '../../lib/AppleHealthKit';
import {queryClient} from '../../lib/react-query';

export const useInitHealthKit = (): UseMutationResult<void, Error, void> => {
  return useMutation({
    mutationFn: initHealthKit,
    onSuccess: () => {
      void queryClient.invalidateQueries(KEYS.all);
      console.log('init HealthKit');
    },
  });
};
