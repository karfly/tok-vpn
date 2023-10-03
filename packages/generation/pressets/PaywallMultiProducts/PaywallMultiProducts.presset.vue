<template>
  <slide-presset v-bind="props" extends="slide" :button="null">
    <form :class="$style.form" :style="productWidthStyle" @submit.prevent>
      <div
        v-for="item in translatedProducts"
        :key="item.id"
        :class="$style.product"
      >
        <product
          v-bind="item"
          :active="activeId === item.id"
          @on-select="onProductSelect"
        />
      </div>
    </form>

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
          :class="$style.icon"
        />
      </template>
    </tg-popup>

    <main-button :text="translatedMainButton" @on-click="onSubmit" />
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
import { computed, inject, ref, toRefs } from 'vue';

import {
  PaywallMultiProductsPressetDefaultProps,
  PaywallMultiProductsPressetProps,
} from './PaywallMultiProducts.presset.props';
import Product from './Product.vue';

const props = withDefaults(
  defineProps<PaywallMultiProductsPressetProps>(),
  PaywallMultiProductsPressetDefaultProps
);

const { products, mainButtonText, popup } = toRefs(props);

const i18n = useI18n();
const tg = useTelegramSdk();
const nanoState = inject(NANO_STATE_TOKEN, null);

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

const popupOpened = ref(false);

const onSubmit = () => {
  popupOpened.value = true;
};

const activeId = ref(products.value[0]?.id || null);

const translatedProducts = computed(() => {
  return [...products.value].map((item) => {
    const locale = i18n.locale.value;

    const messages = (i18n.messages.value[locale] || {}) as Record<
      string,
      unknown
    >;
    // todo type
    const defaultMessages = (i18n.messages.value[i18n.fallbackLocale] ||
      {}) as Record<string, unknown>;

    // todo: find the better way
    if (item.bestText) {
      item.bestText =
        tokTranslate(messages, item.bestText) ??
        tokTranslate(defaultMessages, item.bestText) ??
        item.bestText;
    }

    if (item.title) {
      item.title =
        tokTranslate(messages, item.title) ??
        tokTranslate(defaultMessages, item.title) ??
        item.title;
    }

    if (item.description) {
      item.description =
        tokTranslate(messages, item.description) ??
        tokTranslate(defaultMessages, item.description) ??
        item.description;
    }

    return item;
  });
});

const productToSend = computed(() => {
  const active = activeId.value;

  return translatedProducts.value.find(({ id }) => id === active);
});

const onProductSelect = (id: string) => {
  activeId.value = id;
};

const productWidthStyle = computed(() => {
  const length = products.value.length;

  if (length <= 3) {
    return {
      '--tok-product-width': `calc(100% / ${length})`,
    };
  }

  return {
    '--tok-product-width': `calc(100% / 2 - 10%)`,
  };
});

const onSelectOption = (
  id: 'telegram_payments' | 'wallet_pay' | string | undefined
) => {
  if (!id) {
    return;
  }

  const payload = nanoState ? nanoState.state.value : {};

  const _product = productToSend.value || {};

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
.form {
  @include hide-scroll;

  display: flex;
  overflow-x: auto;

  padding-top: 1.25rem;
  margin: 0 -0.3125rem;
}

.product {
  min-width: var(--tok-product-width);
  max-width: var(--tok-product-width);
  flex-basis: var(--tok-product-width);

  padding: 0 0.3125rem;
  box-sizing: border-box;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  margin-top: auto;
}
</style>
