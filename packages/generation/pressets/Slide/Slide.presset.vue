<template>
  <primitive-slide v-bind="props" @on-click="onClick">
    {{ sdk.initDataUnsafe }}

    <h2 v-html="i18nTitle" />

    <p
      v-if="i18nDescription"
      v-html="i18nDescription"
      :class="$style.description"
    />

    <slot />
  </primitive-slide>
</template>

<script setup lang="ts">
import { PrimitiveSlide } from '@tok/generation/pressets/PrimitiveSlide';
import { useCarousel } from '@tok/generation/use/carousel';
import { useTranslated } from '@tok/i18n';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { toRefs } from 'vue';

import {
  SlidePressetDefaultProps,
  SlidePressetProps,
} from './Slide.presset.props';

const props = withDefaults(
  defineProps<SlidePressetProps>(),
  SlidePressetDefaultProps
);

const sdk = useTelegramSdk();

const { title, description, button } = toRefs(props);

const carousel = useCarousel(!button.value);
const i18nTitle = useTranslated(title);
const i18nDescription = useTranslated(description);

const onClick = () => {
  carousel?.next();
};
</script>

<style lang="scss" module>
.description {
  margin-top: 0.75rem;
}
</style>
