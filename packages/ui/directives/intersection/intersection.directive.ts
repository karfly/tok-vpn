import { DirectiveBinding, ObjectDirective } from 'vue';

interface ObserverHTMLElement extends HTMLElement {
  __observer_intersection: IntersectionObserver;
}

type Options = IntersectionObserverInit & {
  root?: () =>
    | IntersectionObserverInit['root']
    | IntersectionObserverInit['root'];
};

type BindingValue = {
  onIntersect: (el: IntersectionObserverEntry) => void;
  isObserve?: boolean;
  disconnectAfterIntersect?: boolean;
  options?: Options;
};

const OPTIONS: IntersectionObserverInit = {
  threshold: 1.0,
} as const;

export const IntersectionDirective: ObjectDirective<
  ObserverHTMLElement,
  BindingValue
> = {
  mounted(el: ObserverHTMLElement, { value }: DirectiveBinding<BindingValue>) {
    const {
      onIntersect,
      isObserve = true,
      disconnectAfterIntersect = true,
      options = {} as Options,
    } = value as BindingValue;

    if (!isObserve) {
      return;
    }

    const cb: IntersectionObserverCallback = ([entry]) => {
      const { isIntersecting } = entry;

      if (isIntersecting) {
        onIntersect(entry);

        if (disconnectAfterIntersect) {
          el.__observer_intersection.disconnect();
        }
      }
    };

    el.__observer_intersection = new IntersectionObserver(cb, {
      ...OPTIONS,
      ...options,
      root:
        typeof options.root === 'function'
          ? (options.root as any)()
          : options.root,
    });

    el.__observer_intersection.observe(el);
  },
  beforeUnmount(el: ObserverHTMLElement) {
    el.__observer_intersection && el.__observer_intersection.disconnect();
  },
};
