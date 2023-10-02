<template>
  <div data-automation-id="tok-alert" class="alertRoot" :style="style">
    <svg-icon v-if="iconName" class="icon" :name="iconName" />

    <span v-if="typeof content === 'string'" class="text">
      {{ content }}
    </span>

    <component v-else :is="content" :context="context" />

    <button
      v-if="closable"
      aria-label="close alert"
      title="close alert"
      class="close"
      @click="onClose"
    >
      <svg-icon name="close" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { SvgIcon } from '@tok/ui/components/SvgIcon';
import { computed, toRefs } from 'vue';

import {
  AlertDefaultProps,
  AlertEmits,
  AlertProps,
  AlertSlots,
} from './Alert.props';

defineOptions({
  name: 'Alert',
});

const props = withDefaults(defineProps<AlertProps>(), AlertDefaultProps);

const emit = defineEmits<AlertEmits>();

defineSlots<AlertSlots>();

const { type } = toRefs(props);

const successColors = {
  iconColor: 'var(--tok-success-fill)',
  close: 'var(--tok-background-color-32)',
  color: 'var(--tok-background-color)',
  background:
    'linear-gradient(var(--tok-success-bg),var(--tok-success-bg)),var(--tok-text-color)',
} as const;

const errorColors = {
  iconColor: 'var(--tok-error-fill)',
  close: 'var(--tok-background-color-32)',
  color: 'var(--tok-background-color)',
  background:
    'linear-gradient(var(--tok-error-bg),var(--tok-error-bg)),var(--tok-text-color)',
} as const;

const telegramColors = {
  iconColor: 'var(--tok-error-fill)',
  close: 'var(--tok-text-color-32)',
  color: 'var(--tok-text-color)',
  background: 'var(--tok-background-color-64)',
} as const;

const colors = {
  success: successColors,
  error: errorColors,
  telegram: telegramColors,
} as any;

const iconName = computed(() => {
  const value = type.value;

  return value === 'success'
    ? 'check-filled'
    : value === 'error'
    ? 'warning'
    : null;
});

const style = computed(() => {
  const value = type.value;
  const { background, color, close, iconColor } = colors[value];

  return {
    '--tok-alert-background': background,
    '--tok-alert-icon-color': iconColor,
    '--tok-alert-color': color,
    '--tok-alert-close': close,
  };
});

const onClose = () => {
  emit('close');
};

const context = {
  data: props.data,
  close: onClose,
};
</script>

<style lang="scss" scoped>
.alertRoot {
  position: relative;

  display: inline-flex;
  align-items: center;

  width: 100%;

  padding: 1rem 2rem;
  padding-left: 1rem;
  border-radius: 0.75rem;
  color: var(--tok-alert-color);
  background: var(--tok-alert-background);
}

.icon {
  align-self: flex-start;

  color: var(--tok-alert-icon-color);
  margin-right: 0.5em;
}

.close {
  @include clearbutton;
  @include strict-size(2rem, 2rem);
  @include transition(color);

  position: absolute;
  right: 0;
  top: 0;

  padding: 0.25rem;
  border-radius: 0.75rem;

  cursor: pointer;

  color: var(--tok-alert-close);

  &:hover {
    opacity: 0.8;
  }
}

.text {
  font: var(--tok-font-m);
  word-wrap: break-word;
  white-space: pre-line;
}
</style>
