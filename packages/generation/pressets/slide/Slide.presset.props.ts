import type { PrimitiveSlideProps } from '@tok/generation/components/PrimitiveSlide';
import type { _GenerationSlideConfig } from '@tok/generation/defineConfig';

export type SlidePressetProps = PrimitiveSlideProps &
  Pick<_GenerationSlideConfig, 'title' | 'description' | 'pagination'>;

export const SlidePressetDefaultProps = {
  title: 'Title',
  description: '',
} as const;
