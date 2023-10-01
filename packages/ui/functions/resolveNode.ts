import { MaybeComputedRef, resolveRef } from '@tok/vue/types';
import { ComponentPublicInstance, computed, ComputedRef } from 'vue';

export type RefNode<T extends Node = Node> = MaybeComputedRef<
  ComponentPublicInstance | T | null
>;

function isPublicInstance(
  element: unknown
): element is ComponentPublicInstance {
  return (
    !!element &&
    typeof element === 'object' &&
    ('$data' in element || '$el' in element)
  );
}

export function resolveNode<T extends Node = Node>(
  el: RefNode<T>
): ComputedRef<T> {
  const elRef = resolveRef(el);

  return computed(() => {
    const value = elRef.value;

    return isPublicInstance(value) ? value.$el : value;
  });
}
