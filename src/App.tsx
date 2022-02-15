import React, { useEffect } from 'react';

import { GlobalStyle } from './styles/global'
import { Container } from './App.css'

export const App = () => {
  useEffect((): (() => void) => {
    console.log('App booting up');

    return () => console.log('App tearing down');
  }, []);

  return (
    <>
      <Container>
        <h1>WebSockets are coming soon!</h1>
      </Container>
      <GlobalStyle />
    </>
  );
};

export default App;
