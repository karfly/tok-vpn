# @tok/i18n

A minimalistic package for handling localization in your applications

## Setup

```ts
// main.ts
import { TokI18nPlugin } from '@tok/i18n';
import { createApp } from 'vue';
import App from './App.vue';

const locales = {
    default: 'en',
    asyncLocales: {
      ch: import('./locale/ch.json')
    },
    messages: {
        en: {
            'hello': 'Hello!'
        }
    }
;}

createApp(App).use(TokI18nPlugin, locales).mount('#app');
```

## Usage

```vue
<template>
  {{ translatedHello }}
</template>

<script setup lang="ts">
import { useI18n } from '@tok/i18n';
import { computed, ref, watch } from 'vue';

const i18n = useI18n();

// This will track the value in the hello ref and always return the translated value if available.
const hello = ref('hello');
const translatedHello = i18n.useTranslated(hello);

// If there is no token in the current or fallback locale, we will return the fallback value.
const unknown = ref('unknown');
const fallback = i18n.useTranslated(unknown, 'Value from fallback!');

// Usage inside computed
const insideComputed = computed(() => {
  const value = 'someKey';

  return i18n.translate(value);
});

// To change the locale on the fly. Keep in mind that you will need to load messages manually.
i18n.locale.value = 'ch';

// This is an example of how you can load such locales:
watch(
  i18n.locale,
  (locale) => {
    // It will return a Promise.reject if there are no loaders for this locale
    i18n.load(locale).then((messages) => {
      i18n.setMessages(locale, messages);
    });
  },
  { immediate: true }
);

// Get fallback locale. en by default
const fallback = i18n.fallbackLocale;

// Available locales: (en|ch|...)[]
const available = i18n.available;

// Get all messages config:
const messages = i18n.messages;
</script>
```
