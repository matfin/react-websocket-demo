import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global'

import IsinList from './views/isin-list';
import IsinSearch from './views/isin-search';
import { Plus } from './components/svg';

import { BrandLogo, Container, Header, Nav, Main, SearchButton, NotificationBanner } from './App.css'

export const App = () => {
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

export default App;
