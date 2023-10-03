import type { CurrencyVariants } from '@tok/ui/setup/currency/currency';
import type { PrimitivePaywallProps } from 'components/PrimitivePaywall';

export type ProductProps = {
  id: string;

  currency: CurrencyVariants;
  price: number;
  title: string;
  description: string;
  bestText?: string;

  active?: boolean;
};

export type PaywallMultiProductsPressetProps = Omit<
  PrimitivePaywallProps,
  'selectedProduct'
> & {
  extends?: 'paywallMultiProducts';

  products: Omit<ProductProps, 'active'>[];
};

export const PaywallMultiProductsPressetDefaultProps = {
  products: () => [],
} as const;
