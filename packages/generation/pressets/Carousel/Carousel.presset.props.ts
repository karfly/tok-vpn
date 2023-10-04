import { _GenerationCarouselConfig } from '@tok/generation/defineConfig';

export type CarouselPressetProps = _GenerationCarouselConfig;

export const CarouselPressetDefaultProps = {
  slides: () => [],
} as const;
