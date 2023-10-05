<template>
  <span>{{ formatted }}</span>
</template>

<script setup lang="ts">
import { useFormattedMoney } from '@tok/ui/use/formattedMoney';
import { toRefs } from 'vue';

import { MoneyProps } from './Money.props';

const props = defineProps<MoneyProps>();

const { value } = toRefs(props);

const formatted = useFormattedMoney(value);
</script>
