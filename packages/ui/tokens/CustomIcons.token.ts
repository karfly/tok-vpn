import { InjectionKey } from 'vue';

type TODO = any;

export const CUSTOM_ICONS_TOKEN = Symbol() as InjectionKey<
  Record<string, TODO>
>;
