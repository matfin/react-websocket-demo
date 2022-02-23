import React, { render } from '@testing-library/react';
import { App, Props } from './App';

jest.mock('react-router-dom', () => ({
  Link: (): JSX.Element => <a />,
  Routes: (): JSX.Element => <div />,
  Route: (): JSX.Element => <div />,
}));

jest.mock('./components/notification-banner', () => ({
  __esModule: true,
  default: (): JSX.Element => <div />,
}));

const defaultProps: Props = {
  openConnection: jest.fn(),
};

describe('App', (): void => {
  afterAll((): void => {
    jest.clearAllMocks();
  });

  it('renders without error', (): void => {
    expect(() => render(<App {...defaultProps} />)).not.toThrow();
  });

  it('calls to open a connection on mount', (): void => {
    const spyOpenConnection = jest.fn();

    render(<App openConnection={spyOpenConnection} />);

    expect(spyOpenConnection).toHaveBeenCalledTimes(1);
  });
});
