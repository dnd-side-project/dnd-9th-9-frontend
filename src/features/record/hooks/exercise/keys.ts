export const KEYS = {
  all: ['exercise'] as const,
  list: (date: string) => [...KEYS.all, 'list', {date}] as const,
  detail: (id: number) => [...KEYS.all, 'detail', id] as const,
  calorie: (date: string) => [...KEYS.all, 'calorie', {date}] as const,
  summary: (date: string) => [...KEYS.all, 'summary', {date}] as const,
  recent: (date: string) => [...KEYS.all, 'recent', {date}] as const,
};
