import { delay, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { CombinedAppState } from '../../store.types';

import listState from './list.state';
import { Instrument } from './list.state.types';
import { Company } from '../isin-search/search.state.types';
import connectionState from '../connection/connection.state';
import rootSaga from './list.saga';

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

const company: Company = {
  name: 'Saga',
  shortName: 'SAG',
  isin: 'SAG123',
}

const instrument: Instrument = {
  company,
  stockData: {
    bid: 1.0,
    ask: 0.9,
    price: 1.1,
    isin: 'SAG123',
  },
  subscribed: false,
};

const spySend = jest.fn();
const spyAddEventListener = jest.fn();

const dummySocket: WebSocket = {
  send: spySend,
  addEventListener: spyAddEventListener,
} as unknown as WebSocket;

describe('list saga', (): void => {
  it('handleUnsubscribeInstrument', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState(mockState)
      .provide([
        [select(connectionState.selectors.getSocket), dummySocket],
        [matchers.call.fn(delay), null]
      ])
      .put(listState.actions.removeInstrument(instrument))
      .dispatch(listState.actions.unsubscribe(instrument))
      .silentRun();
    
    expect(spySend).toHaveBeenCalledTimes(1);
    expect(spySend).toHaveBeenCalledWith(JSON.stringify({ unsubscribe: 'SAG123' }));
  });

  it('handleOnInstrumentAdded', async (): Promise<void> => {
    await expectSaga(rootSaga)
      .withState(mockState)
      .provide([
        [select(connectionState.selectors.getSocket), dummySocket],
      ])
      // .call(subscribe, dummySocket, company) TODO: fix
      .dispatch(listState.actions.addInstrument(company))
      .silentRun();
  });
});