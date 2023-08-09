import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserContextProvider } from './contexts/CurrentUserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CurrentUserContextProvider>
      <App />
    </CurrentUserContextProvider>
  </BrowserRouter>
);
