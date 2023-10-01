import { isMobile } from '@tok/ui/dom/platform';
import { useThrottleFn } from '@tok/ui/use/debounce';
import { DirectiveBinding, ObjectDirective } from 'vue';

type Binding = {
  onEvent: (value: 1 | -1) => void;
};

const wheelListeners = new Map<HTMLElement, (event: WheelEvent) => void>();

const beforeMount = (
  element: HTMLElement,
  { value }: DirectiveBinding<Binding>
) => {
  const callback = useThrottleFn((num: 1 | -1) => {
    value.onEvent(num);
  }, 500);

  const wheel = ({ deltaX }: WheelEvent) => {
    if (Math.abs(deltaX) <= 20) {
      return;
    }

    callback(Math.sign(deltaX) as -1 | 1);

    element.scrollLeft = 10;
  };

  if (!isMobile()) {
    element.addEventListener('wheel', wheel, { passive: true });

    wheelListeners.set(element, wheel);
  }
};

const beforeUnmount = (element: HTMLElement) => {
  const listener = wheelListeners.get(element);

  if (listener) {
    element.removeEventListener('wheel', listener);

    wheelListeners.delete(element);
  }
};

export const CarouselScrollDirective: ObjectDirective<HTMLElement, Binding> = {
  beforeMount,
  beforeUnmount,
};
