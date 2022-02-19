import React from 'react';
import { render } from '@testing-library/react';

import { Instrument } from '../../services/isin-list/list.state.types';

import { List, Props } from './list';

const defaultProps: Props = {
  instruments: [],
};

describe('<List />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<List {...defaultProps} />)).not.toThrow();
  });

  describe('rendering instruments', (): void => {
    it('renders a list of instruments', (): void => {
      const instruments: Instrument[] = [
        {
          company: {
            name: 'Test',
            shortName: 'TST',
            isin: 'IE123',
          },
          ask: 1.0,
          bid: 1.1,
          price: 1.2,
          subscribed: false,
        },
        {
          company: {
            name: 'Other',
            shortName: 'OTH',
            isin: 'IE456',
          },
          ask: 2.0,
          bid: 2.1,
          price: 2.2,
          subscribed: true,
        },
      ];
      const { getByText, queryByText } = render(<List {...defaultProps} instruments={instruments} />);

      expect(getByText('Test')).not.toBeNull();
      expect(getByText('Other')).not.toBeNull();
      expect(queryByText('Add some companies to see the latest updates!')).toBeNull();
    });

    it('renders a message when there are no instruments in the list', (): void => {
      const { getByText } = render(<List {...defaultProps} />);

      expect(getByText('Add some companies to see the latest updates!')).not.toBeNull();
    });
  });
});
