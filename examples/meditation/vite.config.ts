import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

import { telegramStickerLoader } from './_internal/tgs.loader';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE || '/',
    plugins: [
      telegramStickerLoader(),
      vue(),
      svgLoader({
        defaultImport: 'component',
        svgoConfig: {
          plugins: [
            {
              name: 'cleanupIds',
              params: {
                remove: false,
                minify: false,
              },
            },
          ],
        },
      }),
    ],
    build: {
      assetsInlineLimit: 0,
      minify: true,
    },
  };
});
