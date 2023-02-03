import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import App from './App';
import './index.css';

// Font imports
import '@fontsource/quicksand';
import '@fontsource/raleway';
import '@fontsource/ubuntu-mono';

import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withNormalizeCSS={true} withGlobalStyles={true}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
