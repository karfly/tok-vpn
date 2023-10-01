<template>
  <label :for="id" :class="$style.label">
    <slot />

    <input
      :id="id"
      type="radio"
      :class="$style.native"
      :value="value"
      :checked="active"
      :name="name"
      @change="onChange($event, value as T)"
    />
  </label>
</template>

<script setup lang="ts" generic="T">
import { getElementId } from '@tok/ui/functions';

defineProps<{ value: T; name: string; active: boolean }>();

const emit = defineEmits<{
  (e: 'update:value', value: T): void;
}>();

const id = getElementId();

const onChange = (event: Event, item: T) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;

  if (value) {
    emit('update:value', item);
  }
};
</script>

<style lang="scss" module>
.label {
  position: relative;
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
