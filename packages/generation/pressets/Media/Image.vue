<template>
  <picture v-if="type === 'image'">
    <source v-if="webp" type="image/webp" :srcset="loadedWebp" />

    <img
      v-bind="$attrs"
      :src="loadedSrc"
      :class="[$style.img, allowIntersection && $style.img_intersection]"
    />
  </picture>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import { ImagePressetProps } from './Media.presset.props';
import { useLoadedImage } from './useLoadedImage';

const props = defineProps<ImagePressetProps>();

const { src, webp } = toRefs(props);

const loadedSrc = useLoadedImage(src);
const loadedWebp = useLoadedImage(webp);
</script>

<style lang="scss" module>
.img {
  width: inherit;
  height: inherit;

  &_intersection {
    position: absolute;
    z-index: -1;
  }
}
</style>
