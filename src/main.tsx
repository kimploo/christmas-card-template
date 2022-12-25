import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Snowfall from 'react-snowfall';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Noto Sans KR, sans-serif',
      }}
    >
      <App />
      <Snowfall color="white" />
    </MantineProvider>
  </React.StrictMode>
);
