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
import { useI18n } from '@tok/i18n';
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
  i18n.locale.value;
  i18n.messages.value;

  return [...products.value].map((item) => {
    if (item.title) {
      item.title = i18n.translate(item.title);
    }

    if (item.description) {
      item.description = i18n.translate(item.description);
    }

    if (item.discount) {
      item.discount = i18n.translate(item.discount);
    }

    return item;
  });
});

const productToSend = computed(() => {
  const active = selectedId.value;

  return translatedProducts.value.find(({ id }) => id === active) || null;
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
