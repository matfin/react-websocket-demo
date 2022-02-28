import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { Company } from '../../services/isin-search/search.state.types';
import InstrumentTile, { Props } from './instrument';

const company: Company = {
  isin: 'TEST123',
  name: 'Test Company',
  shortName: 'TST',
  bookmarked: false,
};

const defaultProps: Props = {
  instrument: {
    company,
    stockData: {
      isin: 'TEST123',
      bid: 1.0,
      price: 1.2,
      ask: 1.1,
    },
    subscribed: false,
  },
  onPressDelete: jest.fn()
};

describe('<InstrumentTile />', (): void => {
  it('renders the component without crashing', (): void => {
    expect(() => render(<InstrumentTile {...defaultProps} />)).not.toThrow();
  });

  it('renders with the correct content', (): void => {
    const { getByText } = render(<InstrumentTile {...defaultProps} />);

    expect(getByText('Test Company')).not.toBeNull();
    expect(getByText('TST / TEST123')).not.toBeNull();
    expect(getByText('€1.00')).not.toBeNull();
    expect(getByText('€1.10')).not.toBeNull();
    expect(getByText('€1.20')).not.toBeNull();
  });

  it('executes the correct callback on press delete', async (): Promise<void> => {
    const spyOnPressDelete = jest.fn();
    const { getByTestId } = render(<InstrumentTile {...defaultProps} onPressDelete={spyOnPressDelete} />);
    const deleteButton = getByTestId(`delete-instrument-TEST123`);

    fireEvent.click(deleteButton);

    await waitFor((): void => {
      expect(spyOnPressDelete).toHaveBeenCalledTimes(1);
      expect(spyOnPressDelete).toHaveBeenCalledWith(company)
    });
  });
});
