import React, { useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from './styles/global'

import IsinList from './views/isin-list';
import IsinSearch from './views/isin-search';

import { Container, Header, Main } from './App.css'

export const App = () => {
  useEffect((): (() => void) => {
    console.log('App booting up');

    return () => console.log('App tearing down');
  }, []);

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
            <Route path="/" element={<IsinList componentId="isinList" />} />
            <Route path="/search" element={<IsinSearch componentId="isinSearch" />} />
          </Routes>
        </Main>
      </Container>
      <GlobalStyle />
    </>
  );
};

export default App;
