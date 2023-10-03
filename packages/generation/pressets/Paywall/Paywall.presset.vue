<template>
  <primitive-paywall v-bind="props" :selected-product="selectedProduct">
    <div :class="$style.content">
      <div v-if="product.media" :class="$style.media">
        <media-presset v-bind="product.media" />
      </div>

      <div>
        <div :class="$style.title">
          <h4 v-html="translatedTitle" />

          <money :value="product.price" />
        </div>

        <p v-html="translatedDescription" :class="$style.description" />
      </div>
    </div>
  </primitive-paywall>
</template>

<script setup lang="ts">
import { PrimitivePaywall } from '@tok/generation/components/PrimitivePaywall';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { useTranslated } from '@tok/i18n';
import { Money } from '@tok/ui/components/Money';
import { setupMoney } from '@tok/ui/setup/setupMoney';
import { computed, toRefs } from 'vue';

import {
  PaywallPressetDefaultProps,
  PaywallPressetProps,
} from './PaywallPresset.props';

const props = withDefaults(
  defineProps<PaywallPressetProps>(),
  PaywallPressetDefaultProps
);

const { product } = toRefs(props);

// todo
if (product.value.currency) {
  setupMoney({
    currency: product.value.currency,
  });
}

const title = computed(() => product.value.title);
const description = computed(() => product.value.description);

const translatedTitle = useTranslated(title);
const translatedDescription = useTranslated(description);

const selectedProduct = computed(() => {
  const value = product.value;

  return {
    ...value,
    title: translatedTitle.value,
    description: translatedDescription.value,
  };
});
</script>

<style lang="scss" module>
.content {
  display: flex;

  padding: 0.75rem;
  border-radius: 0.75rem;
  text-align: left;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;

  box-shadow: 0px 4px 24px 0px var(--tok-text-color-08);
}

.media {
  color: var(--tok-primary);

  margin-right: 0.75rem;
}

.title {
  display: flex;
  justify-content: space-between;

  padding-top: 0.5rem;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--tok-text-color-08);
  font: var(--tok-font-h4);
}

.description {
  font: var(--tok-font-xs);
}
</style>
