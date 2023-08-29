import {type HealthActivity} from './AppleHealthKit';

// TODO: backend에게 해당 데이터 공유 필요. API로 만들어질 시 제거 가능
export const WORKOUT_ACTIVITY: Record<
  HealthActivity,
  {label: string; emoji: string}
> = {
  AmericanFootball: {
    label: '미식축구',
    emoji: '⚽️',
  },
  Archery: {
    label: '양궁',
    emoji: '🏹',
  },
  AustralianFootball: {
    label: '호주식축구',
    emoji: '🏉',
  },
  Badminton: {
    label: '배드민턴',
    emoji: '🏸',
  },
  Baseball: {
    label: '야구',
    emoji: '⚾️',
  },
  Basketball: {
    label: '농구',
    emoji: '🏀',
  },
  Bowling: {
    label: '볼링',
    emoji: '🎳',
  },
  Boxing: {
    label: '복싱',
    emoji: '🥊',
  },
  CardioDance: {
    label: '댄스',
    emoji: '💃',
  },
  Climbing: {
    label: '등산',
    emoji: '🧗‍♂️',
  },
  Cooldown: {
    label: '쿨다운',
    emoji: '🧊',
  },
  Cricket: {
    label: '크리켓',
    emoji: '🏏',
  },
  CrossTraining: {
    label: '크로스 트레이닝',
    emoji: '🏋️‍♂️',
  },
  Curling: {
    label: '컬링',
    emoji: '🥌',
  },
  Cycling: {
    label: '사이클링',
    emoji: '🚴',
  },
  Dance: {
    label: '댄스',
    emoji: '💃',
  },
  DiscSports: {
    label: '디스크 스포츠',
    emoji: '🥏',
  },
  Elliptical: {
    label: '일립티컬',
    emoji: '🚶‍♀️',
  },
  EquestrianSports: {
    label: '승마',
    emoji: '🐎',
  },
  Fencing: {
    label: '펜싱',
    emoji: '🤺',
  },
  Fishing: {
    label: '낚시',
    emoji: '🎣',
  },
  FitnessGaming: {
    label: '피트니스 게임',
    emoji: '🎮',
  },
  FunctionalStrengthTraining: {
    label: '기능성 강도 훈련',
    emoji: '🏋️‍♂️',
  },
  Golf: {
    label: '골프',
    emoji: '⛳️',
  },
  Gymnastics: {
    label: '체조',
    emoji: '🤸',
  },
  Handball: {
    label: '핸드볼',
    emoji: '🤾‍♂️',
  },
  Hiking: {
    label: '하이킹',
    emoji: '🚶‍♂️',
  },
  Hockey: {
    label: '하키',
    emoji: '🏒',
  },
  Hunting: {
    label: '사냥',
    emoji: '🦌',
  },
  Lacrosse: {
    label: '라크로스',
    emoji: '🥍',
  },
  MartialArts: {
    label: '무술',
    emoji: '🥋',
  },
  MindAndBody: {
    label: '마음과 몸',
    emoji: '🧘',
  },
  PaddleSports: {
    label: '패들 스포츠',
    emoji: '🚣',
  },
  Pickleball: {
    label: '피클볼',
    emoji: '🏓',
  },
  Play: {
    label: '놀이',
    emoji: '🤹‍♂️',
  },
  PreparationAndRecovery: {
    label: '준비 및 회복 운동',
    emoji: '🧘',
  },
  Racquetball: {
    label: '라켓볼',
    emoji: '🏸',
  },
  Rowing: {
    label: '로잉',
    emoji: '🚣',
  },
  Rugby: {
    label: '럭비',
    emoji: '🏉',
  },
  Running: {
    label: '러닝',
    emoji: '🏃',
  },
  Sailing: {
    label: '요트',
    emoji: '⛵️',
  },
  SkatingSports: {
    label: '스케이팅 스포츠',
    emoji: '⛸',
  },
  SnowSports: {
    label: '스노우 스포츠',
    emoji: '🎿',
  },
  Soccer: {
    label: '축구',
    emoji: '⚽️',
  },
  SocialDance: {
    label: '소셜 댄스',
    emoji: '💃',
  },
  Softball: {
    label: '소프트볼',
    emoji: '🥎',
  },
  Squash: {
    label: '스쿼시',
    emoji: '🎾',
  },
  StairClimbing: {
    label: '계단 오르기',
    emoji: '🏃',
  },
  SurfingSports: {
    label: '서핑 스포츠',
    emoji: '🏄‍♂️',
  },
  Swimming: {
    label: '수영',
    emoji: '🏊‍♂️',
  },
  TableTennis: {
    label: '탁구',
    emoji: '🏓',
  },
  Tennis: {
    label: '테니스',
    emoji: '🎾',
  },
  TrackAndField: {
    label: '트랙 앤드 필드',
    emoji: '🏃',
  },
  TraditionalStrengthTraining: {
    label: '근력 강화 훈련',
    emoji: '🏋️‍♂️',
  },
  Volleyball: {
    label: '배구',
    emoji: '🏐',
  },
  Walking: {
    label: '걷기',
    emoji: '🚶‍♂️',
  },
  WaterFitness: {
    label: '수중 피트니스',
    emoji: '🏊‍♂️',
  },
  WaterPolo: {
    label: '수구',
    emoji: '🤽‍♂️',
  },
  WaterSports: {
    label: '수상 스포츠',
    emoji: '🏄‍♂️',
  },
  Wrestling: {
    label: '레슬링',
    emoji: '🤼‍♂️',
  },
  Yoga: {
    label: '요가',
    emoji: '🧘‍♂️',
  },
  Barre: {
    label: '바레',
    emoji: '💃',
  },
  CoreTraining: {
    label: '코어 트레이닝',
    emoji: '🏋️‍♂️',
  },
  CrossCountrySkiing: {
    label: '크로스컨트리 스키',
    emoji: '🎿',
  },
  DownhillSkiing: {
    label: '다운힐 스키',
    emoji: '🎿',
  },
  Flexibility: {
    label: '유연성',
    emoji: '🤸',
  },
  HighIntensityIntervalTraining: {
    label: '고강도 인터벌 트레이닝',
    emoji: '🏋️‍♂️',
  },
  JumpRope: {
    label: '줄넘기',
    emoji: '🏃',
  },
  Kickboxing: {
    label: '킥복싱',
    emoji: '🥊',
  },
  Pilates: {
    label: '필라테스',
    emoji: '🧘‍♂️',
  },
  Snowboarding: {
    label: '스노보드',
    emoji: '🏂',
  },
  Stairs: {
    label: '계단',
    emoji: '🏃',
  },
  StepTraining: {
    label: '스텝 트레이닝',
    emoji: '🏋️‍♂️',
  },
  WheelchairWalkPace: {
    label: '휠체어 걷기 속도',
    emoji: '🚶‍♂️',
  },
  WheelchairRunPace: {
    label: '휠체어 뛰기 속도',
    emoji: '🏃',
  },
  TaiChi: {
    label: '타이치',
    emoji: '🧘‍♂️',
  },
  MixedCardio: {
    label: '혼합 유산소 운동',
    emoji: '🏃',
  },
  HandCycling: {
    label: '핸드 사이클링',
    emoji: '🚴',
  },
} as const;

// TODO: 백엔드 response data 에 따라 수정함. 추후 하나로 픽스
export const WORKOUT_ACTIVITIES = {
  AMERICAN_FOOTBALL: {
    label: '미식축구',
    emoji: '⚽️',
  },
  ARCHERY: {
    label: '양궁',
    emoji: '🏹',
  },
  AUSTRALIAN_FOOTBALL: {
    label: '호주식축구',
    emoji: '🏉',
  },
  BADMINTON: {
    label: '배드민턴',
    emoji: '🏸',
  },
  BASEBALL: {
    label: '야구',
    emoji: '⚾️',
  },
  BASKETBALL: {
    label: '농구',
    emoji: '🏀',
  },
  BOWLING: {
    label: '볼링',
    emoji: '🎳',
  },
  BOXING: {
    label: '복싱',
    emoji: '🥊',
  },
  CARDIO_DANCE: {
    label: '댄스',
    emoji: '💃',
  },
  CLIMBING: {
    label: '등산',
    emoji: '🧗‍♂️',
  },
  CRICKET: {
    label: '크리켓',
    emoji: '🏏',
  },
  CROSS_TRAINING: {
    label: '크로스 트레이닝',
    emoji: '🏋️‍♂️',
  },
  CURLING: {
    label: '컬링',
    emoji: '🥌',
  },
  CYCLING: {
    label: '사이클링',
    emoji: '🚴',
  },
  DANCE: {
    label: '댄스',
    emoji: '💃',
  },
  ELLIPTICAL: {
    label: '일립티컬',
    emoji: '🚶‍♀️',
  },
  EQUESTRIAN_SPORTS: {
    label: '승마',
    emoji: '🐎',
  },
  FENCING: {
    label: '펜싱',
    emoji: '🤺',
  },
  FISHING: {
    label: '낚시',
    emoji: '🎣',
  },
  FUNCTIONAL_STRENGTH_TRAINING: {
    label: '기능성 강도 훈련',
    emoji: '🏋️‍♂️',
  },
  GOLF: {
    label: '골프',
    emoji: '⛳️',
  },
  GYMNASTICS: {
    label: '체조',
    emoji: '🤸',
  },
  HANDBALL: {
    label: '핸드볼',
    emoji: '🤾‍♂️',
  },
  HIKING: {
    label: '하이킹',
    emoji: '🚶‍♂️',
  },
  HOCKEY: {
    label: '하키',
    emoji: '🏒',
  },
  HUNTING: {
    label: '사냥',
    emoji: '🦌',
  },
  LACROSSE: {
    label: '라크로스',
    emoji: '🥍',
  },
  MARTIAL_ARTS: {
    label: '무술',
    emoji: '🥋',
  },
  MIND_AND_BODY: {
    label: '마음과 몸',
    emoji: '🧘',
  },
  PADDLE_SPORTS: {
    label: '패들 스포츠',
    emoji: '🚣',
  },
  PLAY: {
    label: '놀이',
    emoji: '🤹‍♂️',
  },
  PREPARATION_AND_RECOVERY: {
    label: '준비 및 회복 운동',
    emoji: '🧘',
  },
  RACQUETBALL: {
    label: '라켓볼',
    emoji: '🏸',
  },
  ROWING: {
    label: '로잉',
    emoji: '🚣',
  },
  RUGBY: {
    label: '럭비',
    emoji: '🏉',
  },
  RUNNING: {
    label: '러닝',
    emoji: '🏃',
  },
  SAILING: {
    label: '요트',
    emoji: '⛵️',
  },
  SKATING_SPORTS: {
    label: '스케이팅 스포츠',
    emoji: '⛸',
  },
  SNOW_SPORTS: {
    label: '스노우 스포츠',
    emoji: '🎿',
  },
  SOCCER: {
    label: '축구',
    emoji: '⚽️',
  },
  SOFTBALL: {
    label: '소프트볼',
    emoji: '🥎',
  },
  SQUASH: {
    label: '스쿼시',
    emoji: '🎾',
  },
  STAIR_CLIMBING: {
    label: '계단 오르기',
    emoji: '🏃',
  },
  SURFING_SPORTS: {
    label: '서핑 스포츠',
    emoji: '🏄‍♂️',
  },
  SWIMMING: {
    label: '수영',
    emoji: '🏊‍♂️',
  },
  TABLE_TENNIS: {
    label: '탁구',
    emoji: '🏓',
  },
  TENNIS: {
    label: '테니스',
    emoji: '🎾',
  },
  TRACK_AND_FIELD: {
    label: '트랙 앤드 필드',
    emoji: '🏃',
  },
  TRADITIONAL_STRENGTH_TRAINING: {
    label: '근력 강화 훈련',
    emoji: '🏋️‍♂️',
  },
  VOLLEYBALL: {
    label: '배구',
    emoji: '🏐',
  },
  WALKING: {
    label: '걷기',
    emoji: '🚶‍♂️',
  },
  WATER_FITNESS: {
    label: '수중 피트니스',
    emoji: '🏊‍♂️',
  },
  WATER_POLO: {
    label: '수구',
    emoji: '🤽‍♂️',
  },
  WATER_SPORTS: {
    label: '수상 스포츠',
    emoji: '🏄‍♂️',
  },
  WRESTLING: {
    label: '레슬링',
    emoji: '🤼‍♂️',
  },
  YOGA: {
    label: '요가',
    emoji: '🧘‍♂️',
  },
  BARRE: {
    label: '바레',
    emoji: '💃',
  },
  CORE_TRAINING: {
    label: '코어 트레이닝',
    emoji: '🏋️‍♂️',
  },
  CROSS_COUNTRY_SKIING: {
    label: '크로스컨트리 스키',
    emoji: '🎿',
  },
  DOWNHILL_SKIING: {
    label: '다운힐 스키',
    emoji: '🎿',
  },
  FLEXIBILITY: {
    label: '유연성',
    emoji: '🤸',
  },
  HIGH_INTENSITY_INTERVAL_TRAINING: {
    label: '고강도 인터벌 트레이닝',
    emoji: '🏋️‍♂️',
  },
  JUMP_ROPE: {
    label: '줄넘기',
    emoji: '🏃',
  },
  KICKBOXING: {
    label: '킥복싱',
    emoji: '🥊',
  },
  PILATES: {
    label: '필라테스',
    emoji: '🧘‍♂️',
  },
  SNOWBOARDING: {
    label: '스노보드',
    emoji: '🏂',
  },
  STAIRS: {
    label: '계단',
    emoji: '🏃',
  },
  STEP_TRAINING: {
    label: '스텝 트레이닝',
    emoji: '🏋️‍♂️',
  },
  WHEELCHAIR_WALK_PACE: {
    label: '휠체어 걷기 속도',
    emoji: '🚶‍♂️',
  },
  WHEELCHAIR_RUN_PACE: {
    label: '휠체어 뛰기 속도',
    emoji: '🏃',
  },
  TAI_CHI: {
    label: '타이치',
    emoji: '🧘‍♂️',
  },
  MIXED_CARDIO: {
    label: '혼합 유산소 운동',
    emoji: '🏃',
  },
  HAND_CYCLING: {
    label: '핸드 사이클링',
    emoji: '🚴',
  },
} as const;
