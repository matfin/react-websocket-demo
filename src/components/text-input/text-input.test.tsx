import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import TextInput, { Props } from './text-input';

const defaultProps: Props = {
  id: 'test-id',
  label: 'Text input',
  value: '',
  placeholder: '',
  onChange: jest.fn(),
};

describe('TextInput', (): void => {
  it('should render the comoonent', (): void => {
    expect(() => render(<TextInput {...defaultProps} />)).not.toThrow();
    expect(() =>
      render(<TextInput {...defaultProps} label={undefined} />)
    ).not.toThrow();
  });

  it('should execute the callback onChange', async (): Promise<void> => {
    const spyOnChange = jest.fn();
    const { getByRole } = render(
      <TextInput {...defaultProps} onChange={spyOnChange} />
    );
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Test' } });

    await waitFor((): void => {
      expect(spyOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
