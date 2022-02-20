import { CombinedAppState } from '../../store.types';
import { ConnectionState } from './connection.state.types';
import connectionState from './connection.state';

describe('connection state', (): void => {
  const dummyState: ConnectionState = {
    error: null,
    socket: null,
    connected: false,
  };

  describe('actions', (): void => {
    it('returns the correct payload for openConnectionRequest', (): void => {
      expect(connectionState.actions.openConnectionRequest()).toEqual({
        type: connectionState.types.OPEN_CONNECTION_REQUEST,
      });
    });

    it('returns the correct payload for openConnectionSuccess', (): void => {
      const dummySocket: WebSocket = {
        dummy: 'socket',
      } as unknown as WebSocket;

      expect(
        connectionState.actions.openConnectionSuccess(dummySocket)
      ).toEqual({
        type: connectionState.types.OPEN_CONNECTION_SUCCESS,
        payload: {
          socket: dummySocket,
        },
      });
    });

    it('returns the correct payload for openConnectionError', (): void => {
      const dummyError: Error = new Error('oops');

      expect(connectionState.actions.openConnectionFailure(dummyError)).toEqual(
        {
          type: connectionState.types.OPEN_CONNECTION_FAILURE,
          payload: {
            error: dummyError,
          },
        }
      );
    });

    it('returns the correct payload for closeConnectionRequest', (): void => {
      expect(connectionState.actions.closeConnectionRequest()).toEqual({
        type: connectionState.types.CLOSE_CONNECTION_REQUEST,
      });
    });

    it('returns the correct payload for closeConnectionSuccess', (): void => {
      expect(connectionState.actions.closeConnectionSuccess()).toEqual({
        type: connectionState.types.CLOSE_CONNECTION_SUCCESS,
      });
    });

    it('returns the correct payload for closeConnectionFailure', (): void => {
      const dummyError: Error = new Error('oops');

      expect(connectionState.actions.closeConnectionFailure(dummyError)).toEqual(
        {
          type: connectionState.types.CLOSE_CONNECTION_FAILURE,
          payload: {
            error: dummyError,
          },
        }
      );
    });
  });

  describe('reducer', (): void => {
    it('sets the state with OPEN_CONNECTION_SUCCESS', (): void => {
      const dummySocket: WebSocket = {
        dummy: 'Socket',
      } as unknown as WebSocket;
      const result: ConnectionState = connectionState.reducer(
        dummyState,
        connectionState.actions.openConnectionSuccess(dummySocket)
      );
      const expected: ConnectionState = {
        ...dummyState,
        connected: true,
        socket: dummySocket,
      };

      expect(result).toEqual(expected);
    });

    it('sets the state with OPEN_CONNECTION_FAILURE', (): void => {
      const dummyError: Error = new Error('oops');
      const result: ConnectionState = connectionState.reducer(
        dummyState,
        connectionState.actions.openConnectionFailure(dummyError)
      );
      const expected: ConnectionState = {
        ...dummyState,
        connected: false,
        socket: null,
        error: dummyError,
      };

      expect(result).toEqual(expected);
    });

    it('sets the state with CLOSE_CONNECTION_SUCCESS', (): void => {
      const dummySocket: WebSocket = {
        dummy: 'Socket',
      } as unknown as WebSocket;
      const stateWithConnection: ConnectionState = {
        ...dummyState,
        socket: dummySocket,
      };
      const result: ConnectionState = connectionState.reducer(
        stateWithConnection,
        connectionState.actions.closeConnectionSuccess()
      );

      expect(result).toEqual(dummyState);
    });

    it('sets the state with CLOSE_CONNECTION_FAILURE', (): void => {
      const dummyError: Error = new Error('oops');
      const expected: ConnectionState = {
        ...dummyState,
        error: dummyError,
      };
      const result: ConnectionState = connectionState.reducer(
        dummyState,
        connectionState.actions.closeConnectionFailure(dummyError),
      );
      
      expect(result).toEqual(expected);
    });

    it('returns the default state with no type match', (): void => {
      const expected: ConnectionState = dummyState;
      const result: ConnectionState = connectionState.reducer(undefined, {
        type: 'SOMETHING_ELSE',
      });

      expect(result).toEqual(expected);
    });
  });

  describe('selectors', (): void => {
    const appState: CombinedAppState = {
      search: {
        companies: [],
        searchTerm: '',
      },
      list: {
        instruments: {},
      },
      connection: {
        connected: false,
        error: null,
        socket: null,
      },
    };

    it('getSocket', (): void => {
      expect(connectionState.selectors.getSocket(appState)).toBeNull();
    });

    it('getIsConnected', (): void => {
      expect(connectionState.selectors.getIsConnected(appState)).toEqual(false);
    });

    it('getError', (): void => {
      expect(connectionState.selectors.getError(appState)).toBeNull();
    });
  });
});