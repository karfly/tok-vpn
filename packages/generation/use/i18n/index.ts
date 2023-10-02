import { ASSETS_LOADER_TOKEN } from '@tok/generation/tokens';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { inject, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export function useAutoi18nFromTelegram() {
  const tg = useTelegramSdk();
  const user = tg.initDataUnsafe.user;
  const tgLanguage = user?.language_code || 'en';

  const i18n = useI18n({ useScope: 'global' });
  const { locale: localeLoader = {} } = inject(ASSETS_LOADER_TOKEN, {});

  const available = Object.keys(localeLoader).filter((m) => m !== 'default');

  const lang = available.includes(tgLanguage)
    ? tgLanguage
    : (localeLoader.default as string);

  function loadAndSet(locale: string) {
    const loader = localeLoader[locale as keyof typeof localeLoader];

    if (!loader) {
      return Promise.resolve(null);
    }

    return (loader as any).then((m: any) => {
      i18n.setLocaleMessage(locale, m.default);

      i18n.locale.value = locale;
    });
  }

  onMounted(() => {
    if (lang) {
      loadAndSet(lang).finally(() => tg.ready());
    }
  });
}
