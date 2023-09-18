import {type TSkillLevel, type TFieldType} from '.';

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
