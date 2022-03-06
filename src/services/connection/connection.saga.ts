import { all, call, select, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel, EventChannel, END } from 'redux-saga';

import Config from 'config';
import { openSocket, closeSocket } from './socket';
import bannerState from 'services/notification-banner/banner.state';
import { BannerType } from 'services/notification-banner/banner.state.types';
import connectionState from './connection.state';
import { ConnectionAction } from './connection.state.types';

export const eventChannelEmitter = (
  emit: (action: ConnectionAction) => void
) => {
  const onOnline = (): void => emit(connectionState.actions.connectionOnline());
  const onOffline = (): void =>
    emit(connectionState.actions.connectionOffline());

  window.addEventListener('offline', onOffline);
  window.addEventListener('online', onOnline);

  return (): void => {
    window.removeEventListener('offline', onOffline);
    window.removeEventListener('online', onOnline);
    emit(END);
  };
};

/* istanbul ignore next */
export const monitorConnection = (): EventChannel<unknown> => {
  return eventChannel(eventChannelEmitter);
};

export function* connectionLost(): Generator<unknown> {
  yield put(
    bannerState.actions.showBanner(
      'Connection lost. You are offline!',
      BannerType.ERROR,
      4000
    )
  );
}

export function* connectionRegained(): Generator<unknown> {
  yield put(
    bannerState.actions.showBanner(
      'Connection regained. You are back online!',
      BannerType.SUCCESS
    )
  );
}

export function* establishConnection(): Generator<unknown> {
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
  }
}

export function* establishConnectionSuccess(): Generator<unknown> {
  const channel = yield call(monitorConnection);

  yield put(
    bannerState.actions.showBanner('Connected successfully', BannerType.SUCCESS)
  );

  /* istanbul ignore next */
  while (true) {
    const action = yield take(channel as EventChannel<ConnectionAction>);

    yield put(action as ConnectionAction);
  }
}

export function* closeConnection(): Generator<unknown> {
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

function* rootSaga(): Generator<unknown> {
  yield all([
    takeLatest(
      connectionState.types.OPEN_CONNECTION_REQUEST,
      establishConnection
    ),
    takeLatest(
      connectionState.types.OPEN_CONNECTION_SUCCESS,
      establishConnectionSuccess
    ),
    takeLatest(connectionState.types.CLOSE_CONNECTION_REQUEST, closeConnection),
    takeLatest(connectionState.types.CONNECTION_OFFLINE, connectionLost),
    takeLatest(connectionState.types.CONNECTION_ONLINE, connectionRegained),
  ]);
}

export default rootSaga;
