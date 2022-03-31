import { createSelector } from '@reduxjs/toolkit';

import { ConnectionAction, ConnectionState } from './connection.state.types';

const REDUCER_NAME = `connection`;

/** Action types */
const OPEN_CONNECTION_REQUEST = `${REDUCER_NAME}/OPEN_CONNECTION_REQUEST`;
const OPEN_CONNECTION_SUCCESS = `${REDUCER_NAME}/OPEN_CONNECTION_SUCCESS`;
const CLOSE_CONNECTION_REQUEST = `${REDUCER_NAME}/CLOSE_CONNECTION_REQUEST`;
const CLOSE_CONNECTION_SUCCESS = `${REDUCER_NAME}/CLOSE_CONNECTION_SUCCESS`;
const CONNECTION_OFFLINE = `${REDUCER_NAME}/CONNECTION_OFFLINE`;
const CONNECTION_ONLINE = `${REDUCER_NAME}/CONNECTION_ONLINE`;
const RESET_CONNECTION = `${REDUCER_NAME}/RESET_CONNECTION`;

/** Actions */
const openConnectionRequest = (): ConnectionAction => ({
  type: OPEN_CONNECTION_REQUEST,
});

const openConnectionSuccess = (socket: WebSocket): ConnectionAction => ({
  type: OPEN_CONNECTION_SUCCESS,
  payload: {
    socket,
  },
});

const closeConnectionRequest = (): ConnectionAction => ({
  type: CLOSE_CONNECTION_REQUEST,
});

const closeConnectionSuccess = (): ConnectionAction => ({
  type: CLOSE_CONNECTION_SUCCESS,
});

const connectionOffline = (): ConnectionAction => ({
  type: CONNECTION_OFFLINE,
});

const connectionOnline = (): ConnectionAction => ({
  type: CONNECTION_ONLINE,
});

const resetConnection = (): ConnectionAction => ({
  type: RESET_CONNECTION
});

/** Reducer */
const initialState: ConnectionState = {
  socket: null,
};

const reducer = (
  state: ConnectionState = initialState,
  action: ConnectionAction
): ConnectionState => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_CONNECTION_SUCCESS: {
      return {
        ...state,
        socket: payload!.socket!,
      };
    }
    case CLOSE_CONNECTION_SUCCESS: {
      return initialState;
    }
    case RESET_CONNECTION: {
      return initialState;
    }
    default:
      return state;
  }
};

/** Selectors */
const socketSelector = ({
  connection: { socket },
}: {
  connection: ConnectionState;
}): WebSocket | null => socket;

const selectSocket = createSelector(
  socketSelector,
  (socket: WebSocket | null): WebSocket | null => socket
);

const connectionState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    OPEN_CONNECTION_REQUEST,
    OPEN_CONNECTION_SUCCESS,
    CLOSE_CONNECTION_REQUEST,
    CLOSE_CONNECTION_SUCCESS,
    CONNECTION_OFFLINE,
    CONNECTION_ONLINE,
    RESET_CONNECTION,
  },
  selectors: {
    getSocket: selectSocket,
  },
  actions: {
    openConnectionRequest,
    openConnectionSuccess,
    closeConnectionRequest,
    closeConnectionSuccess,
    resetConnection,
    connectionOffline,
    connectionOnline,
  },
};

export default connectionState;
