import { isNativeFocused } from './isNativeFocused';
import { setNativeFocused } from './setNativeFocused';

export function moveFocus(
  currentIndex: number,
  elements: ReadonlyArray<HTMLElement>,
  step: number
) {
  currentIndex += step;

  while (currentIndex >= 0 && currentIndex < elements.length) {
    setNativeFocused(elements[currentIndex]);

    if (isNativeFocused(elements[currentIndex])) {
      return;
    }

    currentIndex += step;
  }
}
