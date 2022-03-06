import { CombinedAppState } from '../../store.types';
import { Company } from 'services/isin-search/search.state.types';
import { Instrument, ListState, StockData } from './list.state.types';
import mockState from 'mocks/mockState';
import listState, {
  handleAddInstrument,
  handleRemoveInstrument,
  handleUpdateInstrumentStockData,
} from './list.state';

describe('list state', (): void => {
  const dummyState: ListState = {
    instruments: {},
  };
  const company: Company = {
    name: 'Test Company',
    shortName: 'TST',
    isin: 'IE123456',
    bookmarked: false,
  };
  const instrument: Instrument = {
    company,
    stockData: {
      price: 0,
      bid: 0,
      ask: 0,
      isin: 'IE123456',
    },
    subscribed: false,
  };
  const stockData: StockData = {
    price: 100.0,
    bid: 99.0,
    ask: 98.0,
    isin: 'IE123456',
  };

  describe('actions', (): void => {
    it('returns the correct payload for addInstrument', (): void => {
      expect(listState.actions.addInstrument(company)).toEqual({
        type: listState.types.ADD_INSTRUMENT,
        payload: { company },
      });
    });

    it('returns the correct payload for removeInstrument', (): void => {
      expect(listState.actions.removeInstrument(company)).toEqual({
        type: listState.types.REMOVE_INSTRUMENT,
        payload: {
          company,
        },
      });
    });

    it('returns the correct payload for unsubscribe', (): void => {
      expect(listState.actions.unsubscribe(company)).toEqual({
        type: listState.types.UNSUBSCRIBE_REQUEST,
        payload: {
          company,
        },
      });
    });

    it('returns the correct payload for unsubscribeAll', (): void => {
      expect(listState.actions.unsubscribeAll()).toEqual({
        type: listState.types.UNSUBSCRIBE_ALL_REQUEST,
      });
    });

    it('returns the correct payload for resubscribeAll', (): void => {
      expect(listState.actions.resubscribeAll()).toEqual({
        type: listState.types.RESUBSCRIBE_ALL_REQUEST,
      });
    });

    it('returns the correct state for updateInstrumentSubscriptions', (): void => {
      expect(listState.actions.updateInstrumentSubscriptions(true)).toEqual({
        type: listState.types.UPDATE_INSTRUMENT_SUBSCRIPTIONS,
        payload: {
          subscribed: true,
        },
      });
    });

    it('returns the correct payload for reset', (): void => {
      expect(listState.actions.reset()).toEqual({
        type: listState.types.RESET,
      });
    });
  });

  describe('reducer', (): void => {
    it('sets the state with ADD_INSTRUMENT', (): void => {
      const result: ListState = listState.reducer(
        dummyState,
        listState.actions.addInstrument(company)
      );
      const expected: ListState = {
        instruments: {
          ['IE123456']: instrument,
        },
      };

      expect(result).toEqual(expected);
    });

    describe('updating instrument', (): void => {
      it('sets the state with UPDATE_INSTRUMENT', (): void => {
        const stateWithInstrument: ListState = {
          ...dummyState,
          instruments: {
            ['IE123456']: instrument,
          },
        };
        const result: ListState = listState.reducer(
          stateWithInstrument,
          listState.actions.updateInstrument(stockData)
        );
        const expected: ListState = handleUpdateInstrumentStockData(
          stateWithInstrument,
          stockData
        );
  
        expect(result).toEqual(expected);
      });

      it('sets the state with UPDATE_INSTRUMENT when the instrument does not exist', (): void => {
        const stateWithInstrument: ListState = {
          ...dummyState,
          instruments: {
            ['IE123456']: instrument,
          },
        };
        const result: ListState = listState.reducer(
          stateWithInstrument,
          listState.actions.updateInstrument({
            ...stockData,
            isin: 'IE7891011',
          })
        );
        const expected: ListState = handleUpdateInstrumentStockData(
          stateWithInstrument,
          {
            bid: 0,
            ask: 0,
            price: 0,
            isin: 'IE7891011',
          }
        );

        expect(result).toEqual(expected);
      });
    });

    it('sets the state with REMOVE_INSTRUMENT', (): void => {
      const stateWithInstrument: ListState = {
        ...dummyState,
        instruments: {
          ['IE123456']: instrument,
        },
      };
      const result: ListState = listState.reducer(
        stateWithInstrument,
        listState.actions.removeInstrument(company)
      );
      const expected: ListState = dummyState;

      expect(result).toEqual(expected);
    });

    it('sets the state with UPDATE_INSTRUMENT_SUBSCRIPTIONS', (): void => {
      const stateWithSubscribedInstrument: ListState = {
        ...dummyState,
        instruments: {
          ['IE123456']: {
            ...instrument,
            subscribed: true,
          },
        },
      };
      const result: ListState = listState.reducer(
        stateWithSubscribedInstrument,
        listState.actions.updateInstrumentSubscriptions(false)
      );
      const expected: ListState = {
        ...dummyState,
        instruments: {
          ['IE123456']: {
            ...instrument,
            subscribed: false,
          }
        }
      };

      expect(result).toEqual(expected);
    })

    it('sets the state with RESET', (): void => {
      const expected: ListState = dummyState;
      const result: ListState = listState.reducer(
        undefined,
        listState.actions.reset()
      );

      expect(result).toEqual(expected);
    });

    it('returns the default state with no type match', (): void => {
      const expected: ListState = dummyState;
      const result: ListState = listState.reducer(undefined, {
        type: 'SOMETHING_ELSE',
      });

      expect(result).toEqual(expected);
    });
  });

  describe('reducer utils', (): void => {
    it('handleUpdateInstrumentStockData', (): void => {
      const dummyStateWithInstrument: ListState = {
        ...dummyState,
        instruments: {
          ['IE123456']: instrument,
        },
      };
      const result: ListState = handleUpdateInstrumentStockData(
        dummyStateWithInstrument,
        stockData
      );
      const expected: ListState = {
        ...dummyState,
        instruments: {
          ['IE123456']: {
            ...instrument,
            stockData: stockData,
            subscribed: true,
          },
        },
      };

      expect(result).toEqual(expected);
    });

    it('handleAddInstrument', (): void => {
      expect(handleAddInstrument(dummyState, company)).toEqual({
        ...dummyState,
        instruments: {
          ['IE123456']: instrument,
        },
      });
    });

    it('handleRemoveInstrument', (): void => {
      expect(
        handleRemoveInstrument(
          {
            ...dummyState,
            instruments: {
              ['IE123456']: instrument,
            },
          },
          company
        )
      ).toEqual(dummyState);
    });
  });

  describe('selectors', (): void => {
    const appState: CombinedAppState = {
      ...mockState,
      list: {
        instruments: {
          ['IE123456']: instrument,
        },
      },
    };

    it('getInstruments', (): void => {
      expect(listState.selectors.getInstruments(appState)).toEqual([
        instrument,
      ]);
    });

    it('getInstrumentIsins', (): void => {
      expect(listState.selectors.getInstrumentIsins(appState)).toEqual([
        'IE123456',
      ]);
    });
  });
});
