import { CHAR_NO_BREAK_SPACE } from '@tok/ui/consts';
import { CurrencyVariants } from '@tok/ui/setup/currency/currency';
import { InjectionKey } from 'vue';

export type CurrencyOptions = {
  align?: 'left' | 'right' | string;
  currency?: CurrencyVariants;
  decimalSeparator?: string;
  thousandSeparator?: string;
};

export const defaultCurrencyOptions = {
  align: 'left',
  currency: 'USD',
  decimalSeparator: '.',
  thousandSeparator: CHAR_NO_BREAK_SPACE,
} as const;

export const CURRENCY_OPTIONS_TOKEN = Symbol() as InjectionKey<
  Required<CurrencyOptions>
>;
