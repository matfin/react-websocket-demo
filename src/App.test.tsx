import React, { render } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  Link: (): JSX.Element => <a />,
  Routes: (): JSX.Element => <div />,
  Route: (): JSX.Element => <div />,
}));

jest.mock('./components/notification-banner', () => ({
  __esModule: true,
  default: (): JSX.Element => <div />
}));

describe('App', (): void => {
  afterAll((): void => {
    jest.clearAllMocks();
  });

  it('renders without error', (): void => {
    expect(() => render(<App />)).not.toThrow();
  });
});
