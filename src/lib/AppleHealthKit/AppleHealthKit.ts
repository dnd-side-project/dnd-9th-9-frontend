import {NativeEventEmitter, NativeModules} from 'react-native';
import AppleHealthKit, {
  type HealthStatusResult,
  type HealthKitPermissions,
  type HealthUnit,
  type HealthValue,
  type HealthActivitySummary,
  type HealthInputOptions,
} from 'react-native-health';

// https://github.com/agencyenterprise/react-native-health

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.AppleExerciseTime,
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.BiologicalSex,
    ],
    write: [AppleHealthKit.Constants.Permissions.Workout],
  },
};

export const initHealthKit = async (): Promise<void> => {
  await new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      // NOTE: error = object | null
      if (error != null) {
        // TODO: error screen 추가 필요
        reject(new Error(error));
      } else {
        console.log('initHealthKit');
      }
    });
  });
};

export const getAuthStatus = async (): Promise<HealthStatusResult> =>
  await new Promise((resolve, reject) => {
    AppleHealthKit.getAuthStatus(permissions, (error, results) => {
      if (error != null) {
        reject(new Error(error));
      } else {
        resolve(results);
      }
    });
  });

export const getLatestHeight = async (): Promise<HealthValue> =>
  await new Promise((resolve, reject) => {
    AppleHealthKit.getLatestHeight({}, (error, results) => {
      if (error != null) {
        reject(new Error(''));
      } else {
        resolve(results);
      }
    });
  });

export const getLatestWeight = async (): Promise<HealthValue> =>
  await new Promise((resolve, reject) => {
    AppleHealthKit.getLatestWeight(
      {unit: 'gram' as HealthUnit},
      (error, results) => {
        if (error != null) {
          reject(new Error(error));
        } else {
          resolve(results);
        }
      },
    );
  });

export const getBiologicalSex = async (): Promise<{value: string}> =>
  await new Promise((resolve, reject) => {
    AppleHealthKit.getBiologicalSex({}, (error, results) => {
      if (error != null) {
        reject(new Error(error));
      } else {
        // NOTE: results = {value: string}
        resolve(results as unknown as {value: string});
      }
    });
  });

export const getActivitySummary = async (
  options: HealthInputOptions = {startDate: new Date().toISOString()},
): Promise<HealthActivitySummary[]> =>
  await new Promise((resolve, reject) => {
    AppleHealthKit.getActivitySummary(options, (error, results) => {
      if (error != null) {
        console.log(error);
        reject(new Error(error));
      } else {
        resolve(results);
      }
    });
  });

type TObserverCallback = () => void;

const nativeEventEmitter = new NativeEventEmitter(NativeModules.AppleHealthKit);

/**
 * 백그라운드 환경에서 사용자의 운동 새 데이터 샘플 수신에 대해 관찰합니다.
 */
export const observeNewWorkout = (callback: TObserverCallback): void => {
  nativeEventEmitter.addListener('healthKit:Workout:new', () => {
    callback();
  });
};

/**
 * 백그라운드 환경에서 사용자가 소모한 활동에너지 새 데이터 샘플 수신에 대해 관찰합니다.
 * @see {@link https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier/1615771-activeenergyburned}
 */
export const observeNewActiveEnergyBurned = (
  callback: TObserverCallback,
): void => {
  nativeEventEmitter.addListener('healthKit:ActiveEnergyBurned:new', () => {
    callback();
  });
};

export * from 'react-native-health';
export {AppleHealthKit};
