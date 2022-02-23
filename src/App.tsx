import React, { useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { GlobalStyle } from './styles/global';
import ConnectionState from './services/connection/connection.state';
import IsinList from './views/isin-list';
import IsinSearch from './views/isin-search';
import { Plus } from './components/svg';

import {
  BrandLogo,
  Container,
  Header,
  Nav,
  Main,
  SearchButton,
  NotificationBanner,
} from './App.css';

export interface Props {
  openConnection: () => void;
}

export const App = ({ openConnection }: Props) => {
  useEffect((): void => {
    openConnection();
  }, []);

  return (
    <>
      <Container>
        <Header>
          <Nav>
            <Link to="/">
              <BrandLogo />
            </Link>
            <SearchButton to="/search">
              Add <Plus fill="#fff" />
            </SearchButton>
          </Nav>
        </Header>
        <NotificationBanner />
        <Main>
          <Routes>
            <Route path="/" element={<IsinList />} />
            <Route path="/search" element={<IsinSearch />} />
          </Routes>
        </Main>
      </Container>
      <GlobalStyle />
    </>
  );
};

const mapDispatchToProps = {
  openConnection: ConnectionState.actions.openConnectionRequest,
};

export default connect(null, mapDispatchToProps)(App);
