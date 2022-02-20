import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SearchResult, { Props } from './search-result';

const defaultProps: Props = {
  isSubscribed: false,
  company: {
    name: 'Test Company',
    isin: 'IE12345678910',
    shortName: 'TES'
  }
};

describe('<SearchResult />', (): void => {
  it('renders the component with the correct content', (): void => {
    const { getByText } = render(<SearchResult {...defaultProps} />);

    expect(getByText('Test Company')).not.toBeNull();
    expect(getByText('IE12345678910 / TES')).not.toBeNull();
  });

  it('executes a callback on click', (): void => {
    const spyOnPress = jest.fn();
    const { getByRole } = render(<SearchResult {...defaultProps} onPress={spyOnPress} />);
    const button = getByRole('button');
    
    fireEvent.click(button);

    expect(spyOnPress).toHaveBeenCalledTimes(1);

    expect(spyOnPress).toHaveBeenCalledWith({
      name: 'Test Company',
      isin: 'IE12345678910',
      shortName: 'TES'
    });
  });

  describe('bookmark icon', (): void => {
    it('shows a filled bookmark icon when subscribed', (): void => {
      const { getByTestId, queryByTestId } = render(<SearchResult {...defaultProps} isSubscribed />);

      expect(getByTestId('bookmark-filled')).not.toBeNull();
      expect(queryByTestId('bookmark')).toBeNull();
    });

    it('shows an unfilled bookmark icon when not subscribed', (): void => {
      const { getByTestId, queryByTestId } = render(<SearchResult {...defaultProps} isSubscribed={false} />);

      expect(getByTestId('bookmark')).not.toBeNull();
      expect(queryByTestId('bookmark-filled')).toBeNull();
    });
  });
});
