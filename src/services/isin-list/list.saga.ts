import {
  all,
  call,
  put,
  race,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { END, eventChannel, EventChannel } from 'redux-saga';

import { Company } from 'services/isin-search/search.state.types';
import { ListAction, StockData } from './list.state.types';
import { BannerType } from 'services/notification-banner/banner.state.types';
import connectionState from 'services/connection/connection.state';
import listState from './list.state';
import bannerState from 'services/notification-banner/banner.state';

export const eventChannelEmitter = (
  emit: (action: ListAction) => void,
  socket: WebSocket,
): (() => void) => {
  const onMessage = ({ data }: { data: unknown }): void => {
    const stockData: StockData = JSON.parse(data as string);

    emit(listState.actions.updateInstrument(stockData));
  }

  socket.addEventListener('message', onMessage);

  return (): void => {
    socket.removeEventListener('message', onMessage);
    emit(END);
  };
};

/* istanbul ignore next */
export function setupSocketListener (
  socket: WebSocket
): EventChannel<ListAction> | null {
  return eventChannel((emit: (action: ListAction) => void) => 
    eventChannelEmitter(emit, socket)
  );
}

/* istanbul ignore next */
function* handleConnectionSuccess(): Generator {
  const socket = yield select(connectionState.selectors.getSocket);
  const channel = yield call(setupSocketListener, socket as WebSocket);

  while (true) {
    const { task, cancel }: any = yield race({
      task: take(channel as EventChannel<ListAction>),
      cancel: take(connectionState.types.RESET_CONNECTION)
    });

    if (cancel) {
      (channel as EventChannel<ListAction>).close();
      break;
    }

    yield put(task);
  }
}

function* handleInstrumentUnsubscribe(action: ListAction): Generator {
  const socket = yield select(connectionState.selectors.getSocket);
  const company: Company = action.payload!.company!;
  const payload = JSON.stringify({ unsubscribe: company.isin });

  try {
    (socket as WebSocket).send(payload);

    yield put(
      bannerState.actions.showBanner(
        'Unsubscribed successfully and removed!',
        BannerType.SUCCESS,
        2000
      )
    );
  } catch {
    yield put(
      bannerState.actions.showBanner(
        'Could not unsubscribe from server!',
        BannerType.ERROR,
        2000
      )
    );
  } finally {
    yield put(listState.actions.removeInstrument(company));
  }
}

function* handleUnsubscribeAllInstruments(): Generator {
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

function* handleResubscribeAllInstruments(): Generator {
  const socket = yield select(connectionState.selectors.getSocket);
  const unsubscribedIsins = yield select(
    listState.selectors.getUnsubscribedInstrumentIsins
  );
  const payloads: string[] = (unsubscribedIsins as string[]).map(
    (isin: string): string => JSON.stringify({ subscribe: isin })
  );
  
  try {
    yield all(
      payloads.map((payload: string): void =>
        (socket as WebSocket).send(payload)
      )
    )
  } finally {
    yield put(listState.actions.updateInstrumentSubscriptions(true));
  }
}

/* istanbul ignore next */
function* handleOnInstrumentAdded(action: ListAction): Generator {
  const socket = yield select(connectionState.selectors.getSocket);
  const { isin }: Company = action.payload!.company!;
  const payload: string = JSON.stringify({ subscribe: isin });

  (socket as WebSocket).send(payload);

  yield put(
    bannerState.actions.showBanner(
      'Subscription successful!',
      BannerType.SUCCESS,
      2000
    )
  );
}

function* handleServerConnectionLost(): Generator {
  yield put(listState.actions.updateInstrumentSubscriptions(false));
}

function* rootSaga(): Generator {
  yield all([
    takeLatest(listState.types.ADD_INSTRUMENT, handleOnInstrumentAdded),
    takeLatest(
      listState.types.UNSUBSCRIBE_REQUEST,
      handleInstrumentUnsubscribe,
    ),
    takeLatest(
      listState.types.UNSUBSCRIBE_ALL_REQUEST,
      handleUnsubscribeAllInstruments
    ),
    takeLatest(
      listState.types.RESUBSCRIBE_ALL_REQUEST,
      handleResubscribeAllInstruments
    ),
    takeLatest(
      connectionState.types.OPEN_CONNECTION_SUCCESS,
      handleResubscribeAllInstruments
    ),
    takeLatest(
      connectionState.types.OPEN_CONNECTION_SUCCESS,
      handleConnectionSuccess
    ),
    takeLatest(
      connectionState.types.RESET_CONNECTION,
      handleServerConnectionLost
    ),
  ]);
}

export default rootSaga;
