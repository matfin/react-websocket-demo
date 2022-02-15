import React from 'react';
import { render } from '@testing-library/react'

import { List, Props } from './list';

const defaultProps: Props = {
  componentId: 'isinList'
};

describe('<List />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<List {...defaultProps} />)).not.toThrow();
  });
});