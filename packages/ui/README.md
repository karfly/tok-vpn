# UI Package

###### Components

1. [Alert](./components/Alert/README.md)
2. [Carousel](./components/Carousel/README.md)
3. [CheckboxBlock](./components/CheckboxBlock/README.md)
4. [FlatButton](./components/FlatButton/README.md)
5. [InputText](./components/InputText/README.md)
6. [Link](./components/Link/README.md)
7. [Money](./components/Money/README.md)
8. [Pagination](./components/Pagination/README.md)
9. [Popup](./components/Popup/README.md)
10. [Portal](./components/Portal/README.md)
11. [PrimitiveRadio](./components/PrimitiveRadio/README.md)
12. [Root](./components/Root/README.md)
13. [SvgIcon](./components/SvgIcon/README.md)
14. [Toggle](./components/Toggle/README.md)

## Manual Installation Guide

Use this guide to manually install the UI package in your project.

1. Run the following command to add a link from your app to this package:

   ```bash
   npm run @tok/ui --workspace=<your workspace name>
   ```

2. Import our global styles in your `main.ts` file:

   ```ts
   // main.ts
   import '@tok/ui/styles/global.scss';

   import { createApp } from 'vue';
   import App from './App.vue';

   createApp(App).mount('#app');
   ```

3. If you want to use the built-in Popups and Alerts, add the `Root` component to your `App.vue` file as shown below:

   ```html
   <!-- App.vue -->
   <template>
     <Root>
       <!-- other code like -->
       <!-- <router-view /> -->
     </Root>
   </template>

   <script setup lang="ts">
     import { Root } from '@tok/ui/components/Root';
   </script>
   ```

4. If you want to use Alerts, you should add AlertsPlugin in your main.ts file:

   ```ts
   // main.ts
   import '@tok/ui/styles/global.scss';

   import { createApp } from 'vue';
   import App from './App.vue';
   import { AlertsPlugin } from '@tok/ui/plugins/alerts';

   createApp(App).use(AlertsPlugin).mount('#app');
   ```

   And use them as:

   ```vue
   <script setup lang="ts">
   import { useAlerts } from '@tok/ui/use/alerts';

   const alertsService = useAlerts();

   alertsService.show('Hello there!');
   </script>
   ```

5. If you want to use Currency, you can specify config for currency once:

   ```ts
   // main.ts
   import '@tok/ui/styles/global.scss';

   import { createApp } from 'vue';
   import App from './App.vue';
   import { CurrencyPlugin } from '@tok/ui/plugins/currency';

   const currencyOptions = {
    // currency symbol alignment
    // default: 'left'
    align?: 'left' | 'right';

    // currency symbol
    // default: 'USD'
    currency?: CurrencyVariants;

    // separator for decimal 1.00 or 1,00 as you wish
    // default '.'
    decimalSeparator?: string;

    // separator for thousand 1_000_000 or 1x000x000
    // default '&nbsp;'
    thousandSeparator?: string;
   };

   createApp(App).use(CurrencyPlugin, currencyOptions).mount('#app');
   ```

6. Or you can specify currency config in place:

   ```vue
   <template>
     <money :value="10" />
   </template>

   <script setup lang="ts">
   import { Money } from '@tok/ui/components/Money';
   import { CURRENCY_OPTIONS_TOKEN } from '@tok/ui/tokens';
   import { provide } from 'vue';

   // same options as below
   provide(CURRENCY_OPTIONS_TOKEN, {});
   </script>
   ```

7. If you want to use our mixins, import them in your component:

   ```vue
   <template>
     <!-- ... -->
   </template>

   <script>
   <!-- ... -->
   </script>

   <style lang="scss">
   @import '@tok/ui/styles/local.scss';

   div {
     @import hide-scroll;
     // ...
   }
   </style>
   ```

8. For localization use TokI18nPlugin from [i18n packages](../i18n/README.md)
