import type { PrimitiveSlideProps } from '@tok/generation/components/PrimitiveSlide';

export type BaseSlidePressetProps = PrimitiveSlideProps & {
  title: string;

  description: string;

  extends?: 'base_slide';
};

export const BaseSlidePressetDefaultProps = {
  title: 'Title',
  description: 'Description',
  button: 'Button',
  textAlign: 'left',
} as const;
