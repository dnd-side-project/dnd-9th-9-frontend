import {
  type TPeriod,
  type TFieldType,
  type TGoal,
  type TSkillLevel,
  type TStrength,
} from '.';

// 프로필 탭
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

// 매칭 탭
export interface IMatchApply {
  entryId: number;
  matchId: number;
  name: string;
  memberCount: number;
  memberMaxCount: number;
  fieldType: TFieldType;
  period: TPeriod;
  skillLevel: TSkillLevel;
}

export interface IMatchDetailApply {
  fieldEntriesInfos: IMatchApply[];
  totalCount: number;
}
