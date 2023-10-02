<template>
  {{ sdk.initDataUnsafe }}
  <root />
</template>

<script setup lang="ts">
import './styles.scss';

import { Root } from '@tok/generation';
import { useTelegramSdk } from '@tok/telegram-ui/use/sdk';

const sdk = useTelegramSdk();
</script>
