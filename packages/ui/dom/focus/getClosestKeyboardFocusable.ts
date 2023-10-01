import { isNativeKeyboardFocusable } from './isNativeKeyboardFocusable';

const svgNodeFilter: NodeFilter = ((node: Node) =>
  'ownerSVGElement' in node
    ? NodeFilter.FILTER_REJECT
    : NodeFilter.FILTER_ACCEPT) as any;

export function getClosestKeyboardFocusable(
  initial: HTMLElement,
  prev = false,
  root: Node
): HTMLElement | null {
  if (!root.ownerDocument) {
    return null;
  }

  const treeWalker = root.ownerDocument.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    svgNodeFilter
  );

  treeWalker.currentNode = initial;

  while (prev ? treeWalker.previousNode() : treeWalker.nextNode()) {
    if (treeWalker.currentNode instanceof HTMLElement) {
      initial = treeWalker.currentNode;
    }

    if (isNativeKeyboardFocusable(initial)) {
      return initial;
    }
  }

  return null;
}
