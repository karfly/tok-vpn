import { PopupButton } from '@twa-dev/types';

export type TgPopupProps<T extends PopupButton> = {
  type?: 'web' | 'telegram';
  modelValue: boolean;
  title: string;
  message?: string;
  buttons: T[];
};

export type TgPopupEmits = {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onSelect', value: string | undefined): void;
};

export type TgPopupSlots<T> = {
  'button-icon'?: (props: { item: T }) => void;
};

const buttons: PopupButton[] = [];

export const TgPopupDefaultProps = {
  title: '',
  message: '',
  type: 'telegram',
  buttons: () => buttons,
} as const;
