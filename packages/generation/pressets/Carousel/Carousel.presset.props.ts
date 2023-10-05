import { _GenerationCarouselConfig } from '@tok/generation/defineConfig';

export type CarouselPressetProps = _GenerationCarouselConfig<any>;

export const CarouselPressetDefaultProps = {
  slides: () => [],
} as const;
