export type CheckboxBlockProps = {
  modelValue: boolean | null;

  placeholder?: string;

  size?: 's' | 'm' | 'l';

  shape?: 'rounded';

  disabled?: boolean;

  invalid?: boolean;
};

export type CheckboxBlockEmits = {
  (e: 'update:modelValue', v: boolean): void;
};

export const CheckboxBlockDefaultProps = {
  placeholder: '',
  size: 'm',
} as const;
