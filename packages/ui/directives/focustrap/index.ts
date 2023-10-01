import {
  blurNativeFocused,
  getNativeFocused,
  setNativeFocused,
} from '@tok/ui/dom/focus';
import { DirectiveBinding, nextTick, ObjectDirective } from 'vue';

interface FocustrapHTMLElement extends HTMLElement {
  __stBeforeFocustrapFocusedElement: Element | null;
  __stBlurListener: (() => void) | null;
}

type FocustrapBinding = {
  handle: boolean;
};

export const FocustrapDirective: ObjectDirective<FocustrapHTMLElement> = {
  mounted: (
    element: FocustrapHTMLElement,
    { value }: DirectiveBinding<FocustrapBinding>
  ) => {
    if (value && value.handle === false) {
      return;
    }

    element.setAttribute('tabIndex', '0');

    element.__stBeforeFocustrapFocusedElement = getNativeFocused();

    nextTick(() => setNativeFocused(element));

    const listener = () => {
      element.removeAttribute('tabIndex');

      element.removeEventListener('blur', listener);
      element.__stBlurListener = null;
    };

    element.addEventListener('blur', listener);

    element.__stBlurListener = listener;
  },
  beforeUnmount: (element: FocustrapHTMLElement) => {
    blurNativeFocused();

    if (element.__stBlurListener) {
      element.removeEventListener('blur', element.__stBlurListener);
      element.__stBlurListener = null;
    }

    nextTick(() => {
      const activeElement = element.__stBeforeFocustrapFocusedElement;

      if (activeElement instanceof HTMLElement) {
        setNativeFocused(activeElement);
      }
    });
  },
};
