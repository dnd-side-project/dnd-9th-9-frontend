import {type TSkillLevel} from '../../match/types';
import {type LOGIN_TYPE} from '../const';

export type TGender = 'FEMALE' | 'MALE';

export type TLoginType = keyof typeof LOGIN_TYPE;

export interface IProfileDetail {
  age: string;
  calorieGoal: number;
  gender: TGender;
  height: number;
  isAppleLinked: boolean;
  isNotificationAgreed: boolean;
  loginType: TLoginType;
  name: string;
  profileImg: string;
  skillLevel: TSkillLevel;
  teamworkRate: number;
  uid: string;
  weight: number;
}
