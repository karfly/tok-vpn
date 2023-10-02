<template>
  <root>
    <router-view />

    <template #overContent>
      <back-button :show="showBackButton" @on-click="onBackButton" />
    </template>
  </root>
</template>

<script setup lang="ts">
import { BackButton } from '@tok/telegram-ui/components/BackButton';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { useTheme } from '@tok/telegram-ui/use/theme';
import { Root } from '@tok/ui/components/Root';
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAutoi18nFromTelegram } from './use/i18n';

const themeParam = inject('__theme', 'auto');

const theme = useTheme(themeParam);
const tg = useTelegramSdk();
const router = useRouter();
const _ = useAutoi18nFromTelegram();
const opened = ref(false);

setTimeout(() => {
  opened.value = true;
}, 200);

onMounted(() => {
  tg.expand();
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

  return !!value.query.page && value.fullPath !== '/';
});

const calcAppHeight = () => {
  const doc = document.documentElement;

  const height = window.innerHeight;

  doc.style.setProperty('--tok-vh', height * 0.01 + 'px');
};

window.addEventListener('resize', calcAppHeight);
calcAppHeight();

const setThemeAttribute = (theme: 'dark' | 'light') => {
  document.documentElement.setAttribute('data-theme', theme);
};

watch(theme, setThemeAttribute, { immediate: true });
</script>
