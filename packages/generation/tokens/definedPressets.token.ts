import { DefinedPressetsKeys } from '@tok/generation/defineConfig';
import { SlidePresset } from '@tok/generation/pressets/_slide';
import { CarouselPresset } from '@tok/generation/pressets/Carousel';
import { MediaPresset } from '@tok/generation/pressets/Media';
import { defineAsyncComponent, InjectionKey } from 'vue';

export type DefinePressets = Record<
  DefinedPressetsKeys,
  ReturnType<typeof defineAsyncComponent>
> & { media: ReturnType<typeof defineAsyncComponent> };

export const predefinedPressets: DefinePressets = {
  base: CarouselPresset,
  media: MediaPresset,
  slide: SlidePresset,
  paywall: defineAsyncComponent(() =>
    import('@tok/generation/pressets/paywall').then((m) => m.PaywallPresset)
  ),
  form: defineAsyncComponent(() =>
    import('@tok/generation/pressets/Form').then((m) => m.FormPresset)
  ),
  list: defineAsyncComponent(() =>
    import('@tok/generation/pressets/List').then((m) => m.ListPresset)
  ),
  paywall_single: defineAsyncComponent(() =>
    import('@tok/generation/pressets/paywall_single').then(
      (m) => m.PaywallSinglePresset
    )
  ),
  paywall_row: defineAsyncComponent(() =>
    import('@tok/generation/pressets/paywall_row').then(
      (m) => m.PaywallRowPresset
    )
  ),
};

export const DEFINED_PRESSETS_TOKEN = Symbol() as InjectionKey<DefinePressets>;
