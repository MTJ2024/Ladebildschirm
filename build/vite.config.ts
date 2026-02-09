import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Plugin to make script tags FiveM-compatible (no type="module", no crossorigin)
function fivemHtmlPlugin() {
  return {
    name: 'fivem-html',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html
        .replace(/ type="module"/g, '')
        .replace(/ crossorigin/g, '')
        .replace(/<script (src="[^"]*")><\/script>/g, '<script defer $1></script>');
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: 'src',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss(), fivemHtmlPlugin()],
      base: './',
      build: {
        outDir: path.resolve(__dirname, '../html'),
        emptyOutDir: true,
        assetsInlineLimit: 0,
        modulePreload: false,
        rollupOptions: {
          output: {
            format: 'iife',
            entryFileNames: 'assets/[name]-[hash].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
            inlineDynamicImports: true,
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
      }
    };
});
