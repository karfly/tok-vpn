<template>
  <div v-bind="props" :class="$style.container">
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
      <source :src="loaded" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { WAS_INTERACTION_TOKEN } from '@tok/generation/tokens';
import { useAlerts } from '@tok/ui/use/alerts';
import { inject, ref, toRefs, watch } from 'vue';

import { VideoPressetProps } from './Media.presset.props';
import { useLoadedImage } from './useLoadedImage';

const props = defineProps<VideoPressetProps>();

const { src } = toRefs(props);

const alertsService = useAlerts();
const loaded = useLoadedImage(src);
const videoRef = ref<HTMLVideoElement | null>(null);
const wasInteraction = inject(WAS_INTERACTION_TOKEN, ref(false));

watch(
  [videoRef, wasInteraction],
  ([_video, _]) => {
    if (_video) {
      alertsService.show(`has video and ${_}`);

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
}
</style>
