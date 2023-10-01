import { inject, InjectionKey, Ref } from 'vue';

type Accessor = {
  next: () => void;
  back: () => void;
  set: (index: number) => void;
  index: Ref<number>;
  length: Ref<number>;
};

export const CAROUSEL_ACCESSOR_TOKEN = Symbol() as InjectionKey<Accessor>;

export function useCarousel(): Accessor;
export function useCarousel(allowNull: true): Accessor | null;
export function useCarousel(allowNull: false): Accessor;
export function useCarousel(allowNull: boolean): Accessor | null;
export function useCarousel(allowNull = false): Accessor | null {
  const accessor = inject(CAROUSEL_ACCESSOR_TOKEN, null);

  if (!allowNull && accessor === null) {
    throw new Error('Did you forget to add accessor for carousel?');
  }

  return accessor;
}
