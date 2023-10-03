import type { MediaPressetProps } from '@tok/generation/pressets/Media';
import type { SlidePressetProps } from '@tok/generation/pressets/Slide';
import type { PopupButton } from '@twa-dev/types';

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
    // todo merge with TgPopupProps
    type?: 'web' | 'telegram';
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
        src: 'bank-card',
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

export const PrimitivePaywallDefaultProps = {
  links: () => [],
  mainButtonText: 'Continue',
  popup: () => defaultPopup,
} as const;
