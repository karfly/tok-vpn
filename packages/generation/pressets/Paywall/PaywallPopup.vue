<template>
  <popup
    :model-value="modelValue"
    :title="title"
    :message="message"
    @update:model-value="onUpdate($event, undefined)"
  >
    <div :class="$style.buttons">
      <paywall-popup-button
        v-for="(button, index) in buttons"
        :key="button.id"
        v-bind="button"
        :border="index < buttons.length - 1"
        @click="onUpdate(false, button.id)"
      />
    </div>
  </popup>
</template>

<script setup lang="ts">
import type { TelegramPopupButton } from '@tok/telegram-ui/use';
import { Popup } from '@tok/ui/components/Popup';

// todo: move to telegram-ui
import PaywallPopupButton from './PaywallPopupButton.vue';

withDefaults(
  defineProps<{
    native?: boolean;
    modelValue: boolean;
    title: string;
    message?: string;
    buttons: TelegramPopupButton[];
  }>(),
  { title: '', message: '', buttons: () => [] }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onSelect', value: string | undefined): void;
}>();

const onUpdate = (value: boolean, id: string | undefined) => {
  if (!value) {
    emit('onSelect', id);
  }

  emit('update:modelValue', value);
};
</script>

<style lang="scss" module>
.buttons {
  padding: 1px 0;

  border-radius: 0.75rem;

  background: var(--tok-stinger);
}
</style>
