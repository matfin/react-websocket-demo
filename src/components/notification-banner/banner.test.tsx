import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';

import { BannerType } from 'services/notification-banner/banner.state.types';
import { Banner, Props } from './banner';

const defaultProps: Props = {
  isShowing: false,
  type: BannerType.SUCCESS,
  message: '',
};

describe('<Banner />', (): void => {
  it('renders the component', (): void => {
    expect(() => <Banner {...defaultProps} />).not.toThrow();
  });

  it('renders the correct content', (): void => {
    const { getByText } = render(<Banner {...defaultProps} message="Test message" />);

    expect(getByText('Test message')).not.toBeNull();
  });

  describe('styles', (): void => {
    it('has the correct style as a success banner', (): void => {
      const { getByTestId } = render(<Banner {...defaultProps} type={BannerType.SUCCESS} />);
      const container = getByTestId('container');

      expect(container).toHaveStyleRule('background-color', '#00ab66');
    });

    it('has the correct style as a warning banner', (): void => {
      const { getByTestId } = render(<Banner {...defaultProps} type={BannerType.WARN} />);
      const container = getByTestId('container');

      expect(container).toHaveStyleRule('background-color', '#ff5833');
    });

    it('has the correct style as an error banner', (): void => {
      const { getByTestId } = render(<Banner {...defaultProps} type={BannerType.ERROR} />);
      const container = getByTestId('container');

      expect(container).toHaveStyleRule('background-color', '#ed4337');
    });

    it('has the correct opaicty when not showing', (): void => {
      const { getByTestId } = render(<Banner {...defaultProps} isShowing={false} />);
      const container = getByTestId('container');

      expect(container).toHaveStyleRule('opacity', '0');
    });

    it('has the correct opaicty when showing', (): void => {
      const { getByTestId } = render(<Banner {...defaultProps} isShowing />);
      const container = getByTestId('container');

      expect(container).toHaveStyleRule('opacity', '1.0');
    });
  });
});