<template><span /></template>

<script setup lang="ts">
import Telegram from '@twa-dev/sdk';
import { onBeforeUnmount, onMounted, toRefs, watch } from 'vue';

import { MainButtonEmits, MainButtonProps } from './MainButton.props';

const props = defineProps<MainButtonProps>();

const emit = defineEmits<MainButtonEmits>();

const { text, color, textColor, disabled, progress, keepAlive } = toRefs(props);

const TgMainButton = Telegram.MainButton;

const onClick = () => {
  emit('onClick');
};

onMounted(() => {
  TgMainButton.hide();
  TgMainButton.enable();
  TgMainButton.hideProgress();
  TgMainButton.setParams({
    color: color?.value,
    text_color: textColor?.value,
  });

  TgMainButton.onClick(onClick);
});

onBeforeUnmount(() => {
  TgMainButton.offClick(onClick);

  if (!keepAlive.value) {
    TgMainButton.hide();
  }
});

watch(
  [disabled, progress],
  ([_disabled, _progress]) => {
    _progress ? TgMainButton.showProgress() : TgMainButton.hideProgress();

    _disabled || _progress ? TgMainButton.disable() : TgMainButton.enable();
  },
  { immediate: true }
);

watch(
  [textColor, color],
  () => {
    TgMainButton.setParams({
      color: color?.value,
      text_color: textColor?.value,
    });
  },
  { immediate: true }
);

watch(
  text,
  (_text) => {
    if (!_text) {
      TgMainButton.isVisible && TgMainButton.hide();

      return;
    }

    TgMainButton.setText(_text);
    !TgMainButton.isVisible && TgMainButton.show();
  },
  { immediate: true }
);
</script>
