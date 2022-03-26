import { all, call, select, put, takeLatest, take, delay, fork } from 'redux-saga/effects';
import { eventChannel, EventChannel, END } from 'redux-saga';

import Config from 'config';
import { openSocket, closeSocket } from './socket';
import bannerState from 'services/notification-banner/banner.state';
import { BannerType } from 'services/notification-banner/banner.state.types';
import connectionState from './connection.state';
import { ConnectionAction } from './connection.state.types';

export const eventChannelEmitter = (
  emit: (action: ConnectionAction) => void,
  socket: WebSocket
): (() => void) => {
  const onClose = (): void => {
    emit(connectionState.actions.resetConnection());
  }
  const onOnline = (): void => emit(connectionState.actions.connectionOnline());
  const onOffline = (): void =>
    emit(connectionState.actions.connectionOffline());

  window.addEventListener('offline', onOffline);
  window.addEventListener('online', onOnline);
  socket.addEventListener('close', onClose);

  return (): void => {
    window.removeEventListener('offline', onOffline);
    window.removeEventListener('online', onOnline);
    socket.removeEventListener('close', onClose);
    emit(END);
  };
};

/* istanbul ignore next */
export const setupSocketListeners = (
  socket: WebSocket
): EventChannel<ConnectionAction> | null => {
  return eventChannel((emit: (action: ConnectionAction) => void) =>
    eventChannelEmitter(emit, socket)
  );
};

export function* connectionLost(): Generator {
  yield put(
    bannerState.actions.showBanner(
      'Connection lost. You are offline!',
      BannerType.ERROR,
      4000
    )
  );
}

export function* connectionRegained(): Generator {
  yield put(
    bannerState.actions.showBanner(
      'Connection regained. You are back online!',
      BannerType.SUCCESS
    )
  );
}

export function* establishConnection(): Generator {
  try {
    const uri = Config.wsUri;
    const hasSocket = yield select(connectionState.selectors.getSocket);

    if (!hasSocket) {
      const socket = yield call(openSocket, uri);

      yield put(
        connectionState.actions.openConnectionSuccess(socket as WebSocket)
      );
    }
  } catch (e: unknown) {
    yield put(connectionState.actions.openConnectionFailure(e as Error));
    yield put(
      bannerState.actions.showBanner('Connection failed', BannerType.ERROR)
    );
    yield call(reestablishConnection);
  }
}

/* istanbul ignore next */
export function* reestablishConnection(): Generator {
  yield put(
    bannerState.actions.showBanner('Connection to server lost. Reconnecting', BannerType.WARN, 5000)
  );

  yield delay(5000);
  yield call(establishConnection);
}

/* istanbul ignore next */
export function* establishConnectionSuccess(action: ConnectionAction): Generator {
  const socket: WebSocket = action.payload!.socket!;
  const channel = yield call(setupSocketListeners, socket as WebSocket);
  
  yield put(bannerState.actions.showBanner('Connected successfully', BannerType.SUCCESS));

  yield fork(function* () {
    yield take(connectionState.types.RESET_CONNECTION);
    (channel as EventChannel<ConnectionAction>).close();
  });

  while(true) {
    const task = yield take(channel as EventChannel<ConnectionAction>);

    yield put(task as ConnectionAction);
  }
}

export function* closeConnection(): Generator {
  try {
    const socket = yield select(connectionState.selectors.getSocket);
    const hasConnection = socket !== null;

    if (hasConnection) {
      yield call(closeSocket, socket as WebSocket);
      yield put(connectionState.actions.closeConnectionSuccess());
      yield put(
        bannerState.actions.showBanner(
          'Connection closed successfully',
          BannerType.SUCCESS
        )
      );
    }
  } catch (e: unknown) {
    yield put(connectionState.actions.closeConnectionFailure(e as Error));
  }
}

function* rootSaga(): Generator {
  yield all([
    takeLatest(
      connectionState.types.OPEN_CONNECTION_REQUEST,
      establishConnection
    ),
    takeLatest(
      connectionState.types.OPEN_CONNECTION_SUCCESS,
      establishConnectionSuccess
    ),
    takeLatest(
      connectionState.types.RESET_CONNECTION,
      reestablishConnection,
    ),
    takeLatest(connectionState.types.CLOSE_CONNECTION_REQUEST, closeConnection),
    takeLatest(connectionState.types.CONNECTION_OFFLINE, connectionLost),
    takeLatest(connectionState.types.CONNECTION_ONLINE, connectionRegained),
  ]);
}

export default rootSaga;
