import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colours, fonts, fontWeights } from './styles/vars';
import Banner from './components/notification-banner';
import { Logo } from './components/svg';

export const Container = styled.div`
  position: relative;
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid: 3.5rem 2rem auto / auto;
  grid-template-areas:
    'header'
    'banner'
    'main';
`;

export const NotificationBanner = styled(Banner)`
  grid-area: banner;
  height: 2rem;
  padding: 0.5rem;
`

export const Header = styled.header`
  position: fixed;
  width: 100%;
  background-color: ${colours.secondary};
`;


export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 3.5rem;
  padding: 0 1rem;
`;

export const NavButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  height: 2.25rem;
  color: ${colours.secondary};
  background-color: ${colours.primary};
  font-weight: ${fontWeights.strong};
  font-size: ${fonts.xs.size}rem;
  border-radius: 0.8rem;

  svg {
    margin-left: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const ListButton = styled(NavButton)`
  margin-left: auto;
  margin-right: 1rem;

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

export const BrandLogo = styled(Logo)`
  width: 2rem;
  height: 2rem;
`;

export const Main = styled.main`
  grid-area: main;
`;
