/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
});
