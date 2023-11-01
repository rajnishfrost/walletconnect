import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WalletContextProvider } from './store/wallet';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </ErrorBoundary>
);
