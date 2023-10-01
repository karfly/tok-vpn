<template>
  <slot />

  <popups-host ref="popupsHostRef" :class="$style.host" />

  <alerts-host />
</template>

<script setup lang="ts">
import { POPUPS_HOST_TOKEN } from '@tok/ui/tokens';
import { provide, readonly, ref } from 'vue';

import AlertsHost from './AlertsHost.vue';
import PopupsHost from './PopupsHost.vue';
import { RootSlots } from './Root.props';

defineSlots<RootSlots>();

const popupsHostRef = ref<InstanceType<typeof PopupsHost> | null>(null);

provide(POPUPS_HOST_TOKEN, readonly(popupsHostRef));
</script>

<style lang="scss" module>
.host {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
}
</style>
