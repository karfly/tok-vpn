<template>
  <span>{{ formatted }}</span>
</template>

<script setup lang="ts">
import { useFormattedMoney } from '@tok/ui/use/formattedMoney';
import { computed, toRefs } from 'vue';

import { MoneyProps } from './Money.props';

const props = defineProps<MoneyProps>();

const { value } = toRefs(props);

const _money = useFormattedMoney(value);

const formatted = computed(() => _money.value.formatted);
</script>
