import {TFieldType, TGoal, TPeriod, TSkillLevel, TStrength} from '../types';

const getFieldType = (data: TFieldType) => {
  const fieldType = {
    DUEL: '1vs1',
    TEAM: '매칭안함',
    TEAM_BATTLE: '팀vs팀',
  };
  return fieldType[data];
};

const getPeriod = (data: TPeriod) => {
  const period = {
    ONE_WEEK: '1주',
    TWO_WEEKS: '2주',
    THREE_WEEKS: '3주',
  };
  return period[data];
};

const getGoal = (data: TGoal) => {
  const goal = {
    GAIN: '체중증량',
    LOSS: '다이어트',
    MAINTENANCE: '유지어터',
    PROFILE: '바디프로필',
  };
  return goal[data];
};

const getSkillLevel = (data: TSkillLevel) => {
  const skillLevel = {
    BEGINNER: '초보',
    INTERMEDIATE: '보통',
    ADVANCED_INTERMEDIATE: '보통이상',
    EXPERT: '고수',
  };
  return skillLevel[data];
};

const getStrength = (data: TStrength) => {
  const strength = {
    LOW: '초보',
    MODERATE: '보통',
    HIGH: '보통이상',
  };

  return strength[data];
};

export {getFieldType, getPeriod, getGoal, getSkillLevel, getStrength};
