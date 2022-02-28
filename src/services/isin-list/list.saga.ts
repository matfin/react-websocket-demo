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
import { ListAction, StockData } from './list.state.types';
import { BannerType } from '../notification-banner/banner.state.types';
import connectionState from '../connection/connection.state';
import listState from './list.state';
import bannerState from '../notification-banner/banner.state';

/* istanbul ignore next */
export function subscribe(
  socket: WebSocket,
  company: Company,
): EventChannel<unknown> | null {
  return eventChannel((emit) => {
    const onMessage = ({ data }: { data: unknown }): void => {
      const stockData: StockData = JSON.parse(data as string);

      emit(listState.actions.updateInstrument(stockData));
    };
    const payload = JSON.stringify({ subscribe: company.isin });

    socket.addEventListener('message', onMessage);
    socket.send(payload);

    return (): void => {
      socket.removeEventListener('message', onMessage);
      emit(connectionState.actions.setIsListening(false));
    }
  });
}

function* handleUnsubscribeInstrument(action: ListAction): Generator<unknown> {
  const socket = yield select(connectionState.selectors.getSocket);
  const company: Company = action.payload!.company!;
  const payload = JSON.stringify({ unsubscribe: company.isin });

  (socket as WebSocket).send(payload);

  yield delay(200);
  yield put(listState.actions.removeInstrument(company));
  yield put(
    bannerState.actions.showBanner(
      'Unsubscribed successfully and removed!',
      BannerType.SUCCESS,
      2000
    )
  );
}

function* handleUnsubscribeAllInstruments(): Generator<unknown> {
  const socket = yield select(connectionState.selectors.getSocket);
  const subscribedIsins = yield select(
    listState.selectors.getSubscribedInstrumentIsins
  );
  const payloads: string[] = (subscribedIsins as string[]).map(
    (isin: string): string => JSON.stringify({ unsubscribe: isin })
  );
  
  try {
    yield all(
      payloads.map((payload: string): void =>
        (socket as WebSocket).send(payload)
      )
    );
  } finally {
    yield put(listState.actions.updateInstrumentSubscriptions(false));
  }
}

function* handleResubscribeAllInstruments(): Generator<unknown> {
  const socket = yield select(connectionState.selectors.getSocket);
  const unSubscribedIsins = yield select(
    listState.selectors.getUnsubscribedInstrumentIsins
  );
  const payloads: string[] = (unSubscribedIsins as string[]).map(
    (isin: string): string => JSON.stringify({ subscribe: isin })
  );

  try {
    yield all(
      payloads.map((payload: string): void => (socket as WebSocket).send(payload))
    )
  } finally {
    yield put(listState.actions.updateInstrumentSubscriptions(true));
  }
}

/* istanbul ignore next */
function* handleOnInstrumentAdded(action: ListAction): Generator<unknown> {
  const socket = yield select(connectionState.selectors.getSocket);
  const company: Company = action.payload!.company!;
  const channel = yield call(subscribe, socket as WebSocket, company);

  yield put(connectionState.actions.setIsListening(true))
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
    takeLatest(
      listState.types.UNSUBSCRIBE_ALL_REQUEST,
      handleUnsubscribeAllInstruments
    ),
    takeLatest(
      listState.types.RESUBSCRIBE_ALL_REQUEST,
      handleResubscribeAllInstruments
    ),
  ]);
}

export default rootSaga;
