import { SearchAction, SearchState } from './services/isin-search/search.state.types';
import { ListAction, ListState } from './services/isin-list/list.state.types';
import { ConnectionAction, ConnectionState } from './services/connection/connection.state.types';

export interface CombinedAppState {
  connection: ConnectionState;
  search: SearchState;
  list: ListState;
}

export type ReduxAction = SearchAction | ListAction | ConnectionAction;

