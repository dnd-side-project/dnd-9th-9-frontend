import {type TSkillLevel} from '../../match/types';

export type TGender = 'FEMALE' | 'MALE';

export type TLoginType = 'APPLE' | 'GOOGLE' | 'KAKAO' | 'MATCH_UP';

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
