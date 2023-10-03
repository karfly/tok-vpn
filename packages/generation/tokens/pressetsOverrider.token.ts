import { BasePaywallPresset } from '@tok/generation/pressets/BasePaywall';
import { BaseSlidePresset } from '@tok/generation/pressets/BaseSlide';
import { CarouselPresset } from '@tok/generation/pressets/Carousel';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { SlidePresset } from '@tok/generation/pressets/Slide';
import { defineAsyncComponent, InjectionKey } from 'vue';

type DefinedPressets =
  | 'form'
  | 'base'
  | 'base_slide'
  | 'base_paywall'
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
  base_slide: BaseSlidePresset,
  base_paywall: BasePaywallPresset,
  form: defineAsyncComponent(() =>
    import('@tok/generation/pressets/Form').then((m) => m.FormPresset)
  ),
  list: defineAsyncComponent(() =>
    import('@tok/generation/pressets/List').then((m) => m.ListPresset)
  ),
  paywall: defineAsyncComponent(() =>
    import('@tok/generation/pressets/Paywall').then((m) => m.PaywallPresset)
  ),
  paywallMultiProducts: defineAsyncComponent(() =>
    import('@tok/generation/pressets/PaywallMultiProducts').then(
      (m) => m.PaywallMultiProductsPresset
    )
  ),
};

export const PRESSETS_OVERRIDER_TOKEN =
  Symbol() as InjectionKey<PressetOverrider>;
