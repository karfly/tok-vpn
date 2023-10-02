<template>
  <div>
    <component v-if="loaded" :is="TelegramSticker" :json="loaded" />
  </div>
</template>

<script setup lang="ts">
import { useTranslated } from '@tok/i18n';
import { computed, defineAsyncComponent, ref, toRefs, watch } from 'vue';

import { _MediaLoader, StickerPressetProps } from './Media.presset.props';

// We have to do it this way because Lottie-web's bundled size is around 80kb
const TelegramSticker = defineAsyncComponent(() =>
  import('@tok/telegram-ui/components/Sticker').then((m) => m.Sticker)
);

const props = defineProps<StickerPressetProps>();

const { src } = toRefs(props);

const probablyTranslated = computed(() => {
  const value = src?.value;

  return value && typeof value === 'string' ? value : '';
});

const translatedSrc = useTranslated(probablyTranslated);

const loaded = ref<TelegramStickerJson | undefined>();

const loadStickerJson = (loader: _MediaLoader<typeof import('*.tgs')>) => {
  loader.then((m) => {
    loaded.value = m.default as TelegramStickerJson;
  });
};

watch(
  translatedSrc,
  (value) => {
    if (value && typeof value === 'string') {
      console.error(
        'Sticker Preset: Even after translating the sticker src string, the issue persists. Please fix it'
      );

      return;
    }

    if (value && typeof value === 'object' && 'then' in value) {
      loadStickerJson(value);
    }
  },
  { immediate: true }
);
</script>
