import { Instrument, ListAction, ListState } from './list.state.types';

import { Company } from '../isin-search/search.state.types';

const REDUCER_NAME = `list`;

/** Action types */
const ADD_INSTRUMENT = `${REDUCER_NAME}/ADD_INSTRUMENT`;
const REMOVE_INSTRUMENT = `${REDUCER_NAME}/REMOVE_INSTRUMENT`;
const RESET = `${REDUCER_NAME}/RESET`;

/** Actions */
const addInstrument = (company: Company): ListAction => ({
  type: ADD_INSTRUMENT,
  payload: {
    company,
  },
});

const removeInstrument = (isin: string): ListAction => ({
  type: REMOVE_INSTRUMENT,
  payload: {
    isin,
  },
});

const reset = (): ListAction => ({
  type: RESET,
});

const initialState: ListState = {
  instruments: {},
};

/** Reducer */
const reducer = (
  state: ListState = initialState,
  action: ListAction
): ListState => {
  const { type, payload } = action;

  switch (type) {
    case ADD_INSTRUMENT: {
      return handleAddInstrument(state, payload!.company!);
    }
    case REMOVE_INSTRUMENT: {
      return handleRemoveInstrument(state, payload!.isin!);
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
export const handleAddInstrument = (
  state: ListState,
  company: Company
): ListState => {
  const newInstrument: Instrument = {
    company,
    price: 0,
    bid: 0,
    ask: 0,
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
  isin: string
): ListState => {
  delete state.instruments[isin];

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
    REMOVE_INSTRUMENT,
    RESET,
  },
  selectors: {
    getInstruments,
  },
  actions: {
    addInstrument,
    removeInstrument,
    reset,
  },
};

export default listState;
