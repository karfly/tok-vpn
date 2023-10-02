import { TOK_I18N_TOKEN } from '@tok/i18n/plugins';
import { inject } from 'vue';

export function useI18n() {
  const instance = inject(TOK_I18N_TOKEN)!;

  const availableFromAsync = Object.keys(instance.loaders || {});
  const availableStatic = Object.keys(instance.messages.value || {});

  const available = new Set([...availableFromAsync, ...availableStatic]);

  const load = (locale: string) => {
    if (!instance) {
      return Promise.reject('Not found i18n instance');
    }

    const loader = instance.loaders[locale];

    if (!loader) {
      return Promise.reject('Not found locale');
    }

    return loader.then((m) => m.default);
  };

  const setMessages = (locale: string, messages: Record<string, unknown>) => {
    if (!instance) {
      return;
    }

    const _messages = instance.messages.value;

    instance.messages.value = {
      ..._messages,
      [locale]: messages,
    };
  };

  return {
    fallbackLocale: instance.fallbackLocale || 'en',
    available: Array.from(available),
    load,
    setMessages,
    locale: instance.locale,
  };
}
