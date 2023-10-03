import type { MediaPressetProps } from '@tok/generation/pressets/Media';
import type { SlidePressetProps } from '@tok/generation/pressets/Slide';
import { PopupButton } from '@twa-dev/types';

export type PaywalPressetButtons = (PopupButton & {
  media?: MediaPressetProps;
})[];

export type PrimitivePaywallProps = Omit<
  SlidePressetProps,
  'button' | 'extends'
> & {
  // todo
  selectedProduct: any;

  links: { text: string; href: string }[];

  mainButtonText?: string;

  popup?: {
    title: string;
    message?: string;
    buttons: PaywalPressetButtons;
  };
};

export const defaultPopup = {
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
        type: 'image' as const,
        src: import('./assets/walletPay.png'),
        webp: import('./assets/walletPay.webp'),
        style: 'width: 32px; height: 32px',
      },
      type: 'default' as const,
      text: 'Wallet pay',
    },
  ] as PaywalPressetButtons,
};

export const PrimitivePaywallDefaultProps = {
  links: () => [],
  mainButtonText: 'Continue',
  popup: () => defaultPopup,
} as const;
