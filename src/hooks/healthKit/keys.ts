export const KEYS = {
  all: ['health-kit'] as const,
  auth: () => [...KEYS.all, 'auth'] as const,
};
