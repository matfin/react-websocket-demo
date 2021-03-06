import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { CombinedAppState, ReduxAction } from './store.types';
import rootSaga from './sagas';
import bannerState from './services/notification-banner/banner.state';
import searchState from './services/isin-search/search.state';
import listState from './services/isin-list/list.state';
import connectionState from './services/connection/connection.state';

const rootReducer: Reducer<CombinedAppState, ReduxAction> = combineReducers({
  banner: bannerState.reducer,
  connection: connectionState.reducer,
  search: searchState.reducer,
  list: listState.reducer
});

export const createClientStore = (): Store => {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
  const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createClientStore;

