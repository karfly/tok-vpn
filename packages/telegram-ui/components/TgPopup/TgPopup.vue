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
      >
        <template #icon>
          <slot name="button-icon" :item="button" />
        </template>
      </tg-popup-button>
    </div>
  </popup>
</template>

<script setup lang="ts" generic="T extends PopupButton">
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { Popup } from '@tok/ui/components/Popup';
import { PopupButton } from '@twa-dev/types';
import { computed, ref, toRefs, watch } from 'vue';

import {
  TgPopupDefaultProps,
  TgPopupEmits,
  TgPopupProps,
  TgPopupSlots,
} from './TgPopup.props';
import TgPopupButton from './TgPopupButton.vue';

const props = withDefaults(
  defineProps<TgPopupProps<T>>(),
  // @ts-expect-error familiar problem with generic props and default props
  TgPopupDefaultProps
);

const emit = defineEmits<TgPopupEmits>();

defineSlots<TgPopupSlots<T>>();

const { type, modelValue, title, message, buttons } = toRefs(props);

const sdk = useTelegramSdk();

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

    const _message = !message.value ? title.value : message.value;
    const _title = message.value ? title.value : undefined;

    sdk.showPopup(
      {
        title: _title,
        message: _message,
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
