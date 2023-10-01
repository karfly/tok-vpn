import { MediaPressetProps } from '@tok/generation/pressets/Media';
import {
  SlidePressetDefaultProps,
  SlidePressetProps,
} from '@tok/generation/pressets/Slide';

export type ListPressetProps = Omit<
  SlidePressetProps,
  'extends' | 'description'
> & {
  extends?: 'list';

  description?: string;

  list: { media: MediaPressetProps; text: string }[];
};

export const ListPressetDefaultProps = {
  ...SlidePressetDefaultProps,
  description: '',
  list: () => [],
} as const;
