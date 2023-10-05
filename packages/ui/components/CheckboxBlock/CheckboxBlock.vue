<template>
  <label
    :for="id"
    class="tok-checkbox-block"
    :data-size="size"
    :data-shape="shape"
    :data-state="state"
  >
    <slot>
      <span v-html="translatedPlaceholder" />
    </slot>

    <primitive-checkbox class="tok-checkbox-block-check" :value="modelValue">
      <input
        :id="id"
        class="tok-checkbox-block-native"
        type="checkbox"
        :checked="!!modelValue"
        :disabled="disabled"
        @change="onChange"
      />
    </primitive-checkbox>
  </label>
</template>

<script setup lang="ts">
import { useI18n } from '@tok/i18n';
import { getElementId } from '@tok/ui/functions';
import { computed, toRefs } from 'vue';

import {
  CheckboxBlockDefaultProps,
  CheckboxBlockEmits,
  CheckboxBlockProps,
} from './CheckboxBlock.props';
import PrimitiveCheckbox from './PrimitiveCheckbox.vue';

const props = withDefaults(
  defineProps<CheckboxBlockProps>(),
  CheckboxBlockDefaultProps
);

const emit = defineEmits<CheckboxBlockEmits>();

const { invalid, disabled, modelValue, placeholder } = toRefs(props);

const i18n = useI18n();

const translatedPlaceholder = i18n.useTranslated(placeholder);

const id = getElementId();

const state = computed(() => {
  if (disabled.value) {
    return 'disabled';
  }

  if (invalid.value) {
    return 'invalid';
  }

  if (modelValue.value) {
    return 'checked';
  }

  return undefined;
});

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;

  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
@import '@tok/ui/styles/local.scss';

.tok-checkbox-block {
  @include transition(outline-color);

  display: inline-flex;
  width: 100%;

  align-items: center;
  justify-content: space-between;
  outline: 1px solid var(--tok-text-color-16);
  user-select: none;
  cursor: pointer;
  text-align: left;

  white-space: pre-line;
  color: var(--tok-text-color);

  &[data-size='s'] {
    padding: 0 var(--tok-padding-s);
    height: var(--tok-height-s);
    min-height: var(--tok-height-s);
    border-radius: var(--tok-radius-s);

    font: var(--tok-font-xs);
  }

  &[data-size='m'] {
    padding: 0 var(--tok-padding-m);
    height: var(--tok-height-m);
    min-height: var(--tok-height-m);
    border-radius: var(--tok-radius-m);

    font: var(--tok-font-m);
  }

  &[data-size='l'] {
    padding: 0 var(--tok-padding-l);
    height: var(--tok-height-l);
    min-height: var(--tok-height-l);
    border-radius: var(--tok-radius-l);

    font: var(--tok-font-m);
  }

  &[data-shape='rounded'] {
    border-radius: 6.25rem;
  }

  &[data-state='checked'] {
    outline-color: var(--tok-primary);
    outline-width: 2px;
  }

  &[data-state='invalid'] {
    outline-color: var(--tok-error-fill);
    outline-width: 2px;
  }

  &[data-state='disabled'] {
    opacity: var(--tok-disabled-opacity);
    pointer-events: none;
  }
}

.tok-checkbox-block-check {
  margin-left: 1rem;
}

.tok-checkbox-block-native {
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
    pointer-events: none;
  }
}
</style>
