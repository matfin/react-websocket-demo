import styled from 'styled-components';

import { fonts } from 'styles/vars';
import { font } from 'styles/mixins';

import { Bookmark, BookmarkFilled } from '../svg';

export const Container = styled.li`
  position: relative;
  display: flex;
  flex-flow: row wrap;
`;

export const Title = styled.h2`
  flex: 0 1 100%;
  ${font(fonts.lg)};
  margin-bottom: 0.5rem;
`;

export const CompanyDetails = styled.h3`
  flex: 0 1 100%;
  ${font(fonts.sm)};
`;

export const BookmarkButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  
`;

export const BookmarkIcon = styled(Bookmark)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const BookmarkFilledIcon = styled(BookmarkFilled)`
  width: 1.5rem;
  height: 1.5rem;
`;
