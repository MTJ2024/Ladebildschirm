import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const resourceDir = 'greenzone420-loading-screen';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: resourceDir,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      base: './',
      build: {
        outDir: 'html',
        emptyOutDir: true,
        assetsInlineLimit: 0, // Keep all assets as separate files for FiveM NUI
        rollupOptions: {
          external: ['@google/genai'],
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, resourceDir),
        }
      }
    };
});
