import { TOK_I18N_TOKEN } from '@tok/i18n/plugins';
import { computed, ComputedRef, inject, MaybeRefOrGetter, ref } from 'vue';

const resolve = <T>(r: T) => {
  return typeof r === 'function' ? computed<T>(r as any) : ref(r);
};

// todo expose all logic in useTranslate
export const tokTranslate = <T = string>(
  messages: Record<string, unknown>,
  key: string
): T | undefined => {
  const [_key, ..._rest] = key.split('.');

  if (_key in messages && _rest.length === 0) {
    return messages[_key] as T;
  }

  if (_key in messages) {
    return tokTranslate((messages as any)[_key], _rest.join('.'));
  }

  return undefined;
};

export function useTranslated<T = string>(
  key: MaybeRefOrGetter<T>,
  fallback?: T
): ComputedRef<T | string> {
  const instance = inject(TOK_I18N_TOKEN, null);
  const keyRef = resolve(key);

  const localed = computed(() => {
    const _locale = instance?.locale?.value;

    if (!_locale) {
      return {};
    }

    const messages = instance?.messages.value?.[_locale];

    return messages || {};
  });

  return computed(() => {
    const value = keyRef.value as string;

    if (!value) {
      return fallback ?? value;
    }

    const _localed = localed.value as Record<string, unknown>;

    const firstTry = tokTranslate(_localed, value);

    if (firstTry) {
      return firstTry as T;
    }

    const shouldTryOneMore = instance && instance.fallbackLocale !== value;

    if (shouldTryOneMore) {
      const fallbackLocaled =
        instance!.messages.value?.[instance!.fallbackLocale] || {};

      const secondTry = tokTranslate(fallbackLocaled as {}, value) as T;

      return secondTry ?? fallback ?? value;
    }

    return fallback ?? value;
  });
}
