import { put, delay, all, takeLatest } from 'redux-saga/effects';

import { BannerAction } from './banner.state.types';
import bannerState from './banner.state';

export function* handleOnShowBanner(action: BannerAction) {
  const hideAfter: number = action!.payload!.delay!;

  yield delay(hideAfter);
  yield put(bannerState.actions.hideBanner());
}

function* rootSaga() {
  yield all([takeLatest(bannerState.types.SHOW_BANNER, handleOnShowBanner)]);
}

export default rootSaga;
