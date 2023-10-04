<template>
  <li :class="$style.li">
    <span v-if="item.media" :class="$style.media">
      <media-presset v-bind="item.media" static />
    </span>

    <span v-html="translatedText" :class="$style.text" />
  </li>
</template>

<script setup lang="ts">
import { MediaPresset } from '@tok/generation/pressets/Media';
import { useTranslated } from '@tok/i18n';
import { _GenerationListOptionsConfig } from 'defineConfig';
import { computed, toRefs } from 'vue';

const props = defineProps<{ item: _GenerationListOptionsConfig }>();

const { item } = toRefs(props);

const text = computed(() => item.value.text);

const translatedText = useTranslated(text);
</script>

<style lang="scss" module>
.li {
  display: flex;
  text-align: left;
  align-items: center;
}

.media {
  margin-right: 0.75rem;
  color: var(--tok-primary);
}
</style>
