import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from '../../store.types';
import SearchState from '../../services/isin-search/search.state';
import { Company } from '../../services/isin-search/search.state.types';

import {
  Container,
  NoResults,
  ResultItem,
  ResultsList,
  SearchHeader,
  SearchInput,
} from './search.css';

export interface Props {
  companies: Company[];
  searchTerm: string | undefined;

  reset: () => void;
  updateSearchTerm: (searchTerm: string) => void;
}

export const Search = ({
  companies,
  searchTerm,
  reset,
  updateSearchTerm,
}: Props): JSX.Element => {
  const shouldShowNoResults = companies.length === 0;

  useEffect((): (() => void) => {
    return (): void => reset();
  }, []);

  const onSearchInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      const {
        currentTarget: { value },
      } = e;

      updateSearchTerm(value);
    },
    []
  );

  return (
    <Container>
      <SearchHeader>
        <SearchInput
          placeholder="Find your company"
          onChange={onSearchInputChange}
          ariaLabel="companies-search"
          value={searchTerm}
        />
      </SearchHeader>
      {
        shouldShowNoResults ? (
          <NoResults>
            No results for {searchTerm}
          </NoResults>
        ) : (
          <ResultsList>
            {companies.map((company: Company): JSX.Element => (
              <ResultItem key={company.isin} company={company} />
            ))}
          </ResultsList>
        )
      }
    </Container>
  );
};

/* istanbul ignore next */
const mapStateToProps = (store: CombinedAppState) => ({
  companies: SearchState.selectors.getCompanies(store),
  searchTerm: SearchState.selectors.getSearchTerm(store),
});

const mapDispatchToProps = {
  updateSearchTerm: SearchState.actions.updateSearchTerm,
  reset: SearchState.actions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
