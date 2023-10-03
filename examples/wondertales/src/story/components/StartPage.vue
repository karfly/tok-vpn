<template>
  <div :class="$style.page">
    <h4>{{ title }}</h4>

    <h2>{{ name }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useTranslated } from '@tok/i18n';

const title = useTranslated('_story.title');

const name = useTranslated('_story.name');
</script>

<style lang="scss" module>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1.75rem;

  background-color: rgb(var(--tok-background-color-base));
  color: var(--ark-text-color);
  text-align: center;

  min-height: var(--story-height);
  height: 100%;
}
</style>
