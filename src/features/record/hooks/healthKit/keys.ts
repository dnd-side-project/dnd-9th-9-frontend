import {type HealthKitPermissions} from '../../../../lib/AppleHealthKit';

export const KEYS = {
  all: ['health-kit'] as const,
  auth: (permissions: HealthKitPermissions) =>
    [...KEYS.all, 'auth', permissions] as const,
};
