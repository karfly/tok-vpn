<template>
  <div :class="$style.slide">
    <div ref="focusTrapRef" tabindex="0" style="width: 0; height: 0" />

    <draw-presset
      v-if="media"
      v-bind="media"
      extends="media"
      :class="$style.media"
    />

    <div
      :class="[
        $style.content,
        fullHeight && $style.content_fullHeight,
        buttonText && $style.content_withButton,
      ]"
      :style="{ textAlign: textAlign }"
    >
      <slot />
    </div>

    <div v-if="buttonText" :class="$style.footer">
      <flat-button
        v-bind="buttonProps"
        :class="$style.footer__button"
        @click="onClick"
      >
        {{ i18nButton }}
      </flat-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DrawPresset } from '@tok/generation/pressets/DrawPresset';
import { useTranslated } from '@tok/generation/use/translated';
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
.slide {
  position: relative;
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.media {
  width: 100%;
}

.content {
  padding: 1rem;

  &_fullHeight {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &_withButton {
    padding-bottom: 76px;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  width: calc(100% - 1rem);

  &__button {
    width: 100%;
  }
}
</style>
