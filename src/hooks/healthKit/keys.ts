import {type HealthKitPermissions} from '../../lib/AppleHealthKit';

export const KEYS = {
  all: ['health-kit'] as const,

  auth: (permissions?: HealthKitPermissions) =>
    [...KEYS.all, 'auth', {permissions}] as const,

  latestHeight: () => [...KEYS.all, 'latest-height'] as const,
  latestWeight: () => [...KEYS.all, 'latest-weight'] as const,
  biologicalSex: () => [...KEYS.all, 'biological-sex'] as const,

  activitySummary: () => [...KEYS.all, 'activity-summary'] as const,
};
