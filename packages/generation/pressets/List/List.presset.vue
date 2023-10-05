<template>
  <slide-presset v-bind="props" extends="slide">
    <ul>
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
import { ListItem } from '@tok/generation/components/ListItem';
import { SlidePresset } from '@tok/generation/pressets/slide';

import {
  ListPressetDefaultProps,
  ListPressetProps,
} from './List.presset.props';

const props = withDefaults(
  defineProps<ListPressetProps>(),
  ListPressetDefaultProps
);
</script>

<style lang="scss" module>
.item:not(:first-child) {
  margin-top: 0.75em;
}
</style>
