import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SearchResult, { Props } from './search-result';

const defaultProps: Props = {
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
    expect(getByText('IE12345678910')).not.toBeNull();
    expect(getByText('TES')).not.toBeNull();
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
});
