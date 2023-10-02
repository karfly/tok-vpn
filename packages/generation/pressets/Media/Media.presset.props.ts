import { SvgIconProps } from '@tok/ui/components/SvgIcon';

export type _MediaLoader<T> = Promise<{ default: T }>;

// todo: Find a way to translate images
// src: '_i18n.imageSrc' -> en.json: import('../assets/*.png');
export type IconPressetProps = {
  type: 'icon';
  src?: string | _MediaLoader<any>;
} & Omit<SvgIconProps, 'name'>;

export type StickerPressetProps = {
  type: 'sticker';
  src?: _MediaLoader<typeof import('*.tgs')>;
};

export type ImagePressetProps = {
  type: 'image';
  src: _MediaLoader<any>;
  webp?: _MediaLoader<any>;
};

export type MediaPressetProps =
  | IconPressetProps
  | StickerPressetProps
  | ImagePressetProps;
