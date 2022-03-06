import { Company } from 'services/isin-search/search.state.types';

export interface StockData {
  ask: number;
  bid: number;
  isin: string;
  price: number;
}

export interface Instrument {
  company: Company;
  stockData: StockData;
  subscribed: boolean;
}

export interface Payload {
  company?: Company;
  instrument?: Instrument;
  stockData?: StockData;
  subscribed?: boolean;
}

export interface Instruments {
  [index: string]: Instrument;
}

export interface ListAction {
  type: string;
  payload?: Payload;
}

export interface ListState {
  instruments: Instruments;
  counter?: number;
}
