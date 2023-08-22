import {
  type TPeriod,
  type TFieldType,
  type TGoal,
  type TSkillLevel,
  type TStrength,
} from '.';

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

export interface IMatchDetailRecord {
  burnedCalorie: number;
  durationMinute: number;
  exerciseDateTime: string; // yyyy-MM-dd HH:mm:ss
  id: number;
  isLeader: boolean;
  isMemoPublic: boolean;
  memoContent: string;
  memoImg: string;
  name: string;
  profileImg: string;
  sports: string; // TODO: 추후 TSports enum 으로 변경
  userId: number;
}
