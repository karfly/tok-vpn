import { SvgIconProps } from '@tok/ui/components/SvgIcon';

export type MediaPressetProps =
  | {
      type: 'image';
      src: any;
      webp?: any;
      name?: string;
    }
  | {
      type: 'sticker';
      src?: any;
      name: string;
    }
  | ({
      type: 'icon';
      src?: any;
    } & SvgIconProps);
