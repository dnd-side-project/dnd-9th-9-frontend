export const KEYS = {
  all: ['my'] as const,

  profileDetail: () => [...KEYS.all, 'profile-detail'] as const,
  onboardProfile: () => [...KEYS.all, 'onboard-profile'] as const,
};
