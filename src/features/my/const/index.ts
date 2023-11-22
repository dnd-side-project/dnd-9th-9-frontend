import {theme} from '../../../assets/styles/theme';

export const LOGIN_TYPE = {
  APPLE: '애플',
  GOOGLE: '구글',
  KAKAO: '카카오',
  MATCH_UP: '매치업',
};

export const FLAMES = {
  gray: {
    title: '불 피지 않은 나무 성냥',
    subTitle: '아직 대결을 한 번도 하지 않으셨군요!',
    description: '매칭을 한 번도 하지 않았을 때의 호칭이에요.',
    color: theme.palette['gray-400'],
  },
  green: {
    title: '파릇파릇한 초록 불꽃',
    subTitle: '이제 막 열정에 불이 붙었어요!',
    description: '불꽃이 0.0 이상 1.0 미만일때 획득할 수 있는 호칭이에요.',
    color: theme.palette['main-400'],
  },
  red: {
    title: '열정적인 빨간 불꽃',
    subTitle: '멋진 열정을 갖고 계시네요!',
    description: '불꽃이 1.0 이상 2.0 미만일때 획득할 수 있는 호칭이에요.',
    color: theme.palette['error-dark'],
  },
  blue: {
    title: '타오르는 파란 불꽃',
    subTitle: '놀라운 열정을 갖고 계시네요!',
    description: '불꽃이 2.0 이상 3.0 미만일때 획득할 수 있는 호칭이에요.',
    color: theme.palette['blue-500'],
  },
  purple: {
    title: '매혹적인 자색 불꽃',
    subTitle: '대단한 열정을 갖고 계시네요!',
    description: '불꽃이 3.0 이상 5.0 이하일때 획득할 수 있는 호칭이에요.',
    color: theme.palette['sub-400'],
  },
  black: {
    title: '무시무시한 검은 불꽃',
    subTitle: '상위 5%의 승률의 소유자!',
    description:
      '불꽃이 4.0 이상 5.0 이하이며 승률이 상위 5%일때 획득할 수 있는 호칭이에요.',
    color: theme.palette['gray-900'],
  },
  white: {
    title: '전설적인 하얀 불꽃',
    subTitle: '상위 1%의 열정을 갖고 계시네요!',
    description:
      '불꽃이 4.5 이상 5.0 이하이며 승률이 상위 1%일때 획득할 수 있는 호칭이에요.',
    color: theme.palette['gray-0'],
  },
} as const;

// TODO(@minimalKim): 총 매칭 횟수, 상위 퍼센트 API 필요
export const getFlameData = (
  rate: number,
): {
  title: string;
  subTitle: string;
  description: string;
  color: string;
} => {
  if (rate < 1) {
    return FLAMES.green;
  } else if (rate < 2) {
    return FLAMES.red;
  } else if (rate < 3) {
    return FLAMES.blue;
  } else if (rate < 4) {
    return FLAMES.purple;
  } else if (rate < 4.5) {
    return FLAMES.black;
  } else {
    return FLAMES.white;
  }
};
