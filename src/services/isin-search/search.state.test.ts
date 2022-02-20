import isins from '../../assets/isins.json';

import { CombinedAppState } from '../../store.types';
import searchState, { handleUpdateSearchTerm } from './search.state';
import { Company, SearchAction, SearchState } from './search.state.types';

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
        companies: [
          {
            name: 'Company Einz',
            shortName: 'EIN',
            isin: 'DE123456',
          },
          {
            name: 'Comhlacht a Haon',
            shortName: 'COM',
            isin: 'IE78910',
          },
        ],
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
      } as unknown as SearchAction);

      expect(result).toEqual(initalState);
    });
  });

  describe('reducer utils', (): void => {
    const searchState: SearchState = {
      companies: [],
      searchTerm: '',
    };

    it('handleUpdateSearchTerm with empty search term', (): void => {
      expect(handleUpdateSearchTerm(searchState, '')).toEqual({
        ...searchState,
        companies: isins as Company[],
      });
    });

    it('handleUpdateSearchTerm with a search term', (): void => {
      expect(handleUpdateSearchTerm(searchState, 'fox')).toEqual({
        searchTerm: 'fox',
        companies: [
          {
            name: 'Foxconn',
            shortName: 'FXCOF',
            isin: 'TW0002354008',
          },
        ],
      });
    });
  });

  describe('selectors', (): void => {
    const searchTerm = 'Test search term';
    const companies: Company[] = [
      { name: 'Company one', shortName: 'ONE', isin: 'IE1' },
      { name: 'Company two', shortName: 'TWO', isin: 'IE2' },
    ];
    const appState: CombinedAppState = {
      search: {
        companies,
        searchTerm,
      },
      list: {
        instruments: {},
      },
      connection: {
        connected: false,
        error: null,
        socket: null,
      }
    };

    it('getSearchTerm', (): void => {
      expect(searchState.selectors.getSearchTerm(appState)).toEqual(searchTerm);
    });

    it('getCompanies', (): void => {
      expect(searchState.selectors.getCompanies(appState)).toEqual(companies);
    });
  });
});
