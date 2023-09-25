import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import axios from 'axios';

axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
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
    </Provider>
  </StrictMode>
);
