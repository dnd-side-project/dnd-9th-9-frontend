import '@emotion/react';
import {type theme} from './theme';

export type TPalette = keyof typeof theme.palette;
export type TTypography = keyof typeof theme.typography;
export type TBorderRadius = keyof typeof theme.borderRadius;

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      [key in TPalette]: string;
    };
    typography: {
      [key in TTypography]: {
        fontFamily: string;
        fontSize: string | number;
      };
    };
    borderRadius: {
      [key in TBorderRadius]: string;
    };
  }
}
