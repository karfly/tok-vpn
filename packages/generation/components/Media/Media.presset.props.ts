import { StickerProps } from '@tok/telegram-ui/components/Sticker';
import { SvgIconProps } from '@tok/ui/components/SvgIcon';
import { CSSProperties } from 'vue';

export type _MediaLoader<T> = Promise<{ default: T }>;

export type IconPressetProps = {
  type: 'icon';
  src: string | _MediaLoader<any>;

  style?: string | CSSProperties;
} & Omit<SvgIconProps, 'name'>;

export type StickerPressetProps = {
  type: 'sticker';
  src: Promise<typeof import('*.tgs')> | null;

  size?: number | [number, number];

  style?: string | CSSProperties;
} & Pick<StickerProps, 'speed'>;

// todo: Find a way to translate images
// src: '_i18n.imageSrc' -> /locales/en.ts: import('../assets/*.png');
export type ImagePressetProps = {
  type: 'image';
  src: Promise<
    | typeof import('*.png')
    | typeof import('*.jpg')
    | typeof import('*.webp')
    | any
  >;
  webp?: Promise<typeof import('*.webp')>;

  style?: string | CSSProperties;

  static?: boolean;
};

export type EmodjiPressetProps = {
  type: 'emodji';

  src: string;

  size?: number | [number, number];

  style?: string | CSSProperties;
};

export type VideoPressetProps = {
  type: 'video';

  src: Promise<typeof import('*.mp4') | any>;

  poster?: Promise<
    | typeof import('*.png')
    | typeof import('*.jpg')
    | typeof import('*.webp')
    | any
  >;

  style?: string | CSSProperties;
};

export type MediaPressetProps =
  | IconPressetProps
  | StickerPressetProps
  | ImagePressetProps
  | VideoPressetProps
  | EmodjiPressetProps;
