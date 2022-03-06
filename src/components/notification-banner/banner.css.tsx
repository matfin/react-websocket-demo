import styled from 'styled-components';
import { BannerType } from 'services/notification-banner/banner.state.types';
import { font } from 'styles/mixins';
import { colours, fonts } from 'styles/vars';

interface ContainerProps {
  isShowing: boolean;
  type: BannerType;
}

export const bannerBackground = (type: BannerType) => {
  switch (type) {
    case BannerType.ERROR:
      return colours.error;
    case BannerType.WARN:
      return colours.warning;
    default:
      return colours.success;
  }
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 100ms linear;
  opacity: 0;

  ${({ type }: ContainerProps) => `
    background-color: ${bannerBackground(type)};
  `}

  ${({ isShowing }: ContainerProps) =>
    isShowing &&
    `
    opacity: 1.0;
  `}
`;

export const Message = styled.p`
  ${font(fonts.sm)};
  color: ${colours.secondary};
`;
