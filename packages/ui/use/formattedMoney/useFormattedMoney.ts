import { useTranslated } from '@tok/i18n';
import { CurrencyVariants } from '@tok/ui/setup/currency/currency';
import {
  CURRENCY_OPTIONS_TOKEN,
  CurrencyOptions,
  defaultCurrencyOptions,
} from '@tok/ui/tokens';
import { resolveRef } from '@tok/ui/types';
import { computed, ComputedRef, inject, MaybeRefOrGetter } from 'vue';

import { formatMoney } from './formatMoney';

export function useFormattedMoney(
  value: MaybeRefOrGetter<number | string>
): ComputedRef<string> {
  const options = inject(CURRENCY_OPTIONS_TOKEN, defaultCurrencyOptions);
  const valueRef = resolveRef(value);
  const toTranslateValue = computed(() => {
    const _value = valueRef.value;

    return typeof _value === 'string' ? _value : `${_value}`;
  });

  const translatedValue = useTranslated(toTranslateValue);
  const align = useTranslated(options.align);
  const currency = useTranslated<CurrencyVariants>(options.currency);
  const decimal = useTranslated(options.decimalSeparator);
  const thousand = useTranslated(options.thousandSeparator);

  return computed(() => {
    const _align = align.value;
    const _currency = currency.value;
    const _decimal = decimal.value;
    const _thousand = thousand.value;
    const _value = translatedValue.value;
    const clean = typeof _value === 'number' ? _value : Number(_value);

    const options: Required<CurrencyOptions> = {
      align: _align,
      currency: _currency,
      decimalSeparator: _decimal,
      thousandSeparator: _thousand,
    };

    return formatMoney(clean, options);
  });
}
