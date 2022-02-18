import styled from 'styled-components';

import { fonts } from '../../styles/vars';
import { font } from '../../styles/mixins';

export const Container = styled.li`
  display: flex;
  flex-flow: row wrap;
`;

export const Title = styled.h2`
  flex: 0 1 100%;
  ${font(fonts.lg)};
  margin-bottom: 0.5rem;
`

export const Isin = styled.h3`
  flex: 0 1 75%;
  ${font(fonts.sm)};
`

export const ShortName = styled.h3`
  flex: 0 1 25%;
  ${font(fonts.sm)};
`