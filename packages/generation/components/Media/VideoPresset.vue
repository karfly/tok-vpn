<template>
  <div v-bind="props" :class="$style.container">
    <div v-if="loaded" :class="$style.fallback">
      Video not playing?<br />Tap here
    </div>

    <video
      v-if="loaded"
      ref="videoRef"
      autoplay
      playsinline
      muted
      loop
      :controls="false"
      :class="$style.video"
    >
      <source :src="loaded" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { WAS_INTERACTION_TOKEN } from '@tok/generation/tokens';
import { inject, ref, toRefs, watch } from 'vue';

import { VideoPressetProps } from './Media.presset.props';
import { useLoadedImage } from './useLoadedImage';

const props = defineProps<VideoPressetProps>();

const { src } = toRefs(props);

const loaded = useLoadedImage(src);
const videoRef = ref<HTMLVideoElement | null>(null);
const wasInteraction = inject(WAS_INTERACTION_TOKEN, ref(false));

watch(
  [videoRef, wasInteraction],
  ([_video, _]) => {
    if (_video) {
      _video.play();
    }
  },
  { immediate: true }
);
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
  background: transparent;
}

.fallback {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  text-align: center;
  font: var(--tok-body-xs);
  color: var(--tok-text-color-64);
}
</style>
