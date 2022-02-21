import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import { CombinedAppState } from '../../store.types';

import connectionState from './connection.state';
import rootSaga, { openSocket, closeSocket } from './connection.saga';

const mockState: CombinedAppState = {
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

const dummySocket: WebSocket = {
  close: jest.fn(),
  onclose: jest.fn(),
} as unknown as WebSocket;

describe('connection saga', (): void => {
  describe('establishConnection', (): void => {
    it('should establish a connection if there is none', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .select(connectionState.selectors.getIsConnected)
        .provide([
          [call(openSocket, 'ws://159.89.15.214:8080/'), dummySocket]
        ])
        .put(connectionState.actions.openConnectionSuccess(dummySocket))
        .dispatch(connectionState.actions.openConnectionRequest())
        .silentRun();
    });
  
    it('should not establish a connection if there is already one', async (): Promise<void> => {  
      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getIsConnected), true]
        ])
        .dispatch(connectionState.actions.openConnectionRequest())
        .silentRun();
    });

    it('should update the state if there was an error', async (): Promise<void> => {
      const dummyError = new Error('oops');

      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getIsConnected), throwError(dummyError)]
        ])
        .put(connectionState.actions.openConnectionFailure(dummyError))
        .dispatch(connectionState.actions.openConnectionRequest())
        .silentRun();
    });
  });

  describe('closeConnection', (): void => {
    it('should close a connection if it is already open', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getSocket), dummySocket],
          [call(closeSocket, dummySocket), null]
        ])
        .put(connectionState.actions.closeConnectionSuccess())
        .dispatch(connectionState.actions.closeConnectionRequest())
        .silentRun();
    });

    it('should not close a connection if it is not open', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getSocket), null]
        ])
        .dispatch(connectionState.actions.closeConnectionRequest())
        .silentRun();
    });

    it('should handle an error in closing a connection', async (): Promise<void> => {
      const dummyError: Error = new Error('oops');

      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getSocket), throwError(dummyError)]
        ])
        .put(connectionState.actions.closeConnectionFailure(dummyError))
        .dispatch(connectionState.actions.closeConnectionRequest())
        .silentRun();
    });
  });
});
