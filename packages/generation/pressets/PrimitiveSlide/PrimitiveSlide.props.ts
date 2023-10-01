import type { MediaPressetProps } from '@tok/generation/pressets/Media';
import type { FlatButtonProps } from '@tok/ui/components/FlatButton';

export type PrimitiveSlideProps = {
  button: string | (FlatButtonProps & { content: string }) | null;

  active?: boolean;

  media?: MediaPressetProps;

  textAlign?: 'left' | 'right' | 'center';

  fullHeight?: boolean;
};

export type PrimitiveSlideEmits = {
  (e: 'onClick'): void;
};

export const PrimitiveSlideDefaultProps = {
  button: 'Button',
  textAlign: 'left',
} as const;
