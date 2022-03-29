import { ConnectionState } from './connection.state.types';
import connectionState from './connection.state';
import mockState from 'mocks/mockState';

describe('connection state', (): void => {
  const dummyState: ConnectionState = {
    socket: null,
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

    it('returns the correct payload for CONNECTION_OFFLINE', (): void => {
      expect(connectionState.actions.connectionOffline()).toEqual({
        type: connectionState.types.CONNECTION_OFFLINE,
      });
    });

    it('returns the correct payload for CONNECTION_ONLINE', (): void => {
      expect(connectionState.actions.connectionOnline()).toEqual({
        type: connectionState.types.CONNECTION_ONLINE,
      });
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
        socket: dummySocket,
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

    it('sets the state with RESET_CONECTION', (): void => {
      const expected: ConnectionState = dummyState;
      const result: ConnectionState = connectionState.reducer(
        dummyState,
        connectionState.actions.resetConnection()
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
    it('getSocket', (): void => {
      expect(connectionState.selectors.getSocket(mockState)).toBeNull();
    });
  });
});
