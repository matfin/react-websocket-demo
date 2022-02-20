import styled from 'styled-components';

import { fonts } from '../../styles/vars';
import { font } from '../../styles/mixins';
import { Thrash } from '../svg';

export const Container = styled.li`
  position: relative;
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
`;

export const PriceItem = styled.li`
  flex: 1;
  ${font(fonts.xs)}
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
`;

export const DeleteIcon = styled(Thrash)`
  width: 1.5rem;
  height: 1.5rem;
`;
