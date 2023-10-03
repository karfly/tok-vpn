import type { PrimitiveSlideProps } from '@tok/generation/components/PrimitiveSlide';

export type SlidePressetProps = PrimitiveSlideProps & {
  title: string;

  description: string;

  extends?: 'slide';
};

export const SlidePressetDefaultProps = {
  title: 'Title',
  description: 'Description',
  button: 'Button',
  textAlign: 'left',
} as const;
