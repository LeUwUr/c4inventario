import React from 'react';
import { createRoot } from 'react-dom/client'; // Update the import
import App from './App';
import { LoginContextProvider } from './LoginContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </React.StrictMode>
);
