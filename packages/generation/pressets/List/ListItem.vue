<template>
  <li :class="$style.li">
    <!-- todo -->
    <span v-if="item.media" style="margin-right: 0.75rem">
      <media-presset v-bind="item.media" />
    </span>

    <span v-html="translatedText" :class="$style.text" />
  </li>
</template>

<script setup lang="ts">
import { MediaPresset } from '@tok/generation/pressets/Media';
import { useTranslated } from '@tok/generation/use/translated';
import { computed, toRefs } from 'vue';

import { ListPressetProps } from './List.presset.props';

const props = defineProps<{ item: ListPressetProps['list'][number] }>();

const { item } = toRefs(props);

const text = computed(() => item.value.text);

const translatedText = useTranslated(text);
</script>

<style lang="scss" module>
.li {
  display: flex;
  text-align: left;
  align-items: center;
}
</style>
