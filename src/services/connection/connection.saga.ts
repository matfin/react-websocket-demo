import { all, call, select, put, takeLatest } from 'redux-saga/effects';

import connectionState from './connection.state';

/* istanbul ignore next */
export const openSocket = (uri: string): Promise<WebSocket> =>
  new Promise((resolve, reject): void => {
    const socket: WebSocket = new WebSocket(uri);

    socket.onopen = (): void => resolve(socket);
    socket.onerror = (e: Event): void => reject(e);
  });

/* istanbul ignore next */
export const closeSocket = (socket: WebSocket): Promise<void> =>
  new Promise((resolve): void => {
    socket.onclose = (): void => resolve();

    socket.close();
  });

export function* establishConnection(): Generator<unknown> {
  try {
    const uri = 'ws://159.89.15.214:8080/';
    const hasConnection = yield select(
      connectionState.selectors.getIsConnected
    );

    if (!hasConnection) {
      const socket = yield call(openSocket, uri);
      
      yield put(
        connectionState.actions.openConnectionSuccess(socket as WebSocket)
      );
    }
  } catch (e: unknown) {
    yield put(connectionState.actions.openConnectionFailure(e as Error));
  }
}

export function* closeConnection(): Generator<unknown> {
  try {
    const socket = yield select(connectionState.selectors.getSocket);
    const hasConnection = socket !== null;
    
    if (hasConnection) {
      yield call(closeSocket, socket as WebSocket);
      yield put(connectionState.actions.closeConnectionSuccess());
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
    takeLatest(connectionState.types.CLOSE_CONNECTION_REQUEST, closeConnection),
  ]);
}

export default rootSaga;
