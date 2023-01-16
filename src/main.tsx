import { MantineProvider } from '@mantine/core';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Snowfall from 'react-snowfall';

const snowflakes = ['white', 'yellow', 'red', 'orange'].map((color) => {
  const img = document.createElement('img');
  img.src = `snowflakes/${color}-snowflake-2x.png`;
  return img;
});

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
      <Snowfall
        color="white"
        radius={[3, 7]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
        images={snowflakes}
      />
    </MantineProvider>
  </React.StrictMode>
);
