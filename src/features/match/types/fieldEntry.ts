import {type TSkillLevel, type TFieldType, type TPeriod} from '.';

export interface IFieldEntryBattle {
  targetFieldId: number;
  battleType: TFieldType;
}

export interface IFieldEntryTeam {
  targetFieldId: number;
  teamType: TFieldType;
}

export interface ITeamEntry {
  entryId: number;
  name: string;
  profileImg: string;
  skillLevel: TSkillLevel;
  userId: number;
}

export interface IBattleEntry {
  currentSize: number;
  entryId: number;
  fieldId: number;
  fieldType: TFieldType;
  maxSize: number;
  name: string;
  period: TPeriod;
  skillLevel: TSkillLevel;
}
