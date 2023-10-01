import { CHAR_NO_BREAK_SPACE } from '@tok/ui/consts';
import { inject, InjectionKey, provide } from 'vue';

import { CurrencyCode } from './currency/code.enum';
import { CurrencyVariants } from './currency/currency';

type Setup = {
  align?: 'left' | 'right';
  precision?: number;
  currency?: CurrencyVariants;
  decimalSeparator?: string;
  thousandSeparator?: string;
};

const defaultSetup: Required<Setup> = {
  align: 'left',
  precision: 2,
  currency: CurrencyCode.Dollar,
  decimalSeparator: '.',
  thousandSeparator: CHAR_NO_BREAK_SPACE,
};

const token = Symbol() as InjectionKey<Required<Setup>>;

export function setupMoney(options: Setup) {
  const {
    align = defaultSetup.align,
    precision = defaultSetup.precision,
    currency = defaultSetup.currency,
    decimalSeparator = defaultSetup.decimalSeparator,
    thousandSeparator = defaultSetup.thousandSeparator,
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
  return inject(token, defaultSetup);
}
