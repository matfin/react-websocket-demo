import isins from '../../assets/isins.json';

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

const initialState: SearchState = {
  searchTerm: '',
  companies: (isins as Company[]),
};

/** Reducer */
const reducer = (
  state: SearchState = initialState,
  action: SearchAction
): SearchState => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SEARCH_TERM: {
      return handleUpdateSearchTerm(state, payload!.searchTerm!);
    }
    case RESET:
      return initialState;
    default:
      return state;
  }
};

/** Redux state update utilities */
export const handleUpdateSearchTerm = (
  state: SearchState,
  searchTerm: string
): SearchState => {
  const searchEmpty = searchTerm.length === 0;
  const companies = (isins as Company[]);
  const filteredCompanies: Company[] = companies.filter(({ name, shortName }: Company): boolean =>
    name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    ...state,
    companies: searchEmpty ? companies : filteredCompanies,
    searchTerm,
  };
};

/** Selectors */
const getSearchTerm = ({ search }: { search: SearchState }): string =>
  search.searchTerm;

const getCompanies = ({ search }: { search: SearchState }): Company[] =>
  search.companies;

const searchState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    UPDATE_SEARCH_TERM,
    RESET,
  },
  selectors: {
    getCompanies,
    getSearchTerm,
  },
  actions: {
    reset,
    updateSearchTerm,
  },
};

export default searchState;
