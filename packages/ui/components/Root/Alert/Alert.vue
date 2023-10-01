<template>
  <div data-automation-id="tok-alert" class="alertRoot" :style="style">
    <svg-icon v-if="iconName" class="icon" :name="iconName" :size="20" />

    <div>
      <label v-if="label" class="label">
        {{ label }}
      </label>

      <span v-if="typeof content === 'string'" class="text">
        {{ content }}
      </span>

      <component v-else :is="content" :context="context" />
    </div>

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
  close: 'var(--tok-text-02)',
  color: 'var(--tok-text-01)',
  background:
    'linear-gradient(var(--tok-success-bg),var(--tok-success-bg)),var(--tok-base-01)',
} as const;

const errorColors = {
  iconColor: 'var(--tok-error-fill)',
  close: 'var(--tok-text-02)',
  color: 'var(--tok-text-01)',
  background:
    'linear-gradient(var(--tok-error-bg),var(--tok-error-bg)),var(--tok-base-01)',
} as const;

const colors = {
  success: successColors,
  error: errorColors,
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

  display: flex;
  align-items: center;

  width: 100%;

  padding: 16px 32px;
  padding-left: 16px;
  border-radius: 12px;
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
  @include strict-size(32px, 32px);
  @include transition(color);

  position: absolute;
  right: 0;
  top: 0;

  padding: 4px;
  border-radius: 12px;

  cursor: pointer;

  color: var(--tok-alert-close);

  &:hover {
    opacity: 0.8;
  }
}

.label {
  display: block;

  line-height: 1.25rem;
  font-weight: bold;

  margin-bottom: 4px;
}

.text {
  word-wrap: break-word;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  white-space: pre-line;
}
</style>
