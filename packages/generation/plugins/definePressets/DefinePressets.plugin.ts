import {
  DEFINED_PRESSETS_TOKEN,
  DefinePressets,
  predefinedPressets,
} from '@tok/generation/tokens';
import { Plugin } from 'vue';

export const DefinePressetsPlugin: Plugin<DefinePressets> = {
  install(app, options) {
    app.provide(DEFINED_PRESSETS_TOKEN, {
      ...predefinedPressets,
      ...options,
    });
  },
};
