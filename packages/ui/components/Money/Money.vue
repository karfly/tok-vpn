<template>
  <span>{{ computedMoney }}</span>
</template>

<script setup lang="ts">
import { useMoney } from '@tok/ui/setup/setupMoney';
import { computed, toRefs } from 'vue';

import { formatMoney } from './formatMoney';
import { MoneyProps } from './Money.props';

const props = defineProps<MoneyProps>();

const { value } = toRefs(props);

const { decimalSeparator, thousandSeparator, align, currency } = useMoney();

const computedMoney = computed(() => {
  const _value = value.value;

  return formatMoney(
    _value,
    currency,
    align,
    decimalSeparator,
    thousandSeparator
  );
});
</script>
