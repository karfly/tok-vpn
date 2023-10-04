import { _GenerationPaywallRowConfig } from 'defineConfig';

export type PaywallRowPressetProps = Omit<
  _GenerationPaywallRowConfig,
  'extends'
>;

export const PaywallRowPressetDefaultProps = {
  products: () => [],
} as const;
