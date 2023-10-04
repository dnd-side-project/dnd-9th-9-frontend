export const KEYS = {
  all: ['health-kit'] as const,

  auth: () => [...KEYS.all, 'auth'] as const,

  latestHeight: () => [...KEYS.all, 'latest-height'] as const,
  latestWeight: () => [...KEYS.all, 'latest-weight'] as const,
  biologicalSex: () => [...KEYS.all, 'biological-sex'] as const,

  activitySummary: () => [...KEYS.all, 'activity-summary'] as const,
};
