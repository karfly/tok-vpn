import { defineAsyncComponent, InjectionKey } from 'vue';

type Loader<T> = Promise<T>;

export type AssetsLoader = {
  locale?: Record<string, Loader<{}>> | { default: string };
  stickers?: Record<string, Loader<typeof import('*.tgs')>>;
  icons?: Record<string, ReturnType<typeof defineAsyncComponent>>;
};

export const ASSETS_LOADER_TOKEN = Symbol() as InjectionKey<AssetsLoader>;
