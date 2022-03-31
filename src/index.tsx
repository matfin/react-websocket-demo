import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import createClientStore from './store';
import App from './App';

const store: Store = createClientStore();
const container: HTMLElement | null = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);