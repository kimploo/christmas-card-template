import { MantineProvider } from '@mantine/core';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Snowfall from 'react-snowfall';
import App from './App';
import { kakaoLoginContext } from './context/loginContext';

export const KakaoLoginContext = createContext(kakaoLoginContext);

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
      <KakaoLoginContext.Provider value={kakaoLoginContext}>
        <App />
      </KakaoLoginContext.Provider>
      <Snowfall
        color="white"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
    </MantineProvider>
  </React.StrictMode>
);
