import { combineReducers, createStore, Reducer, Store } from 'redux';

import { CombinedAppState, ReduxAction } from './store.types';
import searchState from './services/isin-search/search.state';

const rootReducer: Reducer<CombinedAppState, ReduxAction> = combineReducers({
  search: searchState.reducer
});

const store: Store = createStore(rootReducer);

export default store;

