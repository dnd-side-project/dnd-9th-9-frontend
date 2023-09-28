import {type TSkillLevel} from '../../match/types';

export type TGender = 'FEMALE' | 'MALE';

// TODO(@minimalKim): 백엔드 Enum 확인
export type TLoginType = 'APPLE' | 'GOOGLE' | 'KAKAO';

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
