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
  sm: Font;
  md: Font;
  lg: Font;
  xl: Font;
};

export type Colours = {
  primary: string;
  secondary: string;
  tertiary: string;
  cta: string;
};
