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
import { MediaPresset } from '@tok/generation/components/Media';
import { ListItem } from '@tok/generation/pressets/List';
import { SlidePresset } from '@tok/generation/pressets/slide';
import { FORM_STATE_TOKEN } from '@tok/generation/tokens';
import { useCarousel } from '@tok/generation/use/carousel';
import { useI18n } from '@tok/i18n';
import { MainButton } from '@tok/telegram-ui/components/MainButton';
import { TgPopup } from '@tok/telegram-ui/components/TgPopup';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { Link } from '@tok/ui/components/Link';
import { useAlerts } from '@tok/ui/use/alerts';
import { useFormattedMoney } from '@tok/ui/use/formattedMoney';
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
const carousel = useCarousel(false);
const formState = inject(FORM_STATE_TOKEN, null);
const alertsService = useAlerts({ autoCloseOnUnmount: true });

const popupButtons = computed(() => popup.value.buttons);
const popupTitle = computed(() => popup.value.title);
const popupMessage = computed(() => popup.value.message || '');

const translatedMainButton = i18n.useTranslated(mainButtonText);
const translatedPopupTitle = i18n.useTranslated(popupTitle);
const translatedPopupMessage = i18n.useTranslated(popupMessage);
const paymentCanceledMessage = i18n.useTranslated(
  '_alerts.payment.canceled',
  'You have canceled the payment selection'
);

const translatedPopupButtons = computed(() => {
  i18n.locale.value;
  i18n.messages.value;

  return popupButtons.value.map((button) => {
    if ('text' in button) {
      return {
        ...button,
        text: i18n.translate(button.text),
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

const priceFromProduct = computed(() => {
  const value = selectedProduct.value;

  return value ? `${value.price}` : '';
});

const formattedMoney = useFormattedMoney(priceFromProduct);

const mainButtonComputedText = computed(() => {
  const value = selectedProduct.value;
  const _text = translatedMainButton.value;
  const _price = formattedMoney.value.formatted;

  if (carousel && active.value === false) {
    return '';
  }

  if (!value || !_text || popupOpened.value) {
    return '';
  }

  return _text.replace(/\{price\}/g, _price);
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

  const _product = selectedProduct.value!;

  const dataProduct = {
    payment_method: id,
    id: _product.id,
    currency: formattedMoney.value.options.currency,
    price: formattedMoney.value.value,
    title: _product.title,
    description: _product.description,
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

.feature:not(:first-child) {
  margin-top: 0.5rem;
}
</style>
