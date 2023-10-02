import '@tok/ui/styles/global.scss';

import {
  ASSETS_LOADER_TOKEN,
  AssetsLoader,
  defaultPressetsOptions,
  NANO_STATE_TOKEN,
  PressetOverrider,
  PRESSETS_OVERRIDER_TOKEN,
} from '@tok/generation/tokens';
import { AlertsPlugin } from '@tok/ui/use/alerts';
import { createApp, Plugin, ref } from 'vue';
import { createI18n } from 'vue-i18n';
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

type _App = Parameters<typeof createApp>[0];

const assetsLoaderPlugin: Plugin<AssetsLoader> = {
  install(app, options) {
    app.provide(ASSETS_LOADER_TOKEN, options);
  },
};

const pressetsPlugin: Plugin<PressetOverrider> = {
  install(app, options) {
    app.provide(PRESSETS_OVERRIDER_TOKEN, {
      ...defaultPressetsOptions,
      ...options,
    });
  },
};

const nanoStatePlugin: Plugin = {
  install(app) {
    const state = ref<Record<string, unknown>>({});

    const update = (value: Record<string, unknown>) => {
      state.value = {
        ...state.value,
        ...value,
      };
    };

    app.provide(NANO_STATE_TOKEN, { state, update });
  },
};

const themePlugin: Plugin = {
  install(app, theme: 'light' | 'dark' | 'auto') {
    app.provide('__theme', theme);
  },
};

export function bootstrapJson(App: _App, json: any) {
  const locale = json.locale || {};
  const fallback = locale.default as string;

  // todo: change to our i18n which support image translation
  const i18n = createI18n({
    locale: fallback,
    fallbackLocale: fallback,
    legacy: false,
    fallbackWarn: false,
    missingWarn: false,
    silentTranslationWarn: false,
  });

  const pages = (json.pages as any[]).map((config, index) => {
    return {
      path: index === 0 ? '/' : config.path || `/${index}`,
      component: () => import('@tok/generation/pressets/Route.vue'),
      meta: {
        config,
      },
    };
  });

  const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE || '/'),
    routes: ([] as RouteRecordRaw[]).concat(pages).concat({
      path: '/not-found',
      alias: '/:catchAll(.*)*',
      redirect: '/',
    }),
  });

  router.afterEach((to: RouteLocationNormalized) => {
    if (to.params.savedPosition) {
      return;
    }

    window.scrollTo({ top: 0 });
  });

  return createApp(App)
    .use(AlertsPlugin)
    .use(router)
    .use(i18n)
    .use(assetsLoaderPlugin, {
      locale: locale,
    })
    .use(themePlugin, json.theme || 'auto')
    .use(nanoStatePlugin)
    .use(pressetsPlugin, json.override || {})
    .mount('#app');
}
