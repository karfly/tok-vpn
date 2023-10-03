import { PrimitivePaywallProps } from '@tok/generation/components/PrimitivePaywall';
import { MediaPressetProps } from 'pressets/Media';

export type BaseProductProps = {
  id: string;
  title: string;
  discount?: string;
  price: number;
  currency: string;
  pricePostfix: string;

  active?: boolean;
};

export type BasePaywallPressetProps = Omit<
  PrimitivePaywallProps,
  'selectedProduct' | 'description'
> & {
  description?: string;

  products: Omit<BaseProductProps, 'active'>[];

  features: string[] | { text: string; media?: MediaPressetProps }[];
};

const defaultProducts = [
  {
    id: '1',
    title: 'Title',
    discount: 'Discount',
    price: 99.99,
    currency: 'USD',
    pricePostfix: 'pricePostfix',
  },
  {
    id: '2',
    title: 'Title',
    price: 99.99,
    currency: 'USD',
    pricePostfix: 'pricePostfix',
  },
];

export const BasePaywallPressetDefaultProps = {
  description: '',
  products: () => defaultProducts,
  features: () => [],
} as const;
