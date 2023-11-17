import {type TFieldType, type TGoal, type TPeriod, type TSkillLevel} from '.';

export interface IUserField {
  id: number;
  isLeader: boolean;
  name: string;
  profileImg: string;
  skillLevel: TSkillLevel;
}

export interface IUserFieldListInfo extends Array<IUserField> {}

export interface IUserFieldMyMatch {
  currentSize: number;
  fieldType: TFieldType;
  goal: TGoal;
  id: number;
  leader: boolean;
  maxSize: number;
  name: string;
  period: TPeriod;
  profileImg: string;
  skillLevel: TSkillLevel;
}
