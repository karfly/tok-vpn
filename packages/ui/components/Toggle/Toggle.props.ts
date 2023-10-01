export type ToggleProps = {
  modelValue: boolean;

  id: string;
};

export type ToggleEmits = {
  (e: 'update:modelValue', value: boolean): void;
};
