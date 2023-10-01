export function isNativeKeyboardFocusable(element: Element): boolean {
  if (
    element.hasAttribute('disabled') ||
    element.getAttribute('tabIndex') === '-1'
  ) {
    return false;
  }

  if (
    (element instanceof HTMLElement && element.isContentEditable) ||
    element.getAttribute('tabIndex') === '0'
  ) {
    return true;
  }

  switch (element.tagName) {
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    case 'VIDEO':
    case 'AUDIO':
      return element.hasAttribute('controls');
    case 'INPUT':
      return element.getAttribute('type') !== 'hidden';
    case 'A':
    case 'LINK':
      return element.hasAttribute('href');
    default:
      return false;
  }
}
