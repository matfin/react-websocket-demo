import { createSelector } from '@reduxjs/toolkit';

import { ConnectionAction, ConnectionState } from './connection.state.types';

const REDUCER_NAME = `connection`;

/** Action types */
const OPEN_CONNECTION_REQUEST = `${REDUCER_NAME}/OPEN_CONNECTION_REQUEST`;
const OPEN_CONNECTION_SUCCESS = `${REDUCER_NAME}/OPEN_CONNECTION_SUCCESS`;
const OPEN_CONNECTION_FAILURE = `${REDUCER_NAME}/OPEN_CONNECTION_FAILURE`;
const CLOSE_CONNECTION_REQUEST = `${REDUCER_NAME}/CLOSE_CONNECTION_REQUEST`;
const CLOSE_CONNECTION_SUCCESS = `${REDUCER_NAME}/CLOSE_CONNECTION_SUCCESS`;
const CLOSE_CONNECTION_FAILURE = `${REDUCER_NAME}/CLOSE_CONNECTION_FAILURE`;
const SET_IS_LISTENING = `${REDUCER_NAME}/SET_IS_LISTENING`;
const CONNECTION_OFFLINE = `${REDUCER_NAME}/CONNECTION_OFFLINE`;
const CONNECTION_ONLINE = `${REDUCER_NAME}/CONNECTION_ONLINE`;

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

const openConnectionFailure = (error: Error): ConnectionAction => ({
  type: OPEN_CONNECTION_FAILURE,
  payload: {
    error,
  },
});

const closeConnectionRequest = (): ConnectionAction => ({
  type: CLOSE_CONNECTION_REQUEST,
});

const closeConnectionSuccess = (): ConnectionAction => ({
  type: CLOSE_CONNECTION_SUCCESS,
});

const closeConnectionFailure = (error: Error): ConnectionAction => ({
  type: CLOSE_CONNECTION_FAILURE,
  payload: {
    error,
  },
});

const connectionOffline = (): ConnectionAction => ({
  type: CONNECTION_OFFLINE,
});

const connectionOnline = (): ConnectionAction => ({
  type: CONNECTION_ONLINE,
});

const setIsListening = (listening: boolean): ConnectionAction => ({
  type: SET_IS_LISTENING,
  payload: {
    listening,
  },
});

/** Reducer */
const initialState: ConnectionState = {
  error: null,
  socket: null,
  connected: false,
  listening: false,
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
        connected: true,
        socket: payload!.socket!,
        error: null,
      };
    }
    case OPEN_CONNECTION_FAILURE: {
      return {
        ...state,
        connected: false,
        socket: null,
        error: payload!.error!,
      };
    }
    case CLOSE_CONNECTION_SUCCESS: {
      return initialState;
    }
    case CLOSE_CONNECTION_FAILURE: {
      return {
        ...state,
        error: payload!.error!,
      };
    }
    case CONNECTION_OFFLINE: {
      return {
        ...state,
        connected: false,
      };
    }
    case CONNECTION_ONLINE: {
      return {
        ...state,
        connected: true,
      };
    }
    case SET_IS_LISTENING: {
      return {
        ...state,
        listening: payload!.listening!
      };
    }
    default:
      return state;
  }
};

/** Selectors */
const errorSelector = ({
  connection: { error },
}: {
  connection: ConnectionState;
}): Error | null => error;

const socketSelector = ({
  connection: { socket },
}: {
  connection: ConnectionState;
}): WebSocket | null => socket;

const connectedSelector = ({
  connection: { connected },
}: {
  connection: ConnectionState;
}): boolean => connected;

const listeningSelector = ({
  connection: { listening },
}: {
  connection: ConnectionState
}): boolean => listening

const selectError = createSelector(
  errorSelector,
  (error: Error | null): Error | null => error
);

const selectSocket = createSelector(
  socketSelector,
  (socket: WebSocket | null): WebSocket | null => socket
);

const selectIsConnected = createSelector(
  connectedSelector,
  (connected: boolean): boolean => connected
);

const selectIsListening = createSelector(
  listeningSelector,
  (listening: boolean): boolean => listening
);

const connectionState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    OPEN_CONNECTION_REQUEST,
    OPEN_CONNECTION_SUCCESS,
    OPEN_CONNECTION_FAILURE,
    CLOSE_CONNECTION_REQUEST,
    CLOSE_CONNECTION_SUCCESS,
    CLOSE_CONNECTION_FAILURE,
    SET_IS_LISTENING,
    CONNECTION_OFFLINE,
    CONNECTION_ONLINE,
  },
  selectors: {
    getSocket: selectSocket,
    getIsConnected: selectIsConnected,
    getError: selectError,
    getIsListening: selectIsListening,
  },
  actions: {
    openConnectionRequest,
    openConnectionSuccess,
    openConnectionFailure,
    closeConnectionRequest,
    closeConnectionSuccess,
    closeConnectionFailure,
    setIsListening,
    connectionOffline,
    connectionOnline,
  },
};

export default connectionState;
