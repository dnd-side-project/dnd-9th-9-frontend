export const KEYS = {
  all: ['field'] as const,
  list: (
    page: number,
    size: number,
    fieldType: string,
    goal: string[],
    memberCount: number,
    period: string,
    skillLevel: string[],
    strength: string[],
  ) =>
    [
      ...KEYS.all,
      'list',
      {page, size, fieldType, goal, memberCount, period, skillLevel, strength},
    ] as const,
  detail: (id: number) => [...KEYS.all, 'detail', id] as const,
  detailTerminate: (id: number) => [...KEYS.detail(id), 'terminate'],
  auto: (type: string) => [...KEYS.all, 'auto', {type}],
};
