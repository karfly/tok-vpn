<template>
  <div :class="[$style.root, inline && $style.root_inline]" :style="{ gap }">
    <radio-item
      v-for="(item, index) in items"
      :key="index"
      :value="item"
      :active="identityMatcher(modelValue as T | null, item)"
      :name="name"
      :style="inline && { flex: '1' }"
      @update:value="onUpdate"
    >
      <slot
        :item="item"
        :index="index"
        :active="identityMatcher(modelValue as T | null, item)"
      >
        {{ item }}
      </slot>
    </radio-item>
  </div>
</template>

<script setup lang="ts" generic="T">
import { getElementId } from '@tok/ui/functions';

import RadioItem from './RadioItem.vue';
import {
  RadioListDefaultProps,
  RadioListEmits,
  RadioListProps,
  RadioListSlots,
} from './RadioList.props';

const name = getElementId();

withDefaults(defineProps<RadioListProps<T>>(), RadioListDefaultProps);

const emit = defineEmits<RadioListEmits<T>>();

defineSlots<RadioListSlots<T>>();

const onUpdate = (item: T) => {
  emit('update:modelValue', item);
};
</script>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;

  &_inline {
    flex-direction: row;
  }
}
</style>
