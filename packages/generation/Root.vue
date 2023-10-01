<template>
  <root>
    <router-view />
  </root>
</template>

<script setup lang="ts">
import { useTelegram, useTelegramBackButton } from '@tok/telegram';
import { Root } from '@tok/ui/components/Root';
import { computed, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAutoi18nFromTelegram } from './use/i18n';

const theme = inject('__theme', 'auto');

useAutoi18nFromTelegram();

const tg = useTelegram();
const backButton = useTelegramBackButton();
const router = useRouter();

onMounted(() => {
  tg.expand();
});

const backButtonCallback = () => {
  const hasHistory = window.history.length > 2;

  if (hasHistory) {
    router.back();
  } else {
    router.replace('/');
  }
};

const pageQuery = computed(() => {
  const value = router.currentRoute.value;

  return value.query.page;
});

watch(
  [router.currentRoute, pageQuery],
  ([value]) => {
    const hasHistory = window.history.length > 2 && value.fullPath !== '/';

    if (hasHistory) {
      backButton.show();
    } else {
      backButton.hide();
    }
  },
  { immediate: true }
);

backButton.registerOnClick(backButtonCallback);

const calcAppHeight = () => {
  const doc = document.documentElement;

  const height = window.innerHeight;

  doc.style.setProperty('--tok-vh', height * 0.01 + 'px');
};

window.addEventListener('resize', calcAppHeight);
calcAppHeight();

const setTheme = (theme: 'light' | 'dark' | 'auto' = 'light') => {
  if (theme !== 'auto') {
    document.documentElement.setAttribute('data-theme', theme);
  }
};

const onChangeTheme = () => {
  setTheme(tg.getTheme());
};

if (theme === 'auto') {
  tg.onEvent?.('themeChanged', onChangeTheme);
}

setTheme(theme);
</script>
