import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { Instrument } from '../../services/isin-list/list.state.types';
import { Company } from '../../services/isin-search/search.state.types';
import { Search, Props } from './search';

const defaultProps: Props = {
  companies: [],
  subscribedInstruments: [],
  searchTerm: '',
  addInstrument: jest.fn(),
  reset: jest.fn(),
  updateSearchTerm: jest.fn(),
};

describe('<Search />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<Search {...defaultProps} />)).not.toThrow();
  });

  it('resets the state on component unmount', (): void => {
    const spyReset = jest.fn();
    const { unmount } = render(<Search {...defaultProps} reset={spyReset} />);

    unmount();

    expect(spyReset).toHaveBeenCalledTimes(1);
  });

  it('updates the search term on input', async (): Promise<void> => {
    const spyUpdateSearchTerm = jest.fn();
    const { getByRole } = render(
      <Search {...defaultProps} updateSearchTerm={spyUpdateSearchTerm} />
    );
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor((): void => {
      expect(spyUpdateSearchTerm).toHaveBeenCalledTimes(1);
      expect(spyUpdateSearchTerm).toHaveBeenCalledWith('Test');
    });
  });

  it('adds an instrument on click', async (): Promise<void> => {
    const spyAddInstrument = jest.fn();
    const company: Company = {
      name: 'Test',
      shortName: 'TST',
      isin: 'IE123',
    };
    const { getByRole } = render(
      <Search
        {...defaultProps}
        addInstrument={spyAddInstrument}
        companies={[company]}
      />
    );
    const resultItem = getByRole('button');

    fireEvent.click(resultItem);

    await waitFor((): void => {
      expect(spyAddInstrument).toHaveBeenCalledTimes(1);
      expect(spyAddInstrument).toBeCalledWith(company);
    });
  });

  describe('rendering results', (): void => {
    it('renders a list of search results', (): void => {
      const companies: Company[] = [
        { name: 'Test One', shortName: 'ONE', isin: 'IE123' },
      ];
      const subscribedInstrument: Instrument = {
        company: companies[0],
        subscribed: true,
        stockData: {
          ask: 1.0,
          bid: 1.1,
          price: 1.2,
          isin: 'IE123',
        },
      };
      const { getByText } = render(
        <Search
          {...defaultProps}
          subscribedInstruments={[subscribedInstrument]}
          companies={companies}
          searchTerm="test"
        />
      );

      expect(getByText('Test One')).not.toBeNull();
      expect(getByText('IE123 / ONE')).not.toBeNull();
    });

    it('renders the correct text when there are no results', (): void => {
      const { getByText } = render(
        <Search {...defaultProps} companies={[]} searchTerm="test" />
      );

      expect(getByText('No results for test')).not.toBeNull();
    });
  });
});
