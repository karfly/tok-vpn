<template>
  <div :class="[$style.toggle, modelValue && $style.toggle_checked]">
    <span :class="$style.circle" />

    <input
      :id="id"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :class="$style.native"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ToggleEmits, ToggleProps } from './Toggle.props';

defineProps<ToggleProps>();

const emit = defineEmits<ToggleEmits>();

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const checked = target.checked;

  emit('update:modelValue', checked);
};
</script>

<style lang="scss" module>
.toggle {
  @include transition(background);

  position: relative;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  background-color: var(--tok-toggle-background, var(--tok-base-02));
  border-radius: 1rem;
  color: var(--tok-toggle-color, var(--tok-white));

  height: 2rem;
  width: 3.5rem;

  &_checked {
    background: var(--tok-toggle-checked-background, var(--tok-primary));
  }
}

.circle {
  @include transition(transform);

  position: absolute;

  display: inline-block;
  height: 1.825rem;
  width: 1.825rem;
  border-radius: 100%;
  flex-shrink: 0;

  left: 0;
  top: 50%;

  background-color: currentColor;

  transform: translate(0.1rem, -50%);

  .toggle_checked & {
    transform: translate(calc(100% - 0.2rem), -50%);
  }
}

.native {
  @include clearinput;

  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
