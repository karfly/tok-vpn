import { MaybeComputedRef, resolveRef } from '@tok/ui/types';
import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

export function useTranslated(
  value: MaybeComputedRef<string>
): ComputedRef<string> {
  const { t } = useI18n({ useScope: 'global' });

  const valueRef = resolveRef(value);

  return computed(() => t(valueRef.value || ''));
}
