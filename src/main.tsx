import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import axios from 'axios';

import { MantineColorsTuple, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const brandTextColors: MantineColorsTuple = [
  '#eaf7fd',
  '#e2e7ee',
  '#c6cdd4',
  '#a8b2bc',
  '#8e9aa6',
  '#7d8b9a',
  '#748494',
  '#627181',
  '#556575',
  '#44586a',
];

axios.defaults.withCredentials = true;

const theme = createTheme({
  fontFamily: 'Noto Sans Korean, sans-serif',
  colors: {
    brandText: brandTextColors,
  },
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>,
);
