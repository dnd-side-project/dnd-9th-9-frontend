const FieldTypes = {
  DUEL: '1vs1',
  TEAM: '매칭안함',
  TEAM_BATTLE: '팀vs팀',
} as const;

const Periods = {
  ONE_WEEK: '1주',
  TWO_WEEKS: '2주',
  THREE_WEEKS: '3주',
} as const;

const Goals = {
  GAIN: '체중증량',
  LOSS: '다이어트',
  MAINTENANCE: '유지어터',
  PROFILE: '바디프로필',
} as const;

const SkillLevels = {
  BEGINNER: '초보',
  INTERMEDIATE: '보통',
  ADVANCED_INTERMEDIATE: '보통이상',
  EXPERT: '고수',
} as const;

const Strengths = {
  LOW: '초보',
  MODERATE: '보통',
  HIGH: '보통이상',
} as const;

const MyMatchStatus = {
  APPLICATION: '신청',
  PROGRESS: '진행중',
  COMPLETE: '진행완료',
} as const;

const WinStatus = {
  WIN: '🔥 현재 우리팀이 앞서고 있어요!',
  LOSE: '🔥 상대팀이 이기고 있어요. 좀 더 힘내서 앞서볼까요?',
  DRAW: '🔥 현재 동점이에요. 좀 더 힘내서 앞서볼까요?',
  DEFAULT: '🔥 오늘도 파이팅!',
} as const;

export {
  FieldTypes,
  Periods,
  Goals,
  SkillLevels,
  Strengths,
  MyMatchStatus,
  WinStatus,
};
