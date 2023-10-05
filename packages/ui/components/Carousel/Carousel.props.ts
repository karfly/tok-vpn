import { VNode } from 'vue';

export type CarouselProps<T> = {
  modelValue: number;

  itemsCount: number;

  items: ReadonlyArray<T>;

  /* 
  This parameter only works on desktop devices and is ignored on mobile devices.
  The determination of whether the device is mobile is made through the `isMobile` function
  */
  draggable?: boolean;

  threshold?: number;

  paddingPx?: number;
};

export type CarouselEmits = {
  (e: 'update:modelValue', value: number): void;
};

export type CarouselSlots<T> = {
  default: (props: { item: T; index: number }) => ReadonlyArray<VNode>;
};

export type CarouselExpose = {
  next: () => void;
  back: () => void;
};

export const CarouselDefaultProps = {
  draggable: false,
  threshold: 0,
  paddingPx: 8,
} as const;
