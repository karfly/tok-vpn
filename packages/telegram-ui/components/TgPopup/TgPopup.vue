<template>
  <popup
    :model-value="webOpened"
    :title="title"
    :message="message"
    @update:model-value="onUpdate($event, undefined)"
  >
    <div :class="$style.buttons">
      <tg-popup-button
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
import { Popup } from '@tok/ui/components/Popup';
import Telegram from '@twa-dev/sdk';
import { PopupButton } from '@twa-dev/types';
import { computed, ref, toRefs, watch } from 'vue';

import TgPopupButton from './TgPopupButton.vue';

const props = withDefaults(
  defineProps<{
    type?: 'web' | 'telegram';
    modelValue: boolean;
    title: string;
    message?: string;
    buttons: PopupButton[];
  }>(),
  { title: '', message: '', buttons: () => [], type: 'telegram' }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onSelect', value: string | undefined): void;
}>();

const { type, modelValue, title, message, buttons } = toRefs(props);

const forceWeb = ref(false);

const webOpened = computed(() => {
  return (type.value === 'web' || forceWeb.value) && modelValue.value;
});

const onUpdate = (value: boolean, id: string | undefined) => {
  if (!value) {
    emit('onSelect', id);
  }

  emit('update:modelValue', value);
};

const onClose = onUpdate.bind(null, false);

const tryOpenTgPopup = () => {
  try {
    forceWeb.value = false;

    Telegram.showPopup(
      {
        title: title.value,
        message: message.value,
        buttons: buttons.value,
      },
      onClose
    );
  } catch (e) {
    forceWeb.value = true;
  }
};

watch(
  [type, modelValue],
  ([_type, _value]) => {
    if (_type === 'telegram' && _value) {
      tryOpenTgPopup();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" module>
.buttons {
  padding: 1px 0;

  border-radius: 0.75rem;

  background: var(--tok-stinger);
}
</style>
