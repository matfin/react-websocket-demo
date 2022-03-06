import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Company } from 'services/isin-search/search.state.types';
import SearchResult, { Props } from './search-result';

const defaultProps: Props = {
  onPress: jest.fn(),
  company: {
    name: 'Test Company',
    isin: 'IE12345678910',
    shortName: 'TES',
    bookmarked: false,
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
      shortName: 'TES',
      bookmarked: false,
    });
  });

  describe('bookmark icon', (): void => {
    it('shows a filled bookmark icon when subscribed', (): void => {
      const bookmarkedCompany: Company = {
        ...defaultProps.company,
        bookmarked: true,
      };
      const { getByTestId, queryByTestId } = render(<SearchResult {...defaultProps} company={bookmarkedCompany} />);

      expect(getByTestId('bookmark-filled')).not.toBeNull();
      expect(queryByTestId('bookmark')).toBeNull();
    });

    it('shows an unfilled bookmark icon when not subscribed', (): void => {
      const { getByTestId, queryByTestId } = render(<SearchResult {...defaultProps} />);

      expect(getByTestId('bookmark')).not.toBeNull();
      expect(queryByTestId('bookmark-filled')).toBeNull();
    });
  });
});
