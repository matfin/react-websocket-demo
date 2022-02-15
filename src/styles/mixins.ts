import { css, FlattenSimpleInterpolation } from 'styled-components';

import { Font } from './vars.types';
import { breakpoints } from './vars';

export const sizeQuery = (
  minWidth: number,
  css: FlattenSimpleInterpolation
): string => `@media (min-width: ${minWidth}px){${css}}`;

export const media = {
  sm: (css: FlattenSimpleInterpolation): string => sizeQuery(breakpoints.sm, css),
  md: (css: FlattenSimpleInterpolation): string => sizeQuery(breakpoints.md, css),
  lg: (css: FlattenSimpleInterpolation): string => sizeQuery(breakpoints.lg, css),
  xl: (css: FlattenSimpleInterpolation): string => sizeQuery(breakpoints.xl, css),
  xxl: (css: FlattenSimpleInterpolation): string => sizeQuery(breakpoints.xxl, css),
}


export const font = ({ lineHeight, size }: Font) => css`
  font-size: ${size}rem;
  line-height: ${lineHeight}rem;
`;