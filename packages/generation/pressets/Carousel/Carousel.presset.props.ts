import { SlidePressetProps } from '@tok/generation/pressets/Slide';

export type CarouselPressetProps = {
  slides: SlidePressetProps[];
};

export const CarouselPressetDefaultProps = {
  slides: () => [],
} as const;
