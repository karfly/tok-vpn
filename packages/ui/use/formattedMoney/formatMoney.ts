import { CHAR_NO_BREAK_SPACE } from '@tok/ui/consts';
import { formatNumber } from '@tok/ui/number';
import { CurrencyCode } from '@tok/ui/setup/currency/code.enum';
import { getCurrencySymbol } from '@tok/ui/setup/currency/getCurrencySymbol';
import type { CurrencyOptions } from '@tok/ui/tokens';

export const defaultFormatMoney = {
  align: 'left' as const,
  precision: 2,
  currency: CurrencyCode.Dollar,
  decimalSeparator: '.',
  thousandSeparator: CHAR_NO_BREAK_SPACE,
};

export function formatMoney(
  _value: number,
  options: Required<CurrencyOptions>
) {
  const formatted = formatNumber(
    _value,
    options.decimalSeparator,
    options.thousandSeparator
  );
  const currencySymbol = getCurrencySymbol(options.currency);
  const [prefix, postfix] =
    options.align === 'left' ? [currencySymbol, ''] : ['', currencySymbol];

  return `${prefix}${formatted}${postfix}`;
}
