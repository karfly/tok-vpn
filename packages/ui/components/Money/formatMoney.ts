import { CHAR_NO_BREAK_SPACE } from '@tok/ui/consts';
import { formatNumber } from '@tok/ui/number';
import { CurrencyCode } from '@tok/ui/setup/currency/code.enum';
import { CurrencyVariants } from '@tok/ui/setup/currency/currency';
import { getCurrencySymbol } from '@tok/ui/setup/currency/getCurrencySymbol';

export const defaultFormatMoney = {
  align: 'left' as const,
  precision: 2,
  currency: CurrencyCode.Dollar,
  decimalSeparator: '.',
  thousandSeparator: CHAR_NO_BREAK_SPACE,
};

export function formatMoney(
  _value: number,
  currency: CurrencyVariants = defaultFormatMoney.currency,
  align: 'left' | 'right' = defaultFormatMoney.align,
  decimalSeparator = defaultFormatMoney.decimalSeparator,
  thousandSeparator = defaultFormatMoney.thousandSeparator
) {
  const formatted = formatNumber(_value, decimalSeparator, thousandSeparator);
  const currencySymbol = getCurrencySymbol(currency);
  const [prefix, postfix] =
    align === 'left' ? [currencySymbol, ''] : ['', currencySymbol];

  return `${prefix}${formatted}${postfix}`;

  return '';
}
