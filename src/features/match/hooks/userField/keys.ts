export const KEYS = {
  all: ['user-field'] as const,
  list: (id: number) => [...KEYS.all, 'list', id] as const,
};
