import type { _GenerationCarouselConfig } from '@tok/generation/defineConfig';

export type CarouselPressetProps = _GenerationCarouselConfig<unknown>;

export const CarouselPressetDefaultProps = {
  slides: () => [],
} as const;
