import { all } from 'redux-saga/effects';
import bannerSaga from './services/notification-banner/banner.saga'
import connectionSaga from './services/connection/connection.saga';
import listSaga from './services/isin-list/list.saga';

function* rootSaga(): Generator {
  yield all([bannerSaga(), connectionSaga(), listSaga()]);
}

export default rootSaga;