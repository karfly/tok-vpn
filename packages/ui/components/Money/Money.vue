<template>
  <span>{{ computedMoney }}</span>
</template>

<script setup lang="ts">
import { formatNumber } from '@tok/ui/number';
import { getCurrencySymbol } from '@tok/ui/setup/currency/getCurrencySymbol';
import { useMoney } from '@tok/ui/setup/setupMoney';
import { computed, toRefs } from 'vue';

import { MoneyProps } from './Money.props';

const props = defineProps<MoneyProps>();

const { value } = toRefs(props);

const { decimalSeparator, thousandSeparator, align, currency } = useMoney();

const computedMoney = computed(() => {
  const _value = value.value;

  // todo: add precision support
  const formatted = formatNumber(_value, decimalSeparator, thousandSeparator);
  const currencySymbol = getCurrencySymbol(currency);
  const [prefix, postfix] =
    align === 'left' ? [currencySymbol, ''] : ['', currencySymbol];

  return `${prefix}${formatted}${postfix}`;
});
</script>
