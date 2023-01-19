import { MantineProvider } from '@mantine/core';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Noto Sans KR, sans-serif',
        colors: {
          brandText: ['#CED4DA'],
        },
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
