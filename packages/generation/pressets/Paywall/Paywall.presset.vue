<template>
  <primitive-paywall v-bind="props" :selected-product="productToSend">
    <form @submit.prevent>
      <base-product
        v-for="product in products"
        :key="product.id"
        v-bind="product"
        :active="product.id === selectedId"
        :class="$style.product"
        @on-select="onProductSelect"
      />
    </form>
  </primitive-paywall>
</template>

<script setup lang="ts">
import { PrimitivePaywall } from '@tok/generation/components/PrimitivePaywall';
import { tokTranslate, useI18n } from '@tok/i18n';
import { computed, ref, toRefs } from 'vue';

import BaseProduct from './BaseProduct.vue';
import {
  PaywallPressetDefaultProps,
  PaywallPressetProps,
} from './PaywallPresset.props';

const props = withDefaults(
  defineProps<PaywallPressetProps>(),
  PaywallPressetDefaultProps
);

const { products } = toRefs(props);

const selectedId = ref(products.value[0]?.id || null);

const i18n = useI18n();

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
    if (item.title) {
      item.title =
        tokTranslate(messages, item.title) ??
        tokTranslate(defaultMessages, item.title) ??
        item.title;
    }

    if (item.discount) {
      item.discount =
        tokTranslate(messages, item.discount) ??
        tokTranslate(defaultMessages, item.discount) ??
        item.discount;
    }

    if (item.pricePostfix) {
      item.pricePostfix =
        tokTranslate(messages, item.pricePostfix) ??
        tokTranslate(defaultMessages, item.pricePostfix) ??
        item.pricePostfix;
    }

    return item;
  });
});

const productToSend = computed(() => {
  const active = selectedId.value;

  return translatedProducts.value.find(({ id }) => id === active);
});

const onProductSelect = (id: string) => {
  selectedId.value = id;
};
</script>

<style lang="scss" module>
.feature:not(:first-child) {
  margin-top: 0.5rem;
}

.product:not(:first-child) {
  margin-top: 0.75rem;
}
</style>
