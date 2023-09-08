import {type TSkillLevel} from '.';

export interface IUserFieldListInfo
  extends Array<{
    id: number;
    isLeader: boolean;
    name: string;
    profileImg: string;
    skillLevel: TSkillLevel;
  }> {}
