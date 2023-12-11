export const KEYS = {
  all: ['teamwork-rate'] as const,

  teamworkRateHistory: () => [...KEYS.all, 'history'] as const,
};
