import type { PrimitiveSlideProps } from '@tok/generation/components/PrimitiveSlide';
import type {
  _GenerationPrimitivePaywallConfig,
  _GenerationPrimitivePaywallProduct,
} from '@tok/generation/defineConfig';

export type PrimitivePaywallProps = Pick<PrimitiveSlideProps, 'active'> &
  _GenerationPrimitivePaywallConfig & {
    selectedProduct: _GenerationPrimitivePaywallProduct | null;
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
  ],
};

export const PrimitivePaywallDefaultProps = {
  links: () => [],
  mainButtonText: 'Continue',
  popup: () => defaultPopup,
} as const;
