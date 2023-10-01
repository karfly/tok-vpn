<template>
  <draw-presset :extends="config.extends || 'base'" v-bind="config" />
</template>

<script setup lang="ts">
import { DrawPresset } from '@tok/generation/pressets/DrawPresset';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const config = computed(() => {
  const value = router.currentRoute.value;

  return value.meta.config as any;
});
</script>
