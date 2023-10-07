<template>
  <slide-presset v-bind="props" :button="null">
    <slot />

    <div :class="[$style.links, $style['links_' + props.shape]]">
      <Link v-for="link in links" v-bind="link" :key="link.text" />
    </div>

    <paywall-popup
      v-model:opened="popupOpened"
      v-bind="popup"
      @on-select="onSelectOption"
    />

    <main-button
      v-if="carousel ? active : !!mainButtonComputedText"
      :keep-alive="!!carousel"
      :text="mainButtonComputedText"
      @on-click="onSubmit"
    />
  </slide-presset>
</template>

<script setup lang="ts">
import { PaywallPopup } from '@tok/generation/components/PaywallPopup';
import { SlidePresset } from '@tok/generation/pressets/slide';
import { FORM_STATE_TOKEN } from '@tok/generation/tokens';
import { useCarousel } from '@tok/generation/use/carousel';
import { useI18n } from '@tok/i18n';
import { MainButton } from '@tok/telegram-ui/components/MainButton';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { Link } from '@tok/ui/components/Link';
import { useAlerts } from '@tok/ui/use/alerts';
import { useMoney } from '@tok/ui/use/money';
import { computed, inject, ref, toRefs } from 'vue';

import {
  PrimitivePaywallDefaultProps,
  PrimitivePaywallProps,
} from './PrimitivePaywall.props';

const props = withDefaults(
  defineProps<PrimitivePaywallProps>(),
  PrimitivePaywallDefaultProps
);

const { mainButtonText, popup, selectedProduct, active } = toRefs(props);

const formState = inject(FORM_STATE_TOKEN, null);

const i18n = useI18n();
const tg = useTelegramSdk();
// to detect if we inside carousel or not, to prevent triggering MainButton.show()
const carousel = useCarousel();
const alertsService = useAlerts({ autoCloseOnUnmount: true });

const translatedMainButton = i18n.useTranslated(mainButtonText);
const paymentCanceledMessage = i18n.useTranslated(
  '_alerts.payment.canceled',
  'You have canceled the payment selection'
);

const priceFromProduct = computed(() => {
  const value = selectedProduct.value;

  return value ? `${value.price}` : '';
});

const _money = useMoney(priceFromProduct);

const mainButtonComputedText = computed(() => {
  const value = selectedProduct.value;
  const _text = translatedMainButton.value;
  const _price = _money.value.formatted;

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
    currency: _money.value.options.currency,
    price: _money.value.value,
    title: _product.title || 'Payment',
    description: _product.description || 'Payment description',
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

  &:not(&_stacked) {
    margin-top: auto;
  }
}
</style>
