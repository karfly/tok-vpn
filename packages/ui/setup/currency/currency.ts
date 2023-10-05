import { CurrencyCode } from './code.enum';
import { Currency } from './currency.enum';

type CurrencyAsString =
  | keyof Record<Currency, string>
  | keyof Record<CurrencyCode, string>;

export type CurrencyVariants =
  | CurrencyAsString
  | Currency
  | CurrencyCode
  | string;
