<template>
  <div :class="$style.slide">
    <div ref="focusTrapRef" tabindex="0" :class="$style.focustrap" />

    <draw-presset
      v-if="media"
      v-bind="media"
      extends="media"
      :class="$style.media"
    />

    <div :class="$style.content" :style="{ textAlign: textAlign }">
      <slot />

      <flat-button
        v-if="buttonText"
        v-bind="buttonProps"
        :class="[$style.button, buttonAfterContent && $style.button_after]"
        @click="onClick"
        @mousedown.prevent
      >
        {{ i18nButton }}
      </flat-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DrawPresset } from '@tok/generation/pressets/DrawPresset';
import { useTranslated } from '@tok/i18n';
import { FlatButton } from '@tok/ui/components/FlatButton';
import { setNativeFocused } from '@tok/ui/dom/focus';
import { computed, ref, toRefs, watch } from 'vue';

import {
  PrimitiveSlideDefaultProps,
  PrimitiveSlideEmits,
  PrimitiveSlideProps,
} from './PrimitiveSlide.props';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<PrimitiveSlideProps>(),
  PrimitiveSlideDefaultProps
);

const emit = defineEmits<PrimitiveSlideEmits>();

const { button, active } = toRefs(props);

const focusTrapRef = ref<HTMLElement | null>(null);

const buttonText = computed(() => {
  const value = button.value;

  return typeof value === 'string' ? value : value ? value.content : '';
});

const buttonProps = computed(() => {
  const value = button.value;

  return typeof value === 'string' ? {} : value;
});

const i18nButton = useTranslated(buttonText);

watch(
  [active, focusTrapRef],
  ([value, focustrap]) => {
    if (value && focustrap) {
      setNativeFocused(focustrap, true, true);
    }
  },
  { immediate: true }
);

const onClick = () => {
  emit('onClick');
};
</script>

<style lang="scss" module>
.focustrap {
  width: 0;
  height: 0;
}

.slide {
  position: relative;
  min-height: 100vh;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.media {
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;

  background: linear-gradient(
    180deg,
    rgba(var(--tok-background-color-base), 0) 0%,
    var(--tok-background-color) 40%
  );
}

.button {
  margin-top: auto;
  width: 100%;

  &_after {
    margin-top: initial;
  }
}
</style>
