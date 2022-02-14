import React, { useEffect } from 'react';

export const App = () => {
  useEffect((): (() => void) => {
    console.log('App booting up');

    return () => console.log('App tearing down');
  }, []);

  return (
    <div className="App">
      <h1>WebSockets are coming soon!</h1>
    </div>
  );
};

export default App;
