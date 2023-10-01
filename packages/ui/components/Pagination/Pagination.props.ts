export type PaginationProps = {
  modelValue: number;

  length: number;
};

export type PaginationEmits = {
  (e: 'update:modelValue', value: number): void;
};
