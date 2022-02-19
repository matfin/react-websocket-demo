import { Company } from '../isin-search/search.state.types';

export interface Instrument {
  company: Company;
  price: number;
  bid: number;
  ask: number;
  subscribed: boolean;
}

export interface Payload {
  company?: Company;
  instrument?: Instrument;
  isin?: string;
}

export interface Instruments {
  [index: string]: Instrument
}

export interface ListAction {
  type: string;
  payload?: Payload;
}

export interface ListState {
  instruments: Instruments
}