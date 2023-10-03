<template>
  <primitive-slide v-bind="props" round-on-top @on-click="onClick">
    <div :class="$style.content">
      <p v-if="slideCount" :class="$style.count">{{ slideCount }}</p>

      <h2 v-html="i18nTitle" :class="$style.title" />

      <p
        v-if="i18nDescription"
        v-html="i18nDescription"
        :class="$style.description"
      />
    </div>

    <slot />
  </primitive-slide>
</template>

<script setup lang="ts">
import { PrimitiveSlide } from '@tok/generation/pressets/PrimitiveSlide';
import { useCarousel } from '@tok/generation/use/carousel';
import { useTranslated } from '@tok/i18n';
import { computed, toRefs } from 'vue';

import {
  BaseSlidePressetDefaultProps,
  BaseSlidePressetProps,
} from './BaseSlide.presset.props';

const props = withDefaults(
  defineProps<BaseSlidePressetProps>(),
  BaseSlidePressetDefaultProps
);

const { title, description, button } = toRefs(props);

const carousel = useCarousel(!button.value);
const i18nTitle = useTranslated(title);
const i18nDescription = useTranslated(description);

const slideCount = computed(() => {
  if (!carousel) {
    return null;
  }

  return `${carousel.index.value + 1} / ${carousel.length.value}`;
});

const onClick = () => {
  carousel?.next();
};
</script>

<style lang="scss" module>
.count {
  font: var(--tok-font-s);

  padding-top: 0.5rem;
  margin-bottom: 1rem;
}

.title {
  margin-bottom: 0.75rem;
}

.description {
  margin-top: -0.25rem;
}
</style>
