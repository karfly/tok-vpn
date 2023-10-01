import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

import { telegramStickerLoader } from './_internal/tgs.loader';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.base || '/',
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@tok/ui/styles/local.scss";',
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
      minify: true,
    },
  };
});
