import type { MediaPressetProps } from '@tok/generation/pressets/Media';
import type { SlidePressetProps } from '@tok/generation/pressets/Slide';
import type { TelegramPopupButton } from '@tok/telegram';

export type PaywalPressetButtons = (TelegramPopupButton & {
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
        name: 'card',
        size: 32,
      },
      type: 'default' as const,
      text: 'Bank card',
    },
    {
      id: 'wallet_pay',
      media: {
        type: 'icon' as const,
        name: 'wallet-pay',
        size: 32,
      },
      type: 'default' as const,
      text: 'Wallet pay',
    },
    {
      id: 'paypal',
      media: {
        type: 'icon' as const,
        name: 'paypal',
        size: 32,
      },
      type: 'default' as const,
      text: 'Paypal',
    },
  ] as PaywalPressetButtons,
};

export const PaywallPressetDefaultProps = {
  button: null,
  links: () => [],
  mainButtonText: 'Continue',
  popup: () => defaultPopup,
} as const;
