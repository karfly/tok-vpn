<template>
  <slide-presset v-bind="props" full-height extends="slide" :button="null">
    <form :class="$style.form" @submit.prevent="onClick">
      <div v-for="control in form" :key="control.id" :class="$style.control">
        <checkbox-block
          v-if="control.type === 'checkbox'"
          v-bind="control"
          :model-value="!!generatedForm[control.id]"
          @update:model-value="onUpdate(control.id, $event)"
        />

        <input-text
          v-else
          v-bind="control"
          :model-value="generatedForm[control.id]"
          @focused="onFocused(control.id, $event)"
          @update:model-value="onUpdate(control.id, $event)"
        />
      </div>

      <div
        :class="[$style.container, debouncedFocused && $style.container_top]"
      >
        <flat-button
          v-bind="buttonProps"
          type="submit"
          :class="$style.button"
          @mousedown.stop.prevent
        >
          {{ i18nButton }}
        </flat-button>
      </div>
    </form>
  </slide-presset>
</template>

<script setup lang="ts">
import { SlidePresset } from '@tok/generation/pressets/Slide';
import { NANO_STATE_TOKEN } from '@tok/generation/tokens';
import { useCarousel } from '@tok/generation/use/carousel';
import { useTranslated } from '@tok/i18n';
import { CheckboxBlock } from '@tok/ui/components/CheckboxBlock';
import { FlatButton } from '@tok/ui/components/FlatButton';
import { InputText } from '@tok/ui/components/InputText';
import { useDebounceFn } from '@tok/ui/use/debounce';
import { computed, inject, reactive, ref, toRefs, watch } from 'vue';

import {
  FormControl,
  FormPressetDefaultProps,
  FormPressetProps,
} from './Form.presset.props';

const props = withDefaults(
  defineProps<FormPressetProps>(),
  FormPressetDefaultProps
);

const { form, button } = toRefs(props);

const nanoState = inject(NANO_STATE_TOKEN, null);

const carousel = useCarousel();

const focusedElement = ref<string[]>([]);
const debouncedFocused = ref(false);

const debounced = useDebounceFn((value) => {
  debouncedFocused.value = value;
}, 200);

const focused = computed(() => focusedElement.value.length > 0);

watch(
  focused,
  (value) => {
    debounced(value);
  },
  { immediate: true }
);

const buttonText = computed(() => {
  const value = button.value;

  return typeof value === 'string' ? value : value ? value.content : '';
});

const i18nButton = useTranslated(buttonText);

const buttonProps = computed(() => {
  const value = button.value;

  return typeof value === 'string' ? {} : value;
});

const onClick = () => {
  carousel?.next();
};

const stateValue = nanoState?.state;

const getInitValue = (control: FormControl) => {
  if (control.type === 'checkbox' || control.type === 'radio') {
    return stateValue?.value[control.id] ?? false;
  }

  if (control.type === 'input') {
    return stateValue?.value[control.id] ?? null;
  }

  return stateValue?.value[control.id] ?? null;
};

const reactiveValue = form.value.reduce((acc, control) => {
  const initValue = getInitValue(control);

  acc[control.id] = initValue;

  return acc;
}, {} as Record<string, unknown>);

nanoState?.update(reactiveValue);

const generatedForm = reactive<Record<string, unknown>>(reactiveValue);

const onUpdate = (id: string, value: unknown) => {
  generatedForm[id] = value;

  nanoState?.update({ [id]: value });
};

const onFocused = (id: string, value: boolean) => {
  if (value) {
    focusedElement.value = [...focusedElement.value, id];
  } else {
    focusedElement.value = focusedElement.value.filter((el) => el !== id);
  }
};
</script>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-top: 1.25rem;
}

.control {
  margin-bottom: 1.25rem;
}

.container {
  margin-top: auto;

  &_top {
    margin-top: initial;
  }
}

.button {
  width: 100%;
}
</style>
