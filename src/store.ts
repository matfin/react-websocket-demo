import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { CombinedAppState, ReduxAction } from './store.types';
import rootSaga from './sagas';
import searchState from './services/isin-search/search.state';
import listState from './services/isin-list/list.state';
import connectionState from './services/connection/connection.state';

const rootReducer: Reducer<CombinedAppState, ReduxAction> = combineReducers({
  connection: connectionState.reducer,
  search: searchState.reducer,
  list: listState.reducer
});

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

