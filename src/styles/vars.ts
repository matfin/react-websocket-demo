import { css } from 'styled-components';
import { Breakpoints, Colours, Fonts, FontWeights } from './vars.types';

export const breakpoints: Breakpoints = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
};

export const fonts: Fonts = {
  xs: {
    size: 0.8,
    lineHeight: 1.0,
  },
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

export const fontWeights: FontWeights = {
  ultraLight: 100,
  light: 300,
  strong: 400,
  strongest: 600,
};

export const colours: Colours = {
  primary: '#000',
  secondary: '#fff',
  tertiary: '#8090a0',
  success: '#00ab66',
  warning: '#ff5833',
  error: '#ed4337',
};

export const boxShadow = css`
  box-shadow: rgb(0 0 0 / 30%) 0 1px 3px;
`;
