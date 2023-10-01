import { RouteLocationRaw } from 'vue-router';

export type FlatButtonProps = {
  size?: 'xs' | 's' | 'm' | 'l' | string;
  icon?: string;
  rotate?: boolean;
  iconRight?: string;
  rightRotate?: boolean;
  shape?: 'square' | 'rounded' | null;
  appearance?: 'primary' | 'secondary' | 'accent' | 'flat' | 'outline' | string;
  loading?: boolean;
  disabled?: boolean;
  iconButton?: boolean;
  href?: string;
  to?: RouteLocationRaw;
};

export const FlatButtonDefaultProps = {
  size: 'm',
  appearance: 'primary',
  shape: null,
} as const;
