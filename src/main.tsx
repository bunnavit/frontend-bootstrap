import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Font imports
import '@fontsource/quicksand';
import '@fontsource/raleway';
import '@fontsource/ubuntu-mono';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
