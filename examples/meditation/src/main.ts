import { bootstrapJson } from '@tok/generation';

import App from './App.vue';
import { default as config } from './config';

bootstrapJson(App, config);
