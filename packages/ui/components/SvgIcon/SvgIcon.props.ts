export type SvgIconProps = {
  name: string | (() => any) | {} | null;

  size?: number | [number, number];

  rotate?: boolean;
};
