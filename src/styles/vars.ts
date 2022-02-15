import { Breakpoints, Colours, Fonts } from './vars.types';

export const breakpoints: Breakpoints = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
};

export const fonts: Fonts = {
  sm: {
    size: 1.0,
    lineHeight: 1.3,
  },
  md: {
    size: 1.3,
    lineHeight: 1.6,
  },
  lg: {
    size: 2.0,
    lineHeight: 2.4,
  },
  xl: {
    size: 3.0,
    lineHeight: 3.6,
  },
};

export const colours: Colours = {
  primary: '#000',
  secondary: '#fff',
  tertiary: '#8090a0',
  cta: '#ff5833',
};
