import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { Instrument } from 'services/isin-list/list.state.types';

import { List, Props } from './list';

const instruments: Instrument[] = [
  {
    company: {
      name: 'Test',
      shortName: 'TST',
      isin: 'IE123',
      bookmarked: false,
    },
    stockData: {
      ask: 1.0,
      bid: 1.1,
      price: 1.2,
      isin: 'IE123',
    },
    subscribed: false,
  },
  {
    company: {
      name: 'Other',
      shortName: 'OTH',
      isin: 'IE456',
      bookmarked: false,
    },
    stockData: {
      ask: 2.0,
      bid: 2.1,
      price: 2.2,
      isin: 'IE456',
    },
    subscribed: true,
  },
];

const defaultProps: Props = {
  unsubscribe: jest.fn(),
  unsubscribeAll: jest.fn(),
  resubscribeAll: jest.fn(),
  instruments,
};

describe('<List />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<List {...defaultProps} />)).not.toThrow();
  });

  it('resubscribes and unsubscribes instrument feeds on mount / unmount', (): void => {
    const spyResubscribeAll = jest.fn();
    const spyUnsubscribeAll = jest.fn();
    const { unmount } = render(<List {...defaultProps} unsubscribeAll={spyUnsubscribeAll} resubscribeAll={spyResubscribeAll} />);

    unmount();

    expect(spyResubscribeAll).toHaveBeenCalledTimes(1);
    expect(spyUnsubscribeAll).toHaveBeenCalledTimes(1);
  });

  it('calls to unsubscribe on press delete', async (): Promise<void> => {
    const spyUnsubscribe = jest.fn();
    const { getByTestId } = render(<List {...defaultProps} unsubscribe={spyUnsubscribe} />);
    const deleteButton = getByTestId(`delete-instrument-${instruments[0].company.isin}`);

    fireEvent.click(deleteButton);

    await waitFor((): void => {
      expect(spyUnsubscribe).toHaveBeenCalledTimes(1);
      expect(spyUnsubscribe).toHaveBeenCalledWith(instruments[0].company);
    });
  });

  describe('rendering instruments', (): void => {
    it('renders a list of instruments', (): void => {
      
      const { getByText, queryByText } = render(<List {...defaultProps} instruments={instruments} />);

      expect(getByText('Test')).not.toBeNull();
      expect(getByText('Other')).not.toBeNull();
      expect(queryByText('Add some companies to see the latest updates!')).toBeNull();
    });

    it('renders a message when there are no instruments in the list', (): void => {
      const { getByText } = render(<List {...defaultProps} instruments={[]} />);

      expect(getByText('Add some companies to see the latest updates!')).not.toBeNull();
    });
  });
});
