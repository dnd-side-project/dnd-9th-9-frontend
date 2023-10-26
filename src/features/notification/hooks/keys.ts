export const KEYS = {
  all: ['notification'] as const,
  user: () => [...KEYS.all, 'user'],
};
