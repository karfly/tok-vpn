import { CarouselPresset } from '@tok/generation/pressets/Carousel';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { SlidePresset } from '@tok/generation/pressets/Slide';
import { defineAsyncComponent, InjectionKey } from 'vue';

type DefinedPressets =
  | 'carousel'
  | 'form'
  | 'base'
  | 'slide'
  | 'list'
  | 'paywall';

export type PressetOverrider = Record<
  DefinedPressets | string,
  ReturnType<typeof defineAsyncComponent> | any
>;

export const defaultPressetsOptions: PressetOverrider = {
  base: CarouselPresset,
  media: MediaPresset,
  slide: SlidePresset,
  form: defineAsyncComponent(() =>
    import('@tok/generation/pressets/Form').then((m) => m.FormPresset)
  ),
  list: defineAsyncComponent(() =>
    import('@tok/generation/pressets/List').then((m) => m.ListPresset)
  ),
  paywall: defineAsyncComponent(() =>
    import('@tok/generation/pressets/Paywall').then((m) => m.PaywallPresset)
  ),
};

export const PRESSETS_OVERRIDER_TOKEN =
  Symbol() as InjectionKey<PressetOverrider>;
