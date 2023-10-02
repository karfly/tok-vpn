export type MainButtonProps = {
  text: string;

  disabled?: boolean;

  progress?: boolean;

  color?: string;

  textColor?: string;

  keepAlive?: boolean;
};

export type MainButtonEmits = {
  (e: 'onClick'): void;
};
