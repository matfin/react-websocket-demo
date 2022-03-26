import isins from 'assets/isins.json';

import { CombinedAppState } from 'store.types';
import searchState from './search.state';
import { Company, SearchState } from './search.state.types';

import mockState from 'mocks/mockState';

describe('search state', (): void => {
  describe('actions', (): void => {
    it('returns the correct payload for updateSearchTerm', (): void => {
      expect(searchState.actions.updateSearchTerm('Test')).toEqual({
        type: searchState.types.UPDATE_SEARCH_TERM,
        payload: {
          searchTerm: 'Test',
        },
      });
    });

    it('returns the correct payload for reset', (): void => {
      expect(searchState.actions.reset()).toEqual({
        type: searchState.types.RESET,
      });
    });
  });

  describe('reducer', (): void => {
    it('sets the state with UPDATE_SEARCH_TERM', (): void => {
      const dummyState: SearchState = {
        searchTerm: '',
        companies: [],
      };
      const result: SearchState = searchState.reducer(
        dummyState,
        searchState.actions.updateSearchTerm('Test')
      );
      const expected: SearchState = {
        searchTerm: 'Test',
        companies: [],
      };

      expect(result).toEqual(expected);
    });

    it('resets the state with RESET', (): void => {
      const dummyState: SearchState = {
        searchTerm: '',
        companies: [],
      };
      const result: SearchState = searchState.reducer(
        dummyState,
        searchState.actions.reset()
      );
      const expected: SearchState = {
        searchTerm: '',
        companies: isins as Company[],
      };

      expect(result).toEqual(expected);
    });

    it('returns the default state', (): void => {
      const initalState: SearchState = {
        searchTerm: '',
        companies: isins as Company[],
      };
      const result: SearchState = searchState.reducer(undefined, {
        type: 'SOMETHING_ELSE',
      });

      expect(result).toEqual(initalState);
    });
  });

  describe('selectors', (): void => {
    const searchTerm = 'Test search term';
    const companies: Company[] = [
      { name: 'Company one', shortName: 'ONE', isin: 'IE1', bookmarked: false },
      { name: 'Company two', shortName: 'TWO', isin: 'IE2', bookmarked: false },
    ];
    const appState: CombinedAppState = {
      ...mockState,
      search: {
        companies,
        searchTerm,
      },
    };

    it('getSearchTerm', (): void => {
      expect(searchState.selectors.getSearchTerm(appState)).toEqual(searchTerm);
    });

    it('getCompanies', (): void => {
      expect(
        searchState.selectors.getCompanies({
          ...appState,
          search: {
            companies,
            searchTerm: 'one',
          },
        })
      ).toEqual([companies[0]]);
    });
  });
});
