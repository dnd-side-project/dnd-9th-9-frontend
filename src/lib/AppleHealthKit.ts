import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthObserver,
} from 'react-native-health';

import {NativeEventEmitter, NativeModules} from 'react-native';

// https://github.com/agencyenterprise/react-native-health

export const initHealthKit = () => {
  const permissions: HealthKitPermissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.ActivitySummary,
        AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
        AppleHealthKit.Constants.Permissions.AppleExerciseTime,
        AppleHealthKit.Constants.Permissions.Workout,
      ],
      write: [AppleHealthKit.Constants.Permissions.Workout],
    },
  };

  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    if (error) {
      // TODO: error screen 추가 필요
      console.log('[ERROR] Cannot grant permissions!');
    }
    console.log('initHealthKit');
  });
};

type TObserverCallback = () => void;

const nativeEventEmitter = new NativeEventEmitter(NativeModules.AppleHealthKit);

/**
 * 백그라운드 환경에서 사용자의 운동 새 데이터 샘플 수신에 대해 관찰합니다.
 */
export const observeNewWorkout = (callback: TObserverCallback) => {
  nativeEventEmitter.addListener('healthKit:Workout:new', async () => {
    callback();
  });
};

/**
 * 백그라운드 환경에서 사용자가 소모한 활동에너지 새 데이터 샘플 수신에 대해 관찰합니다.
 * @see {@link https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/1615771-activeenergyburned}
 */
export const observeNewActiveEnergyBurned = (callback: TObserverCallback) => {
  nativeEventEmitter.addListener(
    'healthKit:ActiveEnergyBurned:new',
    async () => {
      callback();
    },
  );
};

export {AppleHealthKit, HealthObserver, type HealthInputOptions};
