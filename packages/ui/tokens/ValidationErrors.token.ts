import { InjectionKey } from 'vue';

export const VALIDATION_ERRORS_TOKEN = Symbol() as InjectionKey<
  Record<string, string>
>;
