<template>
  <button v-ripple :class="[$style.button, border && $style.button_border]">
    <media-presset v-if="media" v-bind="media" :class="$style.media" />

    <div :class="$style.content">
      <p v-html="translatedText" />

      <svg-icon name="arrow-right" :class="$style.icon" :size="24" />
    </div>
  </button>
</template>

<script setup lang="ts">
import {
  MediaPresset,
  MediaPressetProps,
} from '@tok/generation/pressets/Media';
import { useTranslated } from '@tok/i18n';
import { SvgIcon } from '@tok/ui/components/SvgIcon';
import { RippleDirective as vRipple } from '@tok/ui/directives/ripple';
import { toRefs } from 'vue';

import { PaywalPressetButtons } from './PaywallPresset.props';

type _Button = PaywalPressetButtons[number];

const props = withDefaults(
  defineProps<{
    media?: MediaPressetProps;
    id?: _Button['id'];
    text?: _Button['text'];
    border?: boolean;
  }>(),
  {
    text: '',
  }
);

const { text } = toRefs(props);

const translatedText = useTranslated(text);
</script>

<style lang="scss" module>
.button {
  @include clearbutton;
  position: relative;

  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;

  padding: 0.6875rem 0.75rem;

  text-align: left;
  color: var(--tok-background-color);

  font: var(--tok-font-l);

  &_border {
    &:after {
      position: absolute;
      content: '';
      right: 0.6875rem;
      bottom: 0;
      width: calc(100% - 4.125rem);
      height: 1px;
      background: var(--tok-background-color-08);
    }
  }
}

.media {
  color: var(--tok-text-color);
  margin-right: 0.75rem;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.icon {
  margin-left: 0.125rem;
  color: var(--tok-background-color-32);
}
</style>
