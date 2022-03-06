import { createSelector } from '@reduxjs/toolkit';

import isins from 'assets/isins.json';
import listState from 'services/isin-list/list.state';

import { Company, SearchAction, SearchState } from './search.state.types';

const REDUCER_NAME = 'search';

/** Action types */
const UPDATE_SEARCH_TERM = `${REDUCER_NAME}/UPDATE_SEARCH_TERM`;
const RESET = `${REDUCER_NAME}/RESET`;

/** Actions */
const updateSearchTerm = (searchTerm: string): SearchAction => ({
  type: UPDATE_SEARCH_TERM,
  payload: {
    searchTerm,
  },
});

const reset = (): SearchAction => ({
  type: RESET,
});

/** Initial state */
const initialState: SearchState = {
  searchTerm: '',
  companies: isins as Company[],
};

/** Reducer */
const reducer = (
  state: SearchState = initialState,
  action: SearchAction
): SearchState => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: payload!.searchTerm!,
      };
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

/** Selectors */
const searchTermSelector = ({
  search: { searchTerm },
}: {
  search: SearchState;
}): string => searchTerm;

const companiesSelector = ({
  search: { companies },
}: {
  search: SearchState;
}): Company[] => companies;

const selectFilteredCompanies = createSelector(
  [
    companiesSelector,
    searchTermSelector,
    listState.selectors.getInstrumentIsins,
  ],
  (companies: Company[], searchTerm: string, isins: string[]): Company[] =>
    companies
      .filter(
        ({ name, shortName }: Company): boolean =>
          name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          shortName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
      .map(
        (company: Company): Company => ({
          ...company,
          bookmarked: isins.includes(company.isin),
        })
      )
);

const selectSearchTerm = createSelector(
  searchTermSelector,
  (searchTerm: string): string => searchTerm
);

const searchState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    UPDATE_SEARCH_TERM,
    RESET,
  },
  selectors: {
    getCompanies: selectFilteredCompanies,
    getSearchTerm: selectSearchTerm,
  },
  actions: {
    reset,
    updateSearchTerm,
  },
};

export default searchState;
