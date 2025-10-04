import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        server: resolve(__dirname, 'src/entry-server.tsx'),
        client: resolve(__dirname, 'src/entry-client.tsx'),
      },
      output: {
        format: 'es',
      },
    },
    outDir: 'dist-ssr',
  },
  ssr: {
    noExternal: ['react', 'react-dom', 'react-router-dom'],
  },
});
