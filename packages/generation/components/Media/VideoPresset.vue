<template>
  <div v-bind="props" :class="$style.container">
    <video
      v-autoplay
      autoplay
      playsinline
      muted
      loop
      controls="false"
      :class="$style.video"
    >
      <source :src="loaded" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { AutoplayDirective as vAutoplay } from '@tok/ui/directives/autoplay';
import { toRefs } from 'vue';

import { VideoPressetProps } from './Media.presset.props';
import { useLoadedImage } from './useLoadedImage';

const props = defineProps<VideoPressetProps>();

const { src } = toRefs(props);

const loaded = useLoadedImage(src);
</script>

<style lang="scss" module>
.container {
  position: relative;

  aspect-ratio: 16/9;
}

.video {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
