<template>
  <component :is="resolved" />
</template>

<script setup lang="ts">
import { PRESSETS_OVERRIDER_TOKEN } from '@tok/generation/tokens';
import { computed, inject, toRefs } from 'vue';

const props = defineProps<{ extends: string }>();

const { extends: _extends } = toRefs(props);
const components = inject(PRESSETS_OVERRIDER_TOKEN, {});

const resolved = computed(() => {
  const value = _extends.value;

  return components[value];
});
</script>
