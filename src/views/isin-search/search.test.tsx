import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { Company } from '../../services/isin-search/search.state.types';
import { Search, Props } from './search';

const defaultProps: Props = {
  companies: [],
  searchTerm: '',
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

    fireEvent.change(input, { target: { value: 'Test' } })

    await waitFor((): void => {
      expect(spyUpdateSearchTerm).toHaveBeenCalledTimes(1);
      expect(spyUpdateSearchTerm).toHaveBeenCalledWith('Test');
    });
  });

  describe('rendering results', (): void => {
    it('renders a list of search results', (): void => {
      const companies: Company[] = [
        { name: 'Test One', shortName: 'ONE', isin: 'IE123' },
      ];
      const { getByText } = render(<Search {...defaultProps} companies={companies} searchTerm="test" />);

      expect(getByText('Test One')).not.toBeNull();
      expect(getByText('ONE')).not.toBeNull();
      expect(getByText('IE123')).not.toBeNull();
    });

    it('renders the correct text when there are no results', (): void => {
      const { getByText } = render(<Search {...defaultProps} companies={[]} searchTerm="test" />);

      expect(getByText('No results for test')).not.toBeNull();
    });
  });
});
