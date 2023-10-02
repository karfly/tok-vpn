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

  // This prop allows you to intersect content with an image, where the content will be placed over the image.
  allowIntersection?: boolean;
};

export type MediaPressetProps =
  | IconPressetProps
  | StickerPressetProps
  | ImagePressetProps;
