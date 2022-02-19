import { SearchAction, SearchState } from './services/isin-search/search.state.types';
import { ListAction, ListState } from './services/isin-list/list.state.types';

export interface CombinedAppState {
  search: SearchState;
  list: ListState;
}

export type ReduxAction = SearchAction | ListAction;

