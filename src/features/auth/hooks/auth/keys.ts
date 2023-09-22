export const KEYS = {
  all: ['auth'] as const,
  idAvailable: (uid: string) => [...KEYS.all, 'id-available', {uid}] as const,
};
