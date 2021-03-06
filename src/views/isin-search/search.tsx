import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from 'store.types';
import SearchState from 'services/isin-search/search.state';
import ListState from 'services/isin-list/list.state';
import { Company } from 'services/isin-search/search.state.types';

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
  addInstrument: (company: Company) => void;
  unsubscribe: (company: Company) => void;
  updateSearchTerm: (searchTerm: string) => void;
}

export const Search = ({
  companies,
  searchTerm,
  addInstrument,
  unsubscribe,
  reset,
  updateSearchTerm,
}: Props): JSX.Element => {
  const shouldShowNoResults: boolean = companies.length === 0;

  useEffect((): (() => void) => {
    return (): void => reset();
  }, [reset]);

  const onSearchInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      const {
        currentTarget: { value },
      } = e;

      updateSearchTerm(value);
    },
    [updateSearchTerm]
  );

  const handleResultItemClick = useCallback(
    (company: Company): void => {
      if (company.bookmarked) {
        unsubscribe(company);
      } else {
        addInstrument(company);
      }
    },
    [unsubscribe, addInstrument]
  );

  return (
    <Container>
      <SearchHeader>
        <SearchInput
          id="search"
          placeholder="Find your company"
          onChange={onSearchInputChange}
          label="Companies search"
          value={searchTerm}
        />
      </SearchHeader>
      {shouldShowNoResults ? (
        <NoResults>No results for {searchTerm}</NoResults>
      ) : (
        <ResultsList>
          {companies.map((company: Company): JSX.Element => {
            return (
              <ResultItem
                onPress={handleResultItemClick}
                key={company.isin}
                company={company}
              />
            );
          })}
        </ResultsList>
      )}
    </Container>
  );
};

/* istanbul ignore next */
const mapStateToProps = (state: CombinedAppState) => ({
  companies: SearchState.selectors.getCompanies(state),
  searchTerm: SearchState.selectors.getSearchTerm(state),
});

const mapDispatchToProps = {
  unsubscribe: ListState.actions.unsubscribe,
  addInstrument: ListState.actions.addInstrument,
  updateSearchTerm: SearchState.actions.updateSearchTerm,
  reset: SearchState.actions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
