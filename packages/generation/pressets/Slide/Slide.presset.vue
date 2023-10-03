<template>
  <primitive-slide v-bind="props" @on-click="onClick">
    <div>
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
import { PrimitiveSlide } from '@tok/generation/components/PrimitiveSlide';
import { useCarousel } from '@tok/generation/use/carousel';
import { useTranslated } from '@tok/i18n';
import { toRefs } from 'vue';

import {
  SlidePressetDefaultProps,
  SlidePressetProps,
} from './Slide.presset.props';

const props = withDefaults(
  defineProps<SlidePressetProps>(),
  SlidePressetDefaultProps
);

const { title, description, button } = toRefs(props);

const carousel = useCarousel(!button.value);
const i18nTitle = useTranslated(title);
const i18nDescription = useTranslated(description);

const onClick = () => {
  carousel?.next();
};
</script>

<style lang="scss" module>
.title {
  margin-bottom: 0.75rem;
}

.description {
  margin-top: -0.25rem;
}
</style>
