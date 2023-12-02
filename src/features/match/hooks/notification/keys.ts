export const KEYS = {
  all: ['notification'] as const,
  field: (id: number) =>
    [
      ...KEYS.all,
      'field',
      {
        id,
      },
    ] as const,
};
