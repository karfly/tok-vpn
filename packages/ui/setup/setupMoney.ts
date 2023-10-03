// todo: fix
import { defaultFormatMoney } from '@tok/ui/components/Money/formatMoney';
import { inject, InjectionKey, provide } from 'vue';

import { CurrencyVariants } from './currency/currency';

type Setup = {
  align?: 'left' | 'right';
  precision?: number;
  currency?: CurrencyVariants;
  decimalSeparator?: string;
  thousandSeparator?: string;
};

const token = Symbol() as InjectionKey<Required<Setup>>;

export function setupMoney(options: Setup) {
  const {
    align = defaultFormatMoney.align,
    precision = defaultFormatMoney.precision,
    currency = defaultFormatMoney.currency,
    decimalSeparator = defaultFormatMoney.decimalSeparator,
    thousandSeparator = defaultFormatMoney.thousandSeparator,
  } = options;

  provide(token, {
    align,
    precision,
    currency,
    decimalSeparator,
    thousandSeparator,
  });
}

export function useMoney(): Required<Setup> {
  return inject(token, defaultFormatMoney);
}
