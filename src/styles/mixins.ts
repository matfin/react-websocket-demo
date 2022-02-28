import { FlattenSimpleInterpolation } from 'styled-components';

import { Font } from './vars.types';
import { breakpoints } from './vars';

export const sizeQuery = (
  minWidth: number,
  styling: FlattenSimpleInterpolation | string
): string => `@media (min-width: ${minWidth}px){${styling}}`;

export const media = {
  sm: (styling: FlattenSimpleInterpolation | string): string => sizeQuery(breakpoints.sm, styling),
  md: (styling: FlattenSimpleInterpolation | string): string => sizeQuery(breakpoints.md, styling),
  lg: (styling: FlattenSimpleInterpolation | string): string => sizeQuery(breakpoints.lg, styling),
  xl: (styling: FlattenSimpleInterpolation | string): string => sizeQuery(breakpoints.xl, styling),
  xxl: (styling: FlattenSimpleInterpolation | string): string => sizeQuery(breakpoints.xxl, styling),
}


export const font = ({ lineHeight, size }: Font) => `
  font-size: ${size}rem;
  line-height: ${lineHeight}rem;
`;