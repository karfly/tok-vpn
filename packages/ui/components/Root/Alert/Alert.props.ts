import { Component, VNode } from 'vue';

export type AlertProps<T = unknown> = {
  type?: 'success' | 'error' | string;

  content?: string | Component;

  closable?: boolean;

  data?: T;
};

export type AlertContextProps<T = unknown> = {
  context: {
    close: () => void;
    data: T;
  };
};

export type AlertSlots = {
  default?: (props: {}) => ReadonlyArray<VNode>;
};

export type AlertEmits = {
  (e: 'close'): void;
};

export const AlertDefaultProps = {
  type: 'success',
} as const;
