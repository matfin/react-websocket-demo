import styled, { css } from 'styled-components';

import { media } from './styles/mixins'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: brown;

  ${media.sm(css`
    background-color: red;
  `)}

  ${media.md(css`
    background-color: green;
  `)}

  ${media.lg(css`
    background-color: blue;
  `)}

  ${media.xl(css`
    background-color: yellow;
  `)}

  ${media.xxl(css`
    background-color: orange;
  `)}
`;