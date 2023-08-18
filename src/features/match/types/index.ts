export type TFieldType = 'DUEL' | 'TEAM' | 'TEAM_BATTLE';
export type TPeriod = 'ONE_WEEK' | 'TWO_WEEKS' | 'THREE_WEEKS';
export type TGoal = 'GAIN' | 'LOSS' | 'MAINTENANCE' | 'PROFILE';
export type TSkillLevel =
  | 'ADVANCED_INTERMEDIATE'
  | 'BEGINNER'
  | 'EXPERT'
  | 'INTERMEDIATE';
export type TStrength = 'HIGH' | 'LOW' | 'MODERATE';

export * from './detail';
export * from './member';

export * from './field';
export * from './userField';
