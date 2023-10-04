<template>
  <slide-presset v-bind="props" :button="null">
    <ul v-if="computedFeatures.length > 0">
      <list-item
        v-for="(feature, index) in computedFeatures"
        :key="index"
        :item="feature"
        :class="$style.feature"
      />
    </ul>

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
import { SlidePresset } from '@tok/generation/pressets/_slide';
import { ListItem } from '@tok/generation/pressets/List';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { FORM_STATE_TOKEN } from '@tok/generation/tokens';
import { useCarousel } from '@tok/generation/use/carousel';
import { tokTranslate, useI18n, useTranslated } from '@tok/i18n';
import { MainButton } from '@tok/telegram-ui/components/MainButton';
import { TgPopup } from '@tok/telegram-ui/components/TgPopup';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { Link } from '@tok/ui/components/Link';
import { useMoney } from '@tok/ui/setup/setupMoney';
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

const { mainButtonText, popup, selectedProduct, active, features } =
  toRefs(props);

const i18n = useI18n();
const tg = useTelegramSdk();
// to detect if we inside carousel or not, to prevent triggering MainButton.show()
const carousel = useCarousel(true);
const formState = inject(FORM_STATE_TOKEN, null);
const alertsService = useAlerts({ autoCloseOnUnmount: true });

const popupButtons = computed(() => popup.value.buttons);
const popupTitle = computed(() => popup.value.title);
const popupMessage = computed(() => popup.value.message || '');

const translatedMainButton = useTranslated(mainButtonText);
const translatedPopupTitle = useTranslated(popupTitle);
const translatedPopupMessage = useTranslated(popupMessage);
const paymentCanceledMessage = useTranslated(
  '_alerts.payment.canceled',
  'You have canceled the payment selection'
);

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

const defaultMedia = {
  type: 'icon' as const,
  src: 'checkmark-fill',
} as const;

const computedFeatures = computed(() => {
  return (features?.value || []).map((item) => {
    if (typeof item === 'string') {
      return {
        media: defaultMedia,
        text: item,
      };
    }

    return {
      ...item,
      media: item.media ?? defaultMedia,
    };
  });
});

// todo
const formattedPrice = useMoney();

const mainButtonComputedText = computed(() => {
  const value = selectedProduct.value;
  const _text = translatedMainButton.value;

  if (carousel && active.value === false) {
    return '';
  }

  if (!value || !_text || popupOpened.value) {
    return '';
  }

  return _text.replace(/\{price\}/g, value.price);
});

const popupOpened = ref(false);

const onSubmit = () => {
  popupOpened.value = true;
};

let lastAlert: string | undefined;

const onSelectOption = (
  id: 'telegram_payments' | 'wallet_pay' | string | undefined
) => {
  if (!id) {
    if (lastAlert) {
      alertsService.close(lastAlert);
    }

    lastAlert = alertsService.show(paymentCanceledMessage.value, {
      type: 'error',
    });

    return;
  }

  const payload = formState ? formState.state.value : {};

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
  color: var(--tok-background-color);

  margin-right: 0.75rem;
}
</style>
