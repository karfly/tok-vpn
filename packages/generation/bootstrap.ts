import '@tok/ui/styles/global.scss';

import {
  defaultPressetsOptions,
  NANO_STATE_TOKEN,
  PressetOverrider,
  PRESSETS_OVERRIDER_TOKEN,
} from '@tok/generation/tokens';
import { TokI18nPlugin } from '@tok/i18n';
import { AlertsPlugin } from '@tok/ui/use/alerts';
import { createApp, Plugin, ref } from 'vue';
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';

type _App = Parameters<typeof createApp>[0];

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
  const { default: fallback, ...asyncLocales } = ((json.locale as {}) ||
    {}) as any;

  const i18nOptions = {
    default: fallback || 'en',
    asyncLocales,
  };

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
    .use(TokI18nPlugin, i18nOptions)
    .use(themePlugin, json.theme || 'auto')
    .use(nanoStatePlugin)
    .use(pressetsPlugin, json.override || {})
    .mount('#app');
}
