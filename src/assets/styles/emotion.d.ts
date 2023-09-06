import '@emotion/react';
import {type theme} from './theme';

export type TPalette = keyof typeof theme.palette;
export type TTypography = keyof typeof theme.typography;
export type TBorderRadius = keyof typeof theme.borderRadius;

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof theme.palette;
    typography: typeof theme.typography;
    borderRadius: typeof theme.borderRadius;
  }
}
