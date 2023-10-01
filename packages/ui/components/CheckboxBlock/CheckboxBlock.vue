<template>
  <label :for="id" :class="[$style.label, modelValue && $style.label_checked]">
    <slot>
      <span>{{ placeholder }}</span>
    </slot>

    <primitive-checkbox :value="modelValue" :class="$style.check">
      <input
        :id="id"
        type="checkbox"
        :checked="!!modelValue"
        :class="$style.native"
        @change="onChange"
      />
    </primitive-checkbox>
  </label>
</template>

<script setup lang="ts">
import { getElementId } from '@tok/ui/functions';

import {
  CheckboxBlockDefaultProps,
  CheckboxBlockEmits,
  CheckboxBlockProps,
} from './CheckboxBlock.props';
import PrimitiveCheckbox from './PrimitiveCheckbox.vue';

withDefaults(defineProps<CheckboxBlockProps>(), CheckboxBlockDefaultProps);

const emit = defineEmits<CheckboxBlockEmits>();

const id = getElementId();

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;

  emit('update:modelValue', value);
};
</script>

<style lang="scss" module>
.label {
  @include transition(outline-color);

  display: inline-flex;
  width: 100%;

  align-items: center;
  justify-content: space-between;
  outline: 1px solid var(--tok-oslo-16);
  user-select: none;
  cursor: pointer;
  text-align: left;

  color: var(--tok-oslo);

  padding: 0 var(--tok-padding-m);
  height: var(--tok-height-m);
  min-height: var(--tok-height-m);
  border-radius: var(--tok-radius-m);

  white-space: pre-line;

  &_checked {
    outline-color: var(--tok-primary);
    outline-width: 2px;
  }
}

.check {
  margin-left: 1rem;
}

.native {
  @include clearinput;

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
}
</style>
