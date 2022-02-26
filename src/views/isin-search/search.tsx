import React, { useCallback, useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from '../../store.types';
import SearchState from '../../services/isin-search/search.state';
import ListState from '../../services/isin-list/list.state';
import { Company } from '../../services/isin-search/search.state.types';
import { Props as SearchResultProps } from '../../components/search-result/search-result';

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

const MemoResultItem = memo(
  (props: SearchResultProps): JSX.Element => <ResultItem {...props} />
);

MemoResultItem.displayName = 'SearchResult';

export const Search = ({
  companies,
  searchTerm,
  addInstrument,
  unsubscribe,
  reset,
  updateSearchTerm,
}: Props): JSX.Element => {
  const [shouldShowNoResults, setShouldShowNoResults] = useState<boolean>(false);

  useEffect((): (() => void) => {
    return (): void => reset();
  }, []);

  useEffect((): void => {
    const hasNoCompanies: boolean = companies.length === 0;

    setShouldShowNoResults(hasNoCompanies);
  }, [companies]);

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
      if (company.bookmarked) {
        unsubscribe(company);
      } else {
        addInstrument(company);
      }
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
      {shouldShowNoResults ? (
        <NoResults>No results for {searchTerm}</NoResults>
      ) : (
        <ResultsList>
          {companies.map((company: Company): JSX.Element => {
            return (
              <MemoResultItem
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
