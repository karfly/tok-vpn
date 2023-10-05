import type { _GenerationListConfig } from '@tok/generation/defineConfig';

export type ListPressetProps = Omit<_GenerationListConfig, 'extends'>;

export const ListPressetDefaultProps = {
  list: () => [],
} as const;
