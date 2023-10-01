export type CheckboxBlockProps = {
  modelValue: boolean | null;

  placeholder?: string;
};

export type CheckboxBlockEmits = {
  (e: 'update:modelValue', v: boolean): void;
};

export const CheckboxBlockDefaultProps = {
  placeholder: '',
} as const;
