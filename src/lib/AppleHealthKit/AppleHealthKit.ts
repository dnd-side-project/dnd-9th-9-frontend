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

interface IHealthValue<T> {
  value: T;
}

export enum HealthStatusCode {
  NotDetermined = 0,
  SharingDenied = 1,
  SharingAuthorized = 2,
}

export const defaultPermissions: HealthKitPermissions = {
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

export const initHealthKit = async (
  permissions: HealthKitPermissions = defaultPermissions,
): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      // NOTE: error = object | null
      if (error != null) {
        // TODO: error screen 추가 필요
        reject(new Error(error));
      } else {
        resolve();
        console.log('initHealthKit');
      }
    });
  });
};

export const getAuthStatus = async (
  permissions: HealthKitPermissions = defaultPermissions,
): Promise<HealthStatusResult> =>
  await new Promise((resolve, reject) => {
    AppleHealthKit.getAuthStatus(permissions, (error, results) => {
      if (error != null) {
        reject(new Error(error));
      } else {
        resolve(results);
      }
    });
  });

export const getLatestHeight = async (): Promise<
  HealthValue | IHealthValue<null>
> =>
  await new Promise(resolve => {
    AppleHealthKit.getLatestHeight({}, (error, results) => {
      // NOTE: data 없을 경우 error 발생
      if (error != null) {
        resolve({value: null});
      } else {
        resolve({
          ...results,
          value: results.value * 2.54, // inch to cm
        });
      }
    });
  });

export const getLatestWeight = async (): Promise<
  HealthValue | IHealthValue<null>
> =>
  await new Promise(resolve => {
    AppleHealthKit.getLatestWeight(
      {unit: 'gram' as HealthUnit},
      (error, results) => {
        if (error != null) {
          // NOTE: data 없을 경우 error 발생
          resolve({value: null});
        } else {
          resolve({...results, value: results.value / 1000}); // gram to kilogram
        }
      },
    );
  });

export const getBiologicalSex = async (): Promise<
  IHealthValue<string | null>
> =>
  await new Promise(resolve => {
    AppleHealthKit.getBiologicalSex({}, (error, results) => {
      if (error != null) {
        // NOTE: data 없을 경우 error 발생
        resolve({value: null});
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
