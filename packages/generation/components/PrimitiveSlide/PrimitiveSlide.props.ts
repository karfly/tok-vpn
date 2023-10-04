import { _GenerationSlideConfig } from 'defineConfig';

export type PrimitiveSlideProps = Pick<
  _GenerationSlideConfig,
  'media' | 'textAlign' | 'shape' | 'background' | 'button' | 'extends'
> & {
  active?: boolean;

  buttonAfterContent?: boolean;
};

export type PrimitiveSlideEmits = {
  (e: 'onClick'): void;
};

export const PrimitiveSlideDefaultProps = {
  button: 'Next',
  textAlign: 'left',
  shape: 'square',
} as const;
