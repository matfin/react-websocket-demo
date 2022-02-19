export interface Font {
  size: number;
  lineHeight: number;
}

export type Breakpoints = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

export type Fonts = {
  xs: Font;
  sm: Font;
  md: Font;
  lg: Font;
  xl: Font;
};

export type FontWeights = {
  ultraLight: number;
  light: number;
  strong: number;
  strongest: number;
}

export type Colours = {
  primary: string;
  secondary: string;
  tertiary: string;
  cta: string;
};
