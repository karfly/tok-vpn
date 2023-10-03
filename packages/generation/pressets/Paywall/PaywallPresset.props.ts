import { PrimitivePaywallProps } from '@tok/generation/components/PrimitivePaywall';
import type { MediaPressetProps } from '@tok/generation/pressets/Media';

export type PaywallPressetProps = Omit<
  PrimitivePaywallProps,
  'selectedProduct'
> & {
  product: {
    media?: MediaPressetProps;
    title: string;
    price: number;
    currency?: string;
    description: string;
  };
};

const defaultProduct = {
  title: 'Product Title',
  price: 99.99,
  current: 'USD',
  description: 'Product description',
};

export const PaywallPressetDefaultProps = {
  product: () => defaultProduct,
} as const;
