const palette = {
  'main-400': '#01D281',
  'main-300': '#4EE0A7',
  'main-200': '#80E9C0',
  'main-100': '#B3F2DA',
  'error-light': '#FF6565',
  'error-dark': '#FF4646',
  'sub-400': '#C781FF',
  'blue-400': '#62B3FF',
  'gray-0': '#FFFFFF',
  'gray-50': '#F7F7FA',
  'gray-100': '#F0F0F5',
  'gray-200': '#E8E8EE',
  'gray-300': '#E1E1E8',
  'gray-400': '#CDCED6',
  'gray-500': '#A9ABB8',
  'gray-600': '#858899',
  'gray-700': '#525463',
  'gray-800': '#3E404C',
  'gray-900': '#2B2D36',
  'gray-950': '#252730',
  black: '#000000',
} as const;

const typography = {
  head1: {
    fontFamily: 'Pretendard-Bold',
    fontSize: '34px',
  },
  head2: {
    fontFamily: 'Pretendard-Bold',
    fontSize: '26px',
  },
  head3: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: '24px',
  },
  head4: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: '20px',
  },
  body1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: '18px',
  },
  body2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: '16px',
  },
  body3: {
    fontFamily: 'Pretendard-Regular',
    fontSize: '14px',
  },
  caption: {
    fontFamily: 'Pretendard-Regular',
    fontSize: '12px',
  },
} as const;

const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '22px',
} as const;

export const theme = {
  palette,
  typography,
  borderRadius,
};
