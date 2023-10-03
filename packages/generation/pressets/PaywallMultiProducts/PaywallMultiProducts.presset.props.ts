import {
  defaultPopup,
  PaywalPressetButtons,
} from '@tok/generation/pressets/Paywall';
import type { SlidePressetProps } from '@tok/generation/pressets/Slide';
import type { LinkProps } from '@tok/ui/components/Link';
import type { CurrencyVariants } from '@tok/ui/setup/currency/currency';

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
  SlidePressetProps,
  'extends' | 'button'
> & {
  extends?: 'paywallMultiProducts';

  products: ProductProps[];

  links: LinkProps[];

  mainButtonText?: string;

  popup?: {
    title: string;
    message?: string;
    buttons: PaywalPressetButtons;
  };
};

export const PaywallMultiProductsPressetDefaultProps = {
  products: () => [],
  links: () => [],
  mainButtonText: 'Continue',
  popup: () => defaultPopup,
};
