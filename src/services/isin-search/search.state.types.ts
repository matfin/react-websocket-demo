export interface Company {
  name: string;
  shortName: string;
  isin: string;
}

export interface Payload {
  companies?: Company[];
  searchTerm?: string;
}

export interface SearchAction {
  type: string;
  payload?: Payload
}

export interface SearchState {
  searchTerm: string;
  companies: Company[];
}