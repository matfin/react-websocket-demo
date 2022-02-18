import { SearchAction, SearchState } from './services/isin-search/search.state.types';

export interface CombinedAppState {
  search: SearchState;
}

export type ReduxAction = SearchAction;

