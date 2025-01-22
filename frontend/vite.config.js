import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'https://razorpay-7.onrender.com' ||'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
