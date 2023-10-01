import { VNode } from 'vue';

export type RootSlots = {
  default: (props: {}) => ReadonlyArray<VNode>;
};
