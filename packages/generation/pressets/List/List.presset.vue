<template>
  <slide-presset v-bind="props" extends="slide">
    <!-- todo -->
    <ul style="margin-top: 1rem">
      <list-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :class="$style.item"
      />
    </ul>
  </slide-presset>
</template>

<script setup lang="ts">
import { SlidePresset } from '@tok/generation/pressets/Slide';

import {
  ListPressetDefaultProps,
  ListPressetProps,
} from './List.presset.props';
import ListItem from './ListItem.vue';

const props = withDefaults(
  defineProps<ListPressetProps>(),
  ListPressetDefaultProps
);
</script>

<style lang="scss" module>
.item {
  margin-top: 0.75em;
}
</style>
