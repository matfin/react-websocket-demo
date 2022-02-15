import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global'

import IsinList from './views/isin-list';
import IsinSearch from './views/isin-search';

import { Container, Header, Main } from './App.css'

export const App = () => {
  return (
    <>
      <Container>
        <Header>
          <Link to="/">
            Home
          </Link>
          <Link to="/search">
            Search ISIN
          </Link>
        </Header>
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
