<template>
  <slide-presset v-bind="props" extends="slide" :button="null">
    <slot />

    <div :class="$style.links">
      <Link v-for="link in links" v-bind="link" :key="link.text" />
    </div>

    <tg-popup
      v-model="popupOpened"
      v-bind="popup"
      :title="translatedPopupTitle"
      :message="translatedPopupMessage"
      :buttons="translatedPopupButtons"
      @onSelect="onSelectOption"
    >
      <template #button-icon="{ item }">
        <media-presset
          v-if="item.media"
          v-bind="item.media"
          :class="$style.media"
          static
        />
      </template>
    </tg-popup>

    <main-button :text="mainButtonComputedText" @on-click="onSubmit" />
  </slide-presset>
</template>

<script setup lang="ts">
import { MediaPresset } from '@tok/generation/pressets/Media';
import { SlidePresset } from '@tok/generation/pressets/Slide';
import { NANO_STATE_TOKEN } from '@tok/generation/tokens';
import { tokTranslate, useI18n, useTranslated } from '@tok/i18n';
import { MainButton } from '@tok/telegram-ui/components/MainButton';
import { TgPopup } from '@tok/telegram-ui/components/TgPopup';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { Link } from '@tok/ui/components/Link';
import { useAlerts } from '@tok/ui/use/alerts';
import { computed, inject, ref, toRefs } from 'vue';

import {
  PrimitivePaywallDefaultProps,
  PrimitivePaywallProps,
} from './PrimitivePaywall.props';

const props = withDefaults(
  defineProps<PrimitivePaywallProps>(),
  PrimitivePaywallDefaultProps
);

const { mainButtonText, popup, selectedProduct } = toRefs(props);

const i18n = useI18n();
const tg = useTelegramSdk();
const nanoState = inject(NANO_STATE_TOKEN, null);
const alertsService = useAlerts();

const popupButtons = computed(() => popup.value.buttons);
const popupTitle = computed(() => popup.value.title);
const popupMessage = computed(() => popup.value.message || '');

const translatedMainButton = useTranslated(mainButtonText);
const translatedPopupTitle = useTranslated(popupTitle);
const translatedPopupMessage = useTranslated(popupMessage);
const translatedPopupButtons = computed(() => {
  const buttons = popupButtons.value;
  const locale = i18n.locale.value;
  // todo type
  const messages = (i18n.messages.value[locale] || {}) as Record<
    string,
    unknown
  >;
  // todo type
  const defaultMessages = (i18n.messages.value[i18n.fallbackLocale] ||
    {}) as Record<string, unknown>;

  return buttons.map((button) => {
    if ('text' in button) {
      return {
        ...button,
        text:
          tokTranslate(messages, button.text) ??
          tokTranslate(defaultMessages, button.text) ??
          button.text,
      };
    }

    return button;
  });
});

const mainButtonComputedText = computed(() => {
  const value = selectedProduct.value;
  const _text = translatedMainButton.value;

  if (!value || !_text) {
    return '';
  }

  return _text;
});

const popupOpened = ref(true);

const onSubmit = () => {
  popupOpened.value = true;
};

const onSelectOption = (
  id: 'telegram_payments' | 'wallet_pay' | string | undefined
) => {
  if (!id) {
    alertsService.show('You have cancelled this order', {
      type: 'error',
    });

    return;
  }

  const payload = nanoState ? nanoState.state.value : {};

  const _product = selectedProduct.value || {};

  const dataProduct = {
    ..._product,
    payment_method: id,
  };

  const data = JSON.stringify({
    product: dataProduct,
    payload,
  });

  tg.sendData(data);
};
</script>

<style lang="scss" module>
.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  margin-top: auto;
}

.media {
  color: var(--tok-white);

  margin-right: 0.75rem;
}
</style>
