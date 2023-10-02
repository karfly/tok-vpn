<template>
  <root>
    <router-view />

    <template #overContent>
      <back-button :show="showBackButton" @on-click="onBackButton" />
    </template>
  </root>
</template>

<script setup lang="ts">
import { useI18n } from '@tok/i18n';
import { BackButton } from '@tok/telegram-ui/components/BackButton';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { useTheme } from '@tok/telegram-ui/use/theme';
import { Root } from '@tok/ui/components/Root';
import { useAlerts } from '@tok/ui/use/alerts';
import { computed, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const themeParam = inject('__theme', 'auto');

const theme = useTheme(themeParam);
const tg = useTelegramSdk();
const router = useRouter();
const i18n = useI18n();

const tgLang = tg.initDataUnsafe.user?.language_code || i18n.fallbackLocale;
const isSupported = i18n.available.includes(tgLang);

const lang = isSupported ? tgLang : i18n.fallbackLocale;

const alerts = useAlerts();

onMounted(() => {
  tg.expand();

  alerts.show(`actual: ${lang} fallback: ${i18n.fallbackLocale}`);

  if (i18n.fallbackLocale !== lang) {
    i18n.load(i18n.fallbackLocale).then((messages) => {
      i18n.setMessages(i18n.fallbackLocale, messages);
    });
  }

  i18n
    .load(lang)
    .then((messages) => {
      i18n.setMessages(lang, messages);
      i18n.locale.value = lang;
    })
    .finally(() => {
      tg.ready();
    });
});

const onBackButton = () => {
  const hasHistory = window.history.length > 2;

  if (hasHistory) {
    router.back();
  } else {
    router.replace('/');
  }
};

const showBackButton = computed(() => {
  const value = router.currentRoute.value;

  if (value.fullPath === '/') {
    return !!value.query.page;
  }

  return window.history.length > 2;
});

const setThemeAttribute = (theme: 'dark' | 'light') => {
  document.documentElement.setAttribute('data-theme', theme);
};

watch(theme, setThemeAttribute, { immediate: true });
</script>
