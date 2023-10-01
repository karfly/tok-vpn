import { AlertsPluginOptions } from '@tok/vue/types';
import { InjectionKey } from 'vue';

export const ALERTS_OPTIONS_TOKEN =
  Symbol() as InjectionKey<AlertsPluginOptions>;
