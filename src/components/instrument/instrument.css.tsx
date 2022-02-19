import styled from 'styled-components';

import { fonts } from '../../styles/vars';
import { font } from '../../styles/mixins';

export const Container = styled.li`
  display: flex;
  flex-flow: row wrap;
`;

export const CompanyInfo = styled.div`
  flex: 0 1 100%;
  margin-bottom: 0.5rem;
`;

export const CompanyName = styled.h3`
  ${font(fonts.lg)}
  margin-bottom: 0.5rem;
`;

export const CompanyMetadata = styled.h4`
  ${font(fonts.xs)};
`;

export const PriceInfo = styled.ul`
  flex: 0 1 100%;
  flex-flow: row;
  display: flex;
`

export const PriceItem = styled.li`
  flex: 1;
  ${font(fonts.xs)}
`
