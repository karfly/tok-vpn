<template>
  <div v-bind="props" :class="$style.container">
    <button v-if="loaded" :class="$style.fallback" @click="forceRefresh">
      Video not playing?<br />Tap here
    </button>

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
import { useAlerts } from '@tok/ui/use/alerts';
import { inject, ref, toRefs, watch } from 'vue';

import { VideoPressetProps } from './Media.presset.props';
import { useLoadedImage } from './useLoadedImage';

const props = defineProps<VideoPressetProps>();

const { src } = toRefs(props);

const loaded = useLoadedImage(src);
const alertsService = useAlerts();

const videoRef = ref<HTMLVideoElement | null>(null);
const wasInteraction = inject(WAS_INTERACTION_TOKEN, ref(false));

// Required for iOS devices to initiate the first interaction with the page;
// otherwise, the video will not play automatically
// Note: MainButton is located outside of the miniapp, so the browser doesn't register the first interaction event
const forceRefreshEvents = ref(NaN);
const videoPlaying = ref(false);

const forceRefresh = () => {
  forceRefreshEvents.value = Date.now();
};

const onVideoPlay = (event: Event) => {
  const _video = event.currentTarget;

  if (_video instanceof HTMLVideoElement) {
    videoPlaying.value =
      _video.currentTime > 0 &&
      !_video.paused &&
      !_video.ended &&
      _video.readyState > 2;
  }
};

watch(
  [videoRef, wasInteraction, forceRefreshEvents],
  ([_video], _, onCleanup) => {
    onCleanup(() => {
      _video?.removeEventListener('play', onVideoPlay);
    });

    if (_video) {
      _video.play();

      _video.addEventListener('play', onVideoPlay);
    }
  },
  { immediate: true }
);

watch(
  videoPlaying,
  (val) => {
    alertsService.show(`isPlaying: ${val}`);
  },
  { immediate: true }
);
</script>

<style lang="scss" module>
@import '@tok/ui/styles/local.scss';

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
  @include clearbutton;

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
