import {type ValueOf} from '../../../utils/types';
import {
  type FieldTypes,
  type Periods,
  type Goals,
  type SkillLevels,
  type Strengths,
  type MyMatchStatus,
} from '../const';

export type TFieldType = keyof typeof FieldTypes;
export type TFieldTypeLabel = ValueOf<typeof FieldTypes>;

export type TPeriod = keyof typeof Periods;
export type TPeriodLabel = ValueOf<typeof Periods>;

export type TGoal = keyof typeof Goals;
export type TGoalLabel = ValueOf<typeof Goals>;

export type TSkillLevel = keyof typeof SkillLevels;
export type TSkillLevelLabel = ValueOf<typeof SkillLevels>;

export type TStrength = keyof typeof Strengths;
export type TStrengthLabel = ValueOf<typeof Strengths>;

export type TMyMatchStatus = keyof typeof MyMatchStatus;
export type TMyMatchStatusLabel = ValueOf<typeof MyMatchStatus>;

export type TUserRole = 'MEMBER' | 'LEADER' | 'GUEST';

export * from './detail';
export * from './field';
export * from './userField';
export * from './fieldEntry';
