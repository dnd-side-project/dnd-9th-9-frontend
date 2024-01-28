import {useMutation, type UseMutationResult} from '@tanstack/react-query';

import {KEYS} from './keys';
import {
  initHealthKit,
  type HealthKitPermissions,
} from '../../lib/AppleHealthKit';
import {queryClient} from '../../lib/react-query';

interface IProps {
  options?: {
    onSuccessCallback?: () => void;
    onErrorCallback?: () => void;
  };
}

export const useInitHealthKit = ({options}: IProps = {}): UseMutationResult<
  void,
  unknown,
  HealthKitPermissions | undefined,
  unknown
> => {
  return useMutation({
    mutationFn: initHealthKit,
    onSuccess: async () => {
      await queryClient.invalidateQueries(KEYS.all);

      console.log('init HealthKit');
      options?.onSuccessCallback?.();
    },
    onError: options?.onErrorCallback,
  });
};
