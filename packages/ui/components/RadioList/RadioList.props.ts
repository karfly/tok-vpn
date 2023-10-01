import { VNode } from 'vue';

export type RadioListProps<T> = {
  modelValue: T | null;

  items: T[];

  identityMatcher?: (value: T | null, item: T) => boolean;

  inline?: boolean;

  gap?: string;
};

export type RadioListEmits<T> = {
  (e: 'update:modelValue', value: T): void;
};

export type RadioListSlots<T> = {
  default: (props: {
    item: T;
    active: boolean;
    index: number;
  }) => ReadonlyArray<VNode>;
};

export const RadioListDefaultProps = {
  identityMatcher: (value: any, item: any) => value === item,
  gap: 'var(--tok-padding-s)',
};
