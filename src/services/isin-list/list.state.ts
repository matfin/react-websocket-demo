import { createSelector } from '@reduxjs/toolkit';

import {
  Instrument,
  Instruments,
  ListAction,
  ListState,
  StockData,
} from './list.state.types';

import { Company } from 'services/isin-search/search.state.types';

const REDUCER_NAME = `list`;

/** Action types */
const ADD_INSTRUMENT = `${REDUCER_NAME}/ADD_INSTRUMENT`;
const UPDATE_INSTRUMENT = `${REDUCER_NAME}/UPDATE_INSTRUMENT`;
const REMOVE_INSTRUMENT = `${REDUCER_NAME}/REMOVE_INSTRUMENT`;
const UNSUBSCRIBE_REQUEST = `${REDUCER_NAME}/UNSUBSCRIBE_REQUEST`;
const UNSUBSCRIBE_ALL_REQUEST = `${REDUCER_NAME}/UNSUBSCRIBE_ALL_REQUEST`;
const RESUBSCRIBE_ALL_REQUEST = `${REDUCER_NAME}/RESUBSCRIBE_ALL_REQUEST`;
const UPDATE_INSTRUMENT_SUBSCRIPTIONS = `${REDUCER_NAME}/UPDATE_INSTRUMENT_SUBSCRIPTIONS`;
const RESET = `${REDUCER_NAME}/RESET`;

/** Actions */
const addInstrument = (company: Company): ListAction => ({
  type: ADD_INSTRUMENT,
  payload: {
    company,
  },
});

const updateInstrument = (stockData: StockData): ListAction => ({
  type: UPDATE_INSTRUMENT,
  payload: {
    stockData,
  },
});

const removeInstrument = (company: Company): ListAction => ({
  type: REMOVE_INSTRUMENT,
  payload: {
    company,
  },
});

const unsubscribe = (company: Company): ListAction => ({
  type: UNSUBSCRIBE_REQUEST,
  payload: {
    company,
  },
});

const unsubscribeAll = (): ListAction => ({
  type: UNSUBSCRIBE_ALL_REQUEST,
});

const resubscribeAll = (): ListAction => ({
  type: RESUBSCRIBE_ALL_REQUEST,
});

const updateInstrumentSubscriptions = (subscribed: boolean): ListAction => ({
  type: UPDATE_INSTRUMENT_SUBSCRIPTIONS,
  payload: {
    subscribed,
  },
});

const reset = (): ListAction => ({
  type: RESET,
});

/** Reducer */
const initialState: ListState = {
  instruments: {},
};

const reducer = (
  state: ListState = initialState,
  action: ListAction
): ListState => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_INSTRUMENT: {
      return handleUpdateInstrumentStockData(state, payload!.stockData!);
    }
    case ADD_INSTRUMENT: {
      return handleAddInstrument(state, payload!.company!);
    }
    case REMOVE_INSTRUMENT: {
      return handleRemoveInstrument(state, payload!.company!);
    }
    case UPDATE_INSTRUMENT_SUBSCRIPTIONS: {
      return handleUpdateInstrumentsSubscribed(state, payload!.subscribed!);
    }
    case RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

/** Redux state update utilities */
export const handleUpdateInstrumentStockData = (
  state: ListState,
  stockData: StockData
): ListState => {
  const instrumentExists = !!state.instruments[stockData.isin];

  if (!instrumentExists) {
    return state;
  }

  return {
    ...state,
    instruments: {
      ...state.instruments,
      [stockData.isin]: {
        ...state.instruments[stockData.isin],
        stockData,
        subscribed: true,
      }
    }
  }
}

export const handleUpdateInstrumentsSubscribed = (
  state: ListState,
  subscribed: boolean
): ListState => {
  const { instruments } = state;
  const unsubscribed: Instruments = Object.values(instruments)
    .map(
      (instrument: Instrument): Instrument => ({ ...instrument, subscribed })
    )
    .reduce((acc: Instruments, curr: Instrument): Instruments => {
      return {
        ...acc,
        [curr.company.isin]: curr,
      };
    }, {});

  return {
    ...state,
    instruments: unsubscribed,
  };
};

export const handleAddInstrument = (
  state: ListState,
  company: Company
): ListState => {
  const newInstrument: Instrument = {
    company,
    stockData: {
      bid: 0,
      ask: 0,
      price: 0,
      isin: company.isin,
    },
    subscribed: false,
  };

  return {
    ...state,
    instruments: {
      ...state.instruments,
      [company.isin]: newInstrument,
    },
  };
};

export const handleRemoveInstrument = (
  state: ListState,
  { isin }: Company
): ListState => {
  const newInstruments: Instruments = { ...state.instruments };

  delete newInstruments[isin];

  return {
    ...state,
    instruments: newInstruments,
  };
};

/** Selectors */
const instrumentsSelector = ({
  list: { instruments },
}: {
  list: ListState;
}): { [index: string]: Instrument } => instruments;

const selectInstruments = createSelector(
  instrumentsSelector,
  (instruments: { [index: string]: Instrument }): Instrument[] =>
    Object.values(instruments)
);

const selectInstrumentIsins = createSelector(
  instrumentsSelector,
  (instruments: { [index: string]: Instrument }): string[] =>
    Object.values(instruments).map(
      ({ company: { isin } }: Instrument): string => isin
    )
);

const selectSubscribedIsins = createSelector(
  instrumentsSelector,
  (instruments: { [index: string]: Instrument }): string[] =>
    Object.values(instruments)
      .filter(({ subscribed }: Instrument): boolean => subscribed)
      .map(({ company: { isin } }: Instrument): string => isin)
);

const selectUnsubscribedIsins = createSelector(
  instrumentsSelector,
  (instruments: { [index: string]: Instrument }): string[] =>
    Object.values(instruments)
      .filter(({ subscribed }: Instrument): boolean => !subscribed)
      .map(({ company: { isin } }: Instrument): string => isin)
);

const listState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    ADD_INSTRUMENT,
    UPDATE_INSTRUMENT,
    REMOVE_INSTRUMENT,
    UNSUBSCRIBE_REQUEST,
    UNSUBSCRIBE_ALL_REQUEST,
    RESUBSCRIBE_ALL_REQUEST,
    UPDATE_INSTRUMENT_SUBSCRIPTIONS,
    RESET,
  },
  selectors: {
    getInstruments: selectInstruments,
    getInstrumentIsins: selectInstrumentIsins,
    getSubscribedInstrumentIsins: selectSubscribedIsins,
    getUnsubscribedInstrumentIsins: selectUnsubscribedIsins,
  },
  actions: {
    addInstrument,
    removeInstrument,
    unsubscribe,
    unsubscribeAll,
    resubscribeAll,
    updateInstrumentSubscriptions,
    updateInstrument,
    reset,
  },
};

export default listState;
