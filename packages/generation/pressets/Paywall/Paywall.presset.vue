<template>
  <slide-presset v-bind="props" full-height>
    <div :class="$style.content">
      <div v-if="product.media" :class="$style.media">
        <media-presset v-bind="product.media" />
      </div>

      <div>
        <div :class="$style.title">
          <h4 v-html="translatedTitle" />

          <money :value="product.price" />
        </div>

        <p v-html="translatedDescription" class="b-text_xs" />
      </div>
    </div>

    <div :class="$style.links">
      <Link v-for="link in links" v-bind="link" :key="link.text" />
    </div>

    <paywall-popup
      v-model="popupOpened"
      v-bind="popup"
      @onSelect="onSelectOption"
    />
  </slide-presset>
</template>

<script setup lang="ts">
import { Link } from '@tok/generation/pressets/Link';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { SlidePresset } from '@tok/generation/pressets/Slide';
import { NANO_STATE_TOKEN } from '@tok/generation/tokens/nanoState.token';
import { useTranslated } from '@tok/generation/use/translated';
import { useTelegram, useTelegramMainButton } from '@tok/telegram/use';
import { Money } from '@tok/ui/components/Money';
import { setupMoney } from '@tok/ui/setup/setupMoney';
import { computed, inject, onBeforeUnmount, ref, toRefs } from 'vue';

import PaywallPopup from './PaywallPopup.vue';
import {
  PaywallPressetDefaultProps,
  PaywallPressetProps,
} from './PaywallPresset.props';

const props = withDefaults(
  defineProps<PaywallPressetProps>(),
  PaywallPressetDefaultProps
);

const { product, mainButtonText, popup } = toRefs(props);

// todo
setupMoney({
  currency: product.value.currency,
});

const title = computed(() => product.value.title);
const description = computed(() => product.value.description);

const translatedTitle = useTranslated(title);
const translatedDescription = useTranslated(description);
const mainButton = useTelegramMainButton();
const tg = useTelegram();
const nanoState = inject(NANO_STATE_TOKEN, null);

const popupOpened = ref(false);

mainButton.show({
  text: mainButtonText.value,
});

const onSelectOption = (
  id: 'telegram_payments' | 'wallet_pay' | string | undefined
) => {
  if (!id) {
    return;
  }

  const payload = nanoState ? nanoState.state.value : {};

  const { media: _, ..._product } = product.value;

  const dataProduct = {
    ..._product,
    payment_method: id,
  };

  const data = JSON.stringify({
    product: dataProduct,
    payload,
  });

  tg.sendData?.(data);
};

const onSubmit = () => {
  popupOpened.value = true;
};

onBeforeUnmount(() => {
  mainButton.unregisterOnClick(onSubmit);
  mainButton.hide();
});

mainButton.registerOnClick(onSubmit);
</script>

<style lang="scss" module>
.content {
  display: flex;

  padding: 0.75rem;
  border-radius: 0.75rem;
  text-align: left;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;

  box-shadow: 0px 4px 24px 0px var(--tok-oslo-08);
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
  border-bottom: 1px solid var(--tok-oslo-08);
  font: var(--tok-font-h4);
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  margin-top: auto;
}
</style>
