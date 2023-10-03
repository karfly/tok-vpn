import type { MediaPressetProps } from '@tok/generation/pressets/Media';
import { PrimitivePaywallProps } from 'components/PrimitivePaywall';

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
