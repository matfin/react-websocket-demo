import styled from 'styled-components';

import { boxShadow, fonts } from 'styles/vars';
import { font } from 'styles/mixins';
import TextInput from 'components/text-input';
import SearchResult from 'components/search-result';

export const Container = styled.div`
  display: grid;
  width: 100%;
  grid: 4rem auto / auto;
  grid-template-areas:
    'searchbox'
    'list';
`;

export const SearchHeader = styled.div`
  grid-area: searchbox;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled(TextInput)`
  flex: 1;
  margin: 0 1rem;
  height: 4rem;
`;

export const ResultsList = styled.ul`
  grid-area: list;
`;

export const ResultItem = styled(SearchResult)`
  margin: 1rem;
  padding: 0.5rem;
  ${boxShadow};
`;

export const NoResults = styled.h2`
  margin: 2rem 1rem 0;
  ${font(fonts.md)};
`;

