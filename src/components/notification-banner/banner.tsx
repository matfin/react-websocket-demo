import React from 'react';
import { connect } from 'react-redux';

import { CombinedAppState } from '../../store.types';
import bannerState from '../../services/notification-banner/banner.state';
import { BannerType } from '../../services/notification-banner/banner.state.types';
import { Container, Message } from './banner.css';

export interface Props {
  className?: string;
  isShowing: boolean,
  type: BannerType;
  message?: string;
}

export const Banner = ({ className, message, type, isShowing }: Props): JSX.Element => (
  <Container data-testid="container" className={className} type={type} isShowing={isShowing}>
    <Message>
      {message}
    </Message>
  </Container>
);

/* istanbul ignore next */
const mapStateToProps = (store: CombinedAppState) => ({
  isShowing: bannerState.selectors.getIsShowing(store),
  type: bannerState.selectors.getType(store),
  message: bannerState.selectors.getMessage(store),
});

export default connect(mapStateToProps)(Banner);