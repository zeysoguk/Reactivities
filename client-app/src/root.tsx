import ReactDOM from 'react-dom/client';
import { StoreContext, store } from './app/stores/store';
import { router } from './app/router/Routes';
import { RouterProvider } from 'react-router-dom';
import React from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
);
