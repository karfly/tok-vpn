<template>
  <picture v-if="type === 'image'">
    <source v-if="webp" type="image/webp" :srcset="loadedWebp" />

    <img v-bind="{ ...$attrs, ...props }" :src="loaded" :class="$style.img" />
  </picture>

  <div v-else-if="type === 'sticker'">
    <component v-if="loaded" :is="TelegramSticker" :json="loaded" />
  </div>

  <svg-icon
    v-else-if="type === 'icon'"
    v-bind="(props as any)"
    :name="loaded"
  />
</template>

<script setup lang="ts">
import { SvgIcon } from '@tok/ui/components/SvgIcon';
import { defineAsyncComponent, markRaw, ref, toRefs, watch } from 'vue';

import { MediaPressetProps } from './Media.presset.props';

const props = defineProps<MediaPressetProps>();

const { type, src, webp } = toRefs(props);

const TelegramSticker = defineAsyncComponent(() =>
  import('@tok/telegram-ui/components/Sticker').then((m) => m.Sticker)
);

const loaded = ref<any>(null);
const loadedWebp = ref<any>(null);

watch(
  webp,
  (value) => {
    if (value) {
      value.then((m: any) => {
        loadedWebp.value = m.default;
      });
    }
  },
  { immediate: true }
);

watch(
  src,
  (value) => {
    if (value && typeof value !== 'string' && 'then' in value) {
      value.then((m: any) => {
        if (type.value === 'icon') {
          loaded.value = markRaw(m.default);
        } else {
          loaded.value = m.default;
        }
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" module>
.img {
  width: inherit;
  height: inherit;
}
</style>
