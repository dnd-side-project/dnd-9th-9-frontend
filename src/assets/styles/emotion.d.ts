import '@emotion/react';

export type Tpalette =
  | 'main-400'
  | 'main-300'
  | 'main-200'
  | 'main-100'
  | 'error-light'
  | 'error-dark'
  | 'sub-400'
  | 'gray-0'
  | 'gray-50'
  | 'gray-100'
  | 'gray-200'
  | 'gray-300'
  | 'gray-400'
  | 'gray-500'
  | 'gray-600'
  | 'gray-700'
  | 'gray-800'
  | 'gray-900'
  | 'gray-950'
  | black;

export type Ttypography =
  | 'head1'
  | 'head2'
  | 'head3'
  | 'head4'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption';

export type TBorderRadius = 'sm' | 'md' | 'lg';

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      [key in Tpalette]: string;
    };
    typography: {
      [key in Ttypography]: {
        fontFamily: string;
        fontSize: string | number;
      };
    };
    borderRadius: {
      [key in TBorderRadius]: string;
    };
  }
}
