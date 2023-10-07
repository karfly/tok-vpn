import type { _GenerationPaywallPopup } from '@tok/generation/defineConfig';

export type PaywallPopupProps = _GenerationPaywallPopup & {
  opened: boolean;
};

export type PaywallPopupEmits = {
  (e: 'update:opened', value: boolean): void;
  (e: 'onSelect', value: string | undefined): void;
};

const defaultButtons = [
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
];

export const PaywallPopupDefaultProps = {
  type: 'telegram',
  title: 'Choose the payment method',
  message: '',
  buttons: () => defaultButtons,
} as const;
