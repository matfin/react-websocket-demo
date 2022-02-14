import React, { render } from '@testing-library/react';
import App from './App';

describe('App', (): void => {
  it('renders without error', (): void => {
    expect(render(<App />)).toBeTruthy();
  });
});
