import {
  Instrument,
  ListAction,
  ListState,
  StockData,
} from './list.state.types';

import { Company } from '../isin-search/search.state.types';

const REDUCER_NAME = `list`;

/** Action types */
const ADD_INSTRUMENT = `${REDUCER_NAME}/ADD_INSTRUMENT`;
const UPDATE_INSTRUMENT = `${REDUCER_NAME}/UPDATE_INSTRUMENT`;
const REMOVE_INSTRUMENT = `${REDUCER_NAME}/REMOVE_INSTRUMENT`;
const UNSUBSCRIBE_REQUEST = `${REDUCER_NAME}/UNSUBSCRIBE_REQUEST`;
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

const removeInstrument = (instrument: Instrument): ListAction => ({
  type: REMOVE_INSTRUMENT,
  payload: {
    instrument,
  },
});

const unsubscribe = (instrument: Instrument): ListAction => ({
  type: UNSUBSCRIBE_REQUEST,
  payload: {
    instrument,
  }
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
      return handleUpdateInstrument(state, payload!.stockData!);
    }
    case ADD_INSTRUMENT: {
      return handleAddInstrument(state, payload!.company!);
    }
    case REMOVE_INSTRUMENT: {
      return handleRemoveInstrument(state, payload!.instrument!);
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
export const handleUpdateInstrument = (
  state: ListState,
  stockData: StockData
): ListState => {
  const instrumentToUpdate: Instrument = state.instruments[stockData.isin];
  const updatedInstrument: Instrument = {
    ...instrumentToUpdate,
    stockData,
    subscribed: true,
  };

  return {
    ...state,
    instruments: {
      ...state.instruments,
      [stockData.isin]: updatedInstrument,
    },
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
  instrument: Instrument
): ListState => {
  delete state.instruments[instrument.company.isin];

  return {
    ...state,
    instruments: { ...state.instruments },
  };
};

/** Selectors */
const getInstruments = ({ list }: { list: ListState }): Instrument[] =>
  Object.values(list.instruments);

const listState = {
  name: REDUCER_NAME,
  reducer,
  types: {
    ADD_INSTRUMENT,
    UPDATE_INSTRUMENT,
    REMOVE_INSTRUMENT,
    UNSUBSCRIBE_REQUEST,
    RESET,
  },
  selectors: {
    getInstruments,
  },
  actions: {
    addInstrument,
    removeInstrument,
    unsubscribe,
    updateInstrument,
    reset,
  },
};

export default listState;
