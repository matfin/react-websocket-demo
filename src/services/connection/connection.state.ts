import { ConnectionAction, ConnectionState } from './connection.state.types';

const REDUCER_NAME = `connection`;

/** Action types */
const OPEN_CONNECTION_REQUEST = `${REDUCER_NAME}/OPEN_CONNECTION_REQUEST`;
const OPEN_CONNECTION_SUCCESS = `${REDUCER_NAME}/OPEN_CONNECTION_SUCCESS`;
const OPEN_CONNECTION_FAILURE = `${REDUCER_NAME}/OPEN_CONNECTION_FAILURE`;
const CLOSE_CONNECTION_REQUEST = `${REDUCER_NAME}/CLOSE_CONNECTION_REQUEST`;
const CLOSE_CONNECTION_SUCCESS = `${REDUCER_NAME}/CLOSE_CONNECTION_SUCCESS`;
const CLOSE_CONNECTION_FAILURE = `${REDUCER_NAME}/CLOSE_CONNECTION_FAILURE`;

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

/** Reducer */
const initialState: ConnectionState = {
  error: null,
  socket: null,
  connected: false,
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
    default:
      return state;
  }
};

/** Selectors */
const getSocket = ({
  connection,
}: {
  connection: ConnectionState;
}): WebSocket | null => connection.socket;

const getIsConnected = ({
  connection,
}: {
  connection: ConnectionState;
}): boolean => connection.connected;

const getError = ({
  connection,
}: {
  connection: ConnectionState;
}): Error | null => connection.error;

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
  },
  selectors: {
    getSocket,
    getIsConnected,
    getError,
  },
  actions: {
    openConnectionRequest,
    openConnectionSuccess,
    openConnectionFailure,
    closeConnectionRequest,
    closeConnectionSuccess,
    closeConnectionFailure,
  },
};

export default connectionState;
