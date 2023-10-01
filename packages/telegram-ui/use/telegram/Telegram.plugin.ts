import { App, InjectionKey, Plugin } from 'vue';

import { TelegramSDK } from './telegram.type';

declare global {
  interface Window {
    Telegram: TelegramSDK;
  }
}

export const TELEGRAM_TOKEN = Symbol() as InjectionKey<
  TelegramSDK['WebApp'] | null
>;

const install = (app: App) => {
  const miniApp = window.Telegram?.WebApp || null;

  app.provide(TELEGRAM_TOKEN, miniApp);
};

export const TelegramPlugin: Plugin = {
  install,
};
