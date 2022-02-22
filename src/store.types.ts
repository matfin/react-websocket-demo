import { SearchAction, SearchState } from './services/isin-search/search.state.types';
import { ListAction, ListState } from './services/isin-list/list.state.types';
import { ConnectionAction, ConnectionState } from './services/connection/connection.state.types';
import { BannerAction, BannerState } from './services/notification-banner/banner.state.types';

export interface CombinedAppState {
  banner: BannerState,
  connection: ConnectionState;
  search: SearchState;
  list: ListState;
}

export type ReduxAction = BannerAction | SearchAction | ListAction | ConnectionAction;

