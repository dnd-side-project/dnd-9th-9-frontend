import {type TSkillLevel} from '.';

export interface IUserField {
  id: number;
  isLeader: boolean;
  name: string;
  profileImg: string;
  skillLevel: TSkillLevel;
}

export interface IUserFieldListInfo extends Array<IUserField> {}
