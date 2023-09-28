export const KEYS = {
  all: ['my'] as const,

  profileDetail: () => [...KEYS.all, 'profile-detail'] as const,
};
