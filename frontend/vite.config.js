import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: process.env.NODE_ENV === 'production'
          ? 'https://razorpay-7.onrender.com'
          : 'http://localhost:4000', // Use localhost in development
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
