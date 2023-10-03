<template>
  <primitive-paywall
    v-bind="props"
    :main-button-text="computedMainButtonText"
    :selected-product="productToSend"
  >
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
  </primitive-paywall>
</template>

<script setup lang="ts">
import { PrimitivePaywall } from '@tok/generation/components/PrimitivePaywall';
import { tokTranslate, useI18n, useTranslated } from '@tok/i18n';
import { formatMoney } from '@tok/ui/components/Money/formatMoney';
import { computed, ref, toRefs } from 'vue';

import {
  PaywallMultiProductsPressetDefaultProps,
  PaywallMultiProductsPressetProps,
} from './PaywallMultiProducts.presset.props';
import Product from './Product.vue';

const props = withDefaults(
  defineProps<PaywallMultiProductsPressetProps>(),
  PaywallMultiProductsPressetDefaultProps
);

const { products, mainButtonText } = toRefs(props);

const i18n = useI18n();

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

const translatedMainButton = useTranslated(mainButtonText);
const computedMainButtonText = computed(() => {
  const value = productToSend.value;

  if (!value) {
    return undefined;
  }

  const _text = translatedMainButton.value;

  return _text.replace(/\{price\}/g, formatMoney(value.price, value.currency));
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

.media {
  color: var(--tok-primary);

  margin-right: 0.75rem;
}
</style>
