import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import { VitePluginRadar } from 'vite-plugin-radar';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      _: path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    eslintPlugin(),
    VitePluginRadar({
      analytics: {
        id: process.env.VITE_GA_ID,
      },
    }),
  ],
});
