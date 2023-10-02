import type { MediaPressetProps } from '@tok/generation/pressets/Media';
import type { SlidePressetProps } from '@tok/generation/pressets/Slide';
import { PopupButton } from '@twa-dev/types';

export type PaywalPressetButtons = (PopupButton & {
  media?: MediaPressetProps;
})[];

export type PaywallPressetProps = Omit<SlidePressetProps, 'button'> & {
  button?: null;

  links: { text: string; href: string }[];

  mainButtonText?: string;

  product: {
    media?: MediaPressetProps;
    title: string;
    price: number;
    currency?: string;
    description: string;
  };

  popup?: {
    title: string;
    message?: string;
    buttons: PaywalPressetButtons;
  };
};

const defaultPopup = {
  title: 'Choose the payment method',
  buttons: [
    {
      id: 'telegram_payments',
      media: {
        type: 'icon' as const,
        src: 'card',
        size: 32,
      },
      type: 'default' as const,
      text: 'Bank card',
    },
    {
      id: 'wallet_pay',
      media: {
        type: 'icon' as const,
        src: 'wallet-pay',
        size: 32,
      },
      type: 'default' as const,
      text: 'Wallet pay',
    },
  ] as PaywalPressetButtons,
};

export const PaywallPressetDefaultProps = {
  button: null,
  links: () => [],
  mainButtonText: 'Continue',
  popup: () => defaultPopup,
} as const;
