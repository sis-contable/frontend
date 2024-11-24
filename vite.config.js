import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Dirección del backend
        changeOrigin: true,
        secure: false, // Si tu backend usa HTTPS con un certificado no confiable
        rewrite: (path) => path, // Opción para no cambiar la ruta
      },
    },
  },
});
