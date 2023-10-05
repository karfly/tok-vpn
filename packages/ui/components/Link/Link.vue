<template>
  <a
    v-html="translatedText"
    :href="translatedHref"
    :target="target"
    :class="$style.link"
  />
</template>

<script setup lang="ts">
import { useI18n } from '@tok/i18n';
import { toRefs } from 'vue';

import { LinkDefaultProps, LinkProps } from './Link.props';

const props = withDefaults(defineProps<LinkProps>(), LinkDefaultProps);

const { text, href } = toRefs(props);

const i18n = useI18n();

const translatedText = i18n.useTranslated(text);
const translatedHref = i18n.useTranslated(href);
</script>

<style lang="scss" module>
@import '@tok/ui/styles/local.scss';

.link {
  @include transition(opacity);

  color: var(--tok-link);
  text-decoration: none;
  font: var(--tok-font-s);

  &:hover {
    opacity: var(--tok-hover-opacity);
  }
}
</style>
