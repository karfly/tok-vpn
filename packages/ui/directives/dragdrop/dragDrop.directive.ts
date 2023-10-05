import { DirectiveBinding, ObjectDirective } from 'vue';

type Binding = {
  onEvent: (element: HTMLElement | null, offset: [number, number]) => void;
};

type Events = [
  'touchstart' | 'mousedown',
  'touchmove' | 'mousemove',
  'touchend' | 'mouseup'
];

type FilterEvent = (event: MouseEvent | TouchEvent) => boolean;

type MapperEvent = (event: MouseEvent | TouchEvent) => {
  clientX: number;
  clientY: number;
};

// todo: refactor
const DRAG_DROP_INSTANCE_KEY = '__tok_dragDrop__';
const touchEvents = ['touchstart', 'touchmove', 'touchend'] as any as Events;
const mouseEvents = ['mousedown', 'mousemove', 'mouseup'] as any as Events;

export const DragDropDirective: ObjectDirective<HTMLElement, Binding> = {
  beforeMount: (element: HTMLElement, { value }: DirectiveBinding<Binding>) => {
    const eventFilter: FilterEvent = (event: MouseEvent | TouchEvent) => {
      return event instanceof MouseEvent ? true : event.touches.length < 2;
    };

    const eventMapper: MapperEvent = (event: MouseEvent | TouchEvent) => {
      return event instanceof MouseEvent
        ? {
            clientX: event.clientX,
            clientY: event.clientY,
          }
        : {
            clientX: event.touches[0].clientX,
            clientY: event.touches[0].clientX,
          };
    };

    const setup = (
      [startKey, moveKey, endKey]: Events,
      filter: FilterEvent,
      mapper: MapperEvent
    ) => {
      const callback = (event: TouchEvent | MouseEvent) => {
        if (!filter(event)) {
          return;
        }

        const mappedEvent = mapper(event);

        let currentPosition = {
          x: mappedEvent.clientX,
          y: mappedEvent.clientY,
        };

        const move = (moveEvent: MouseEvent | TouchEvent) => {
          if (!filter(moveEvent)) {
            return;
          }

          const mappedMoveEvent = mapper(moveEvent);

          value.onEvent(element, [
            mappedMoveEvent.clientX - currentPosition.x,
            mappedMoveEvent.clientY - currentPosition.y,
          ]);

          currentPosition = {
            x: mappedMoveEvent.clientX,
            y: mappedMoveEvent.clientY,
          };
        };

        const end = () => {
          document.removeEventListener(moveKey, move);
          document.removeEventListener(endKey, end);

          (document as any)[DRAG_DROP_INSTANCE_KEY + endKey] = null;
          (document as any)[DRAG_DROP_INSTANCE_KEY + moveKey] = null;
        };

        document.removeEventListener(endKey, end);

        document.addEventListener(moveKey, move, { passive: true });

        document.addEventListener(endKey, end, { passive: true });

        (document as any)[DRAG_DROP_INSTANCE_KEY + endKey] = end;
        (document as any)[DRAG_DROP_INSTANCE_KEY + moveKey] = move;
      };

      element.addEventListener(startKey, callback, { passive: true });
      (element as any)[`${DRAG_DROP_INSTANCE_KEY}${startKey}`] = callback;
    };

    setup(touchEvents, eventFilter, eventMapper);
    setup(mouseEvents, eventFilter, eventMapper);
  },
  beforeUnmount: (element: HTMLElement) => {
    [...touchEvents, ...mouseEvents].forEach((key) => {
      const documentCallback = (document as any)[
        `${DRAG_DROP_INSTANCE_KEY}${key}`
      ];
      const elementCallback = (element as any)[
        `${DRAG_DROP_INSTANCE_KEY}${key}`
      ];

      if (documentCallback) {
        document.removeEventListener(key, documentCallback);
      }

      if (elementCallback) {
        element.removeEventListener(key, elementCallback);
      }
    });
  },
};
