import { END } from 'redux-saga';
import { delay, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import listState from './list.state';
import { Instrument, StockData } from './list.state.types';
import { Company } from 'services/isin-search/search.state.types';
import connectionState from 'services/connection/connection.state';
import rootSaga, { eventChannelEmitter } from './list.saga';

import mockState from 'mocks/mockState';

const company: Company = {
  name: 'Saga',
  shortName: 'SAG',
  isin: 'SAG123',
  bookmarked: false,
};

const stockData: StockData = {
  bid: 1.0,
  ask: 0.9,
  price: 1.1,
  isin: 'SAG123',
};

const instrument: Instrument = {
  company,
  stockData,
  subscribed: false,
};

const spySend = jest.fn();
const spyAddEventListener = jest.fn();
const spyRemoveEventListener = jest.fn();

const dummySocket: WebSocket = {
  send: spySend,
  addEventListener: spyAddEventListener,
  removeEventListener: spyRemoveEventListener,
} as unknown as WebSocket;

describe('list saga', (): void => {
  afterEach((): void => {
    spySend.mockClear();
    spyAddEventListener.mockReset();
  });

  describe('eventChannelEmitter', (): void => {
    it('adds the correct event listeners and calls END', (): void => {
      const spyEmit = jest.fn();

      eventChannelEmitter(spyEmit, dummySocket, company)();

      expect(spyAddEventListener).toHaveBeenCalledTimes(1);
      expect(spyAddEventListener).toHaveBeenCalledWith(
        'message',
        expect.any(Function)
      );

      expect(spySend).toHaveBeenCalledTimes(1);
      expect(spySend).toHaveBeenCalledWith(
        JSON.stringify({ subscribe: 'SAG123' })
      );

      expect(spyRemoveEventListener).toHaveBeenCalledTimes(1);
      expect(spyRemoveEventListener).toHaveBeenCalledWith(
        'message',
        expect.any(Function)
      );

      expect(spyEmit).toHaveBeenCalledTimes(2);
      expect(spyEmit).toHaveBeenNthCalledWith(
        1,
        connectionState.actions.setIsListening(false)
      );
      expect(spyEmit).toHaveBeenNthCalledWith(2, END);
    });

    it('emits the correct action on socket message', (): void => {
      const spyEmit = jest.fn();

      (spyAddEventListener as jest.Mock).mockImplementation(
        (name: string, cb: ({ data }: { data: unknown }) => void): void => {
          expect(name).toEqual('message');
          cb({ data: JSON.stringify(stockData) });
        }
      );

      eventChannelEmitter(spyEmit, dummySocket, company);

      expect(spyEmit).toHaveBeenCalledTimes(1);
      expect(spyEmit).toHaveBeenNthCalledWith(
        1,
        listState.actions.updateInstrument(stockData)
      );
    });
  });

  it('handleUnsubscribeInstrument', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState(mockState)
      .provide([
        [select(connectionState.selectors.getSocket), dummySocket],
        [matchers.call.fn(delay), null],
      ])
      .put(listState.actions.removeInstrument(company))
      .dispatch(listState.actions.unsubscribe(company))
      .silentRun();

    expect(spySend).toHaveBeenCalledTimes(1);
    expect(spySend).toHaveBeenCalledWith(
      JSON.stringify({ unsubscribe: 'SAG123' })
    );
  });

  it('handleUnsubscribeAllInstruments', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState({
        ...mockState,
        list: {
          instruments: {
            ['SAG123']: {
              ...instrument,
              subscribed: true,
            },
          },
        },
      })
      .provide([[select(connectionState.selectors.getSocket), dummySocket]])
      .select(listState.selectors.getSubscribedInstrumentIsins)
      .put(listState.actions.updateInstrumentSubscriptions(false))
      .dispatch(listState.actions.unsubscribeAll())
      .silentRun();

    expect(spySend).toHaveBeenCalledTimes(1);
    expect(spySend).toHaveBeenCalledWith(
      JSON.stringify({ unsubscribe: 'SAG123' })
    );
  });

  it('handleOnInstrumentAdded', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState(mockState)
      .provide([[select(connectionState.selectors.getSocket), dummySocket]])
      // .call(subscribe, dummySocket, company) TODO: fix
      .dispatch(listState.actions.addInstrument(company))
      .silentRun();
  });

  it('handleResubscribeAllInstruments', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState({
        ...mockState,
        list: {
          instruments: {
            ['SAG123']: instrument,
          },
        },
      })
      .provide([[select(connectionState.selectors.getSocket), dummySocket]])
      .select(listState.selectors.getUnsubscribedInstrumentIsins)
      .put(listState.actions.updateInstrumentSubscriptions(true))
      .dispatch(listState.actions.resubscribeAll())
      .silentRun();

    expect(spySend).toHaveBeenCalledTimes(1);
    expect(spySend).toHaveBeenCalledWith(
      JSON.stringify({ subscribe: 'SAG123' })
    );
  });
});
