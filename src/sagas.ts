import { all } from 'redux-saga/effects';
import connectionSaga from './services/connection/connection.saga';
import listSaga from './services/isin-list/list.saga';

function* rootSaga(): Generator<unknown> {
  yield all([connectionSaga(), listSaga()]);
}

export default rootSaga;