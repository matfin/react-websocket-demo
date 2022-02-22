import {
  all,
  call,
  delay,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { eventChannel, EventChannel } from 'redux-saga';

import { Company } from '../isin-search/search.state.types';
import { Instrument } from '../isin-list/list.state.types';
import { ListAction, StockData } from './list.state.types';
import { BannerType } from '../notification-banner/banner.state.types';
import connectionState from '../connection/connection.state';
import listState from './list.state';
import bannerState from '../notification-banner/banner.state';

/* istanbul ignore next */
export function subscribe(
  socket: WebSocket,
  company: Company
): EventChannel<unknown> {
  return eventChannel((emit) => {
    const onMessage = ({ data }: { data: unknown }): void => {
      const stockData: StockData = JSON.parse(data as string);

      emit(listState.actions.updateInstrument(stockData));
    };
    const payload = JSON.stringify({ subscribe: company.isin });

    socket.addEventListener('message', onMessage);
    socket.send(payload);

    return (): void => socket.removeEventListener('message', onMessage);
  });
}

function* handleUnsubscribeInstrument(action: ListAction): Generator<unknown> {
  const socket = yield select(connectionState.selectors.getSocket);
  const instrument: Instrument = action.payload!.instrument!;
  const payload = JSON.stringify({ unsubscribe: instrument.company.isin });

  (socket as WebSocket).send(payload);

  yield delay(200);
  yield put(listState.actions.removeInstrument(instrument));
  yield put(
    bannerState.actions.showBanner(
      'Unsubscribed successfully!',
      BannerType.SUCCESS,
      2000
    )
  );
}

/* istanbul ignore next */
function* handleOnInstrumentAdded(action: ListAction): Generator<unknown> {
  const socket = yield select(connectionState.selectors.getSocket);
  const company: Company = action.payload!.company!;
  const channel = yield call(subscribe, socket as WebSocket, company);

  yield put(
    bannerState.actions.showBanner(
      'Subscription successful!',
      BannerType.SUCCESS,
      2000
    )
  );

  while (true) {
    const action = yield take(channel as EventChannel<unknown>);

    yield put(action as ListAction);
  }
}

function* rootSaga(): Generator<unknown> {
  yield all([
    takeLatest(listState.types.ADD_INSTRUMENT, handleOnInstrumentAdded),
    takeLatest(
      listState.types.UNSUBSCRIBE_REQUEST,
      handleUnsubscribeInstrument
    ),
  ]);
}

export default rootSaga;
