import {TFieldType, TGoal, TPeriod, TSkillLevel, TStrength} from '.';

export interface IMatchDetail {
  id: number;
  profileImg: string;
  name: string;
  description: string;
  rule: string;
  fieldType: TFieldType;
  goal: TGoal;
  period: TPeriod;
  skillLevel: TSkillLevel;
  strength: TStrength;
  currentSize: number;
  maxSize: number;
  endDate: string;
}
