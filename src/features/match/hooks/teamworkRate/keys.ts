export const KEYS = {
  all: ['teamwork-rate'] as const,
  isRatingDone: (field: number) => [...KEYS.all, 'my-matching'] as const,
};
