import { SvgIconProps } from '@tok/ui/components/SvgIcon';

export type MediaPressetProps =
  | {
      type: 'image';
      src: any;
      webp?: any;
      name?: string;
      allowIntersection?: boolean;
    }
  | {
      type: 'sticker';
      src?: any;
      name: string;
      allowIntersection?: boolean;
    }
  | ({
      type: 'icon';
      src?: any;
      allowIntersection?: boolean;
    } & SvgIconProps);
