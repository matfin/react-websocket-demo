import React from 'react';
import { render } from '@testing-library/react'

import { Search, Props } from './search';

const defaultProps: Props = {
  componentId: 'isinSearch'
};

describe('<Search />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<Search {...defaultProps} />)).not.toThrow();
  });
});