<template>
  <div :class="$style.slide">
    <media-presset v-bind="_media" :class="$style.media" />

    <p :class="['b-text_xs', $style.count]">
      {{ index }} / {{ carousel.length }}
    </p>

    <h2 v-html="translatedTitle" class="b-text_h2" :class="$style.title" />

    <p v-html="translatedDescription" :class="$style.description" />

    <div :class="$style.footer">
      <flat-button
        size="l"
        :appearance="applied ? 'outline' : 'primary'"
        :class="$style.footer__button"
        style="--ark-padding: 0"
        @click="onToggle"
      >
        <template #icon>
          <check-icon v-if="applied" width="1.5em" height="1.5em" />
          <wind-icon v-else width="1.5em" height="1.5em" />
        </template>

        {{ translatedButton }}
      </flat-button>

      <flat-button
        v-bind="typeof nextButton === 'string' ? {} : nextButton"
        size="l"
        @click="onNext"
      >
        {{ translatedNext }}
      </flat-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MediaPresset,
  MediaPressetProps,
} from '@tok/generation/pressets/Media';
import { useCarousel } from '@tok/generation/use/carousel';
import { useTranslated } from '@tok/generation/use/translated';
import { FlatButton, FlatButtonProps } from '@tok/ui/components/FlatButton';
import { computed, ref, toRefs } from 'vue';

import checkIcon from './check.svg';
import windIcon from './wind.svg';

const props = defineProps<{
  title: string;
  description: string;
  actionButton: [string, string];
  nextButton: string | FlatButtonProps;
  media: [MediaPressetProps, MediaPressetProps];
}>();

const { title, actionButton, nextButton, description, media } = toRefs(props);

const applied = ref(false);

const translatedTitle = useTranslated(title);
const carousel = useCarousel();

const index = computed(() => {
  return carousel.index.value + 1;
});

const action = computed(() => {
  const value = applied.value;
  const [initial, _applied] = actionButton.value;

  return value ? _applied : initial;
});

const _media = computed(() => {
  const value = applied.value;
  const [initial, _applied] = media.value;

  return value ? _applied : initial;
});

const computedNext = computed(() => {
  const value = nextButton.value;

  return typeof value === 'string' ? value : (value as any).content;
});

const translatedButton = useTranslated(action);
const translatedDescription = useTranslated(description);
const translatedNext = useTranslated(computedNext);

const onToggle = () => {
  applied.value = !applied.value;
};

const onNext = () => {
  carousel.next();
};
</script>

<style lang="scss" module>
.slide {
  position: relative;
  min-height: calc(var(--ark-vh, 1vh) * 100);
  height: calc(var(--ark-vh, 1vh) * 100);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(180deg, rgba(28, 28, 29, 0) 0%, #1c1c1d 80%);
  }
}

.footer {
  display: flex;

  &__button {
    width: 100%;

    margin-right: 1rem;
  }
}

.count {
  color: var(--ark-oslo-64);

  margin-top: auto;
  margin-bottom: 1rem;
}

.media {
  position: absolute;
  top: 50%;
  left: 50%;
  height: calc(var(--ark-vh, 1vh) * 100);
  width: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
}

.title {
  margin-bottom: 0.75rem;
}

.description {
  margin-bottom: 1.25rem;
}
</style>
