import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from '../../store.types';
import SearchState from '../../services/isin-search/search.state';
import { Company } from '../../services/isin-search/search.state.types';
import ListState from '../../services/isin-list/list.state';

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
  updateSearchTerm: (searchTerm: string) => void;
}

export const Search = ({
  companies,
  searchTerm,
  addInstrument,
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

  const handleResultItemClick = useCallback(
    (company: Company): void => {
      addInstrument(company);
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
              <ResultItem onPress={handleResultItemClick} key={company.isin} company={company} />
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
  addInstrument: ListState.actions.addInstrument,
  updateSearchTerm: SearchState.actions.updateSearchTerm,
  reset: SearchState.actions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
