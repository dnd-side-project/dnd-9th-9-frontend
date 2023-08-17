export const KEYS = {
  all: ['bookmark'] as const,
  list: () => [...KEYS.all, 'list'] as const,
};
