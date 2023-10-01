<template>
  <a
    v-html="translatedText"
    :href="translatedHref"
    :target="target"
    :class="$style.link"
  />
</template>

<script setup lang="ts">
import { useTranslated } from '@tok/generation/use/translated';
import { toRefs } from 'vue';

import { LinkDefaultProps, LinkProps } from './Link.props';

const props = withDefaults(defineProps<LinkProps>(), LinkDefaultProps);

const { text, href } = toRefs(props);

const translatedText = useTranslated(text);
const translatedHref = useTranslated(href);
</script>

<style lang="scss" module>
.link {
  @include transition(opacity);

  color: var(--tok-link);
  text-decoration: none;
  font: var(--tok-font-s);

  &:hover {
    opacity: 0.82;
  }
}
</style>
