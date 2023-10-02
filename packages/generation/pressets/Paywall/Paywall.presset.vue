<template>
  <slide-presset v-bind="props">
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

    <div :class="$style.links">
      <Link v-for="link in links" v-bind="link" :key="link.text" />
    </div>

    <tg-popup
      v-model="popupOpened"
      v-bind="popup"
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
import { Link } from '@tok/generation/pressets/Link';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { SlidePresset } from '@tok/generation/pressets/Slide';
import { NANO_STATE_TOKEN } from '@tok/generation/tokens/nanoState.token';
import { tokTranslate, useI18n, useTranslated } from '@tok/i18n';
import { MainButton } from '@tok/telegram-ui/components/MainButton';
import { TgPopup } from '@tok/telegram-ui/components/TgPopup';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';
import { Money } from '@tok/ui/components/Money';
import { setupMoney } from '@tok/ui/setup/setupMoney';
import { computed, inject, ref, toRefs } from 'vue';

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
const popupButtons = computed(() => popup.value.buttons);

const i18n = useI18n();
const translatedTitle = useTranslated(title);
const translatedDescription = useTranslated(description);
const translatedMainButton = useTranslated(mainButtonText);
const translatedPopupButtons = computed(() => {
  const buttons = popupButtons.value;
  const locale = i18n.locale.value;
  // todo type
  const messages = (i18n.messages.value[locale] || {}) as Record<
    string,
    unknown
  >;
  // todo type
  const defaultMessages = i18n.messages.value[i18n.fallbackLocale] as Record<
    string,
    unknown
  >;

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

const tg = useTelegramSdk();
const nanoState = inject(NANO_STATE_TOKEN, null);

const popupOpened = ref(false);

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
    title: translatedTitle.value,
    description: translatedDescription.value,
  };

  const data = JSON.stringify({
    product: dataProduct,
    payload,
  });

  tg.sendData(data);
};

const onSubmit = () => {
  popupOpened.value = true;
};
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

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  margin-top: auto;
}

.description {
  font: var(--tok-font-xs);
}

.icon {
  margin-right: 0.75rem;
  color: var(--tok-background-color);
}
</style>
