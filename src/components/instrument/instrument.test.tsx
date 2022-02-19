import React from 'react';
import { render } from '@testing-library/react';

import InstrumentTile, { Props } from './instrument';

const defaultProps: Props = {
  instrument: {
    company: {
      isin: 'TEST123',
      name: 'Test Company',
      shortName: 'TST',
    },
    bid: 1.0,
    price: 1.2,
    ask: 1.1,
    subscribed: false,
  },
};

describe('<InstrumentTile />', (): void => {
  it('renders the component without crashing', (): void => {
    expect(() => render(<InstrumentTile {...defaultProps} />)).not.toThrow();
  });

  it('renders with the correct content', (): void => {
    const { getByText } = render(<InstrumentTile {...defaultProps} />);

    expect(getByText('Test Company')).not.toBeNull();
    expect(getByText('TST / TEST123')).not.toBeNull();
    expect(getByText('Bid €1.00')).not.toBeNull();
    expect(getByText('Ask €1.10')).not.toBeNull();
    expect(getByText('Price €1.20')).not.toBeNull();
  });
});
