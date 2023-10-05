<template>
  <li :class="$style.li">
    <span v-if="item.media" :class="$style.media">
      <media-presset v-bind="item.media" static />
    </span>

    <span v-html="translatedText" :class="$style.text" />
  </li>
</template>

<script setup lang="ts">
import { MediaPresset } from '@tok/generation/components/Media';
import { useI18n } from '@tok/i18n';
import { computed, toRefs } from 'vue';

import { ListItemProps } from './ListItem.props';

const props = defineProps<ListItemProps>();

const { item } = toRefs(props);

const i18n = useI18n();

const text = computed(() => item.value.text);

const translatedText = i18n.useTranslated(text);
</script>

<style lang="scss" module>
.li {
  display: flex;
  text-align: left;
  align-items: center;
}

.media {
  margin-right: 0.75rem;
  color: var(--tok-primary);
}
</style>
