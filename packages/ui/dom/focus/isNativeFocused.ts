import { getNativeFocused } from './getNativeFocused';

export function isNativeFocused(node: Node | null): boolean {
  return (
    !!node &&
    !!node.ownerDocument &&
    getNativeFocused(node.ownerDocument) === node
  );
}
