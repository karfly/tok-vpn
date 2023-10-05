<template>
  <div v-bind="props">
    <component
      v-if="loaded"
      v-bind="props"
      :is="TelegramSticker"
      :json="loaded"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, watch } from 'vue';

import { StickerPressetProps } from './Media.presset.props';

// We have to do it this way because Lottie-web's bundled size is around 80kb
const TelegramSticker = defineAsyncComponent(() =>
  import('@tok/telegram-ui/components/Sticker').then((m) => m.Sticker)
);

const props = withDefaults(defineProps<StickerPressetProps>(), {
  src: null,
});

const { src } = toRefs(props);

const loaded = ref<TelegramStickerJson | undefined>();

const loadStickerJson = (loader: Promise<typeof import('*.tgs')>) => {
  loader.then((m) => {
    loaded.value = (m as { default: TelegramStickerJson }).default;
  });
};

watch(
  src,
  (value) => {
    if (value && typeof value === 'string') {
      console.error(
        'Sticker Preset: The sticker src is string. You need to use import like that: `import("./assets/.tgs")`. Otherwise it won\'t loaded'
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
