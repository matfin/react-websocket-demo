import { END } from 'redux-saga'; 
import { call, select } from 'redux-saga/effects';
import { expectSaga} from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';

import Config from 'config';
import { openSocket, closeSocket } from './socket';
import connectionState from './connection.state';
import rootSaga, { monitorConnection, eventChannelEmitter } from './connection.saga';
import { BannerType } from 'services/notification-banner/banner.state.types';
import bannerState from 'services/notification-banner/banner.state';

import mockState from 'mocks/mockState';
import { waitFor } from '@testing-library/react';

jest.mock('./socket', () => ({
  openSocket: jest.fn(),
  closeSocket: jest.fn(),
}));

const dummySocket: WebSocket = {
  close: jest.fn(),
  onclose: jest.fn(),
} as unknown as WebSocket;

describe('connection saga', (): void => {
  describe('eventChannelEmitter', (): void => {
    it('adds the correct event listeners and calls END', (): void => {
      jest.spyOn(window, 'addEventListener');
      jest.spyOn(window, 'removeEventListener');
      const spyEmit = jest.fn();

      eventChannelEmitter(spyEmit)();
      expect(window.addEventListener).toHaveBeenCalledTimes(2);
      expect(window.addEventListener).toHaveBeenNthCalledWith(1, 'offline', expect.any(Function));
      expect(window.addEventListener).toHaveBeenNthCalledWith(2, 'online', expect.any(Function));

      expect(window.removeEventListener).toHaveBeenCalledTimes(2);
      expect(window.removeEventListener).toHaveBeenNthCalledWith(1, 'offline', expect.any(Function));
      expect(window.removeEventListener).toHaveBeenNthCalledWith(2, 'online', expect.any(Function));

      expect(spyEmit).toHaveBeenCalledWith(END);

      (window.addEventListener as jest.Mock).mockRestore();
      (window.removeEventListener as jest.Mock).mockRestore();
    });

    it('emits the correct action on online event', async (): Promise<void> => {
      const spyEmit = jest.fn();

      eventChannelEmitter(spyEmit);
      window.dispatchEvent(new Event('online'));

      await waitFor((): void => {
        expect(spyEmit).toHaveBeenCalledTimes(1);
        expect(spyEmit).toHaveBeenCalledWith(connectionState.actions.connectionOnline());
      });
    });

    it('emits the correct action on offline event', async (): Promise<void> => {
      const spyEmit = jest.fn();

      eventChannelEmitter(spyEmit);
      window.dispatchEvent(new Event('offline'));

      await waitFor((): void => {
        expect(spyEmit).toHaveBeenCalledTimes(1);
        expect(spyEmit).toHaveBeenCalledWith(connectionState.actions.connectionOffline());
      });
    });
  });

  describe('establishConnection', (): void => {
    it('should establish a connection if there is none', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .select(connectionState.selectors.getSocket)
        .provide([
          [call(openSocket, Config.wsUri), dummySocket]
        ])
        .put(connectionState.actions.openConnectionSuccess(dummySocket))
        .dispatch(connectionState.actions.openConnectionRequest())
        .silentRun();
    });
  
    it('should not establish a connection if there is already one', async (): Promise<void> => {  
      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getSocket), true]
        ])
        .dispatch(connectionState.actions.openConnectionRequest())
        .silentRun();
    });

    it('should update the state if there was an error', async (): Promise<void> => {
      const dummyError = new Error('oops');

      await expectSaga(rootSaga)
        .withState(mockState)
        .provide([
          [select(connectionState.selectors.getSocket), throwError(dummyError)]
        ])
        .put(connectionState.actions.openConnectionFailure(dummyError))
        .put(bannerState.actions.showBanner('Connection failed', BannerType.ERROR))
        .dispatch(connectionState.actions.openConnectionRequest())
        .silentRun();
    });
  });

  describe('establishConnectionSuccess', (): void => {
    it('should show a success message and monitor the network on connection success', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .call(monitorConnection)
        .put(bannerState.actions.showBanner('Connected successfully', BannerType.SUCCESS))
        .dispatch(connectionState.actions.openConnectionSuccess({} as WebSocket))
        .silentRun();
    });
  });

  describe('connectionLost / connectionRegained', (): void => {
    it('should show an error banner with a message when the connection is lost', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .put(bannerState.actions.showBanner('Connection lost. You are offline!', BannerType.ERROR, 4000))
        .dispatch(connectionState.actions.connectionOffline())
        .silentRun();
    });

    it('should show a success banner with a message when the connection is regained', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .put(bannerState.actions.showBanner('Connection regained. You are back online!', BannerType.SUCCESS))
        .dispatch(connectionState.actions.connectionOnline())
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
