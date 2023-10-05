import { noop } from '@tok/ui/functions/noop';
import { MaybeRef } from '@tok/ui/types';
import { unref } from 'vue';

// https://github.com/vueuse/vueuse/blob/main/packages/shared/utils/filters.ts#L28

// TODO HUGE: REPLACE THIS
export interface DebounceFilterOptions {
  /**
   * The maximum time allowed to be delayed before it's invoked.
   * In milliseconds.
   */
  maxWait?: MaybeRefOrGetter<number>;

  /**
   * Whether to reject the last call if it's been cancel.
   *
   * @default false
   */
  rejectOnCancel?: boolean;
}

export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function' ? (r as AnyFn)() : unref(r);
}

export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T);

export type AnyFn = (...args: any[]) => any;

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;

export type PromisifyFn<T extends AnyFn> = (
  ...args: ArgumentsType<T>
) => Promise<ReturnType<T>>;

export type FunctionArgs<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;

export interface FunctionWrapperOptions<
  Args extends any[] = any[],
  This = any
> {
  fn: FunctionArgs<Args, This>;
  args: Args;
  thisArg: This;
}

export type EventFilter<
  Args extends any[] = any[],
  This = any,
  Invoke extends AnyFn = AnyFn
> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>;

export function createFilterWrapper<T extends AnyFn>(
  filter: EventFilter,
  fn: T
) {
  function wrapper(this: any, ...args: ArgumentsType<T>) {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      // make sure it's a promise
      Promise.resolve(
        filter(() => fn.apply(this, args), { fn, thisArg: this, args })
      )
        .then(resolve)
        .catch(reject);
    });
  }

  return wrapper;
}
/**
 * Create an EventFilter that throttle the events
 *
 * @param ms
 * @param [trailing=true]
 * @param [leading=true]
 * @param [rejectOnCancel=false]
 */
export function throttleFilter(
  ms: MaybeRefOrGetter<number>,
  trailing = true,
  leading = true,
  rejectOnCancel = false
) {
  let lastExec = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let isLeading = true;
  let lastRejector: AnyFn = noop;
  let lastValue: any;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
      lastRejector();
      lastRejector = noop;
    }
  };

  const filter: EventFilter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return (lastValue = _invoke());
    };

    clear();

    if (duration <= 0) {
      lastExec = Date.now();

      return invoke();
    }

    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }

    if (!leading && !timer) {
      timer = setTimeout(() => (isLeading = true), duration);
    }

    isLeading = false;

    return lastValue;
  };

  return filter;
}

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param   fn             A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param   ms             A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 *
 * @param [trailing=false] if true, call fn again after the time is up
 *
 * @param [leading=true] if true, call fn on the leading edge of the ms timeout
 *
 * @param [rejectOnCancel=false] if true, reject the last call if it's been cancel
 *
 * @return  A new, throttled, function.
 */
export function useThrottleFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  trailing = false,
  leading = true,
  rejectOnCancel = false
): PromisifyFn<T> {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
}

/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param options
 */
export function debounceFilter(
  ms: MaybeRefOrGetter<number>,
  options: DebounceFilterOptions = {}
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let maxTimer: ReturnType<typeof setTimeout> | undefined | null;
  let lastRejector: AnyFn = noop;

  const _clearTimeout = (timer: ReturnType<typeof setTimeout>) => {
    clearTimeout(timer);
    lastRejector();
    lastRejector = noop;
  };

  const filter: EventFilter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);

    if (timer) {
      _clearTimeout(timer);
    }

    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }

      return Promise.resolve(invoke());
    }

    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;

      // Create the maxTimer. Clears the regular timer on invoke
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer) {
            _clearTimeout(timer);
          }

          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }

      // Create the regular timer. Clears the max timer on invoke
      timer = setTimeout(() => {
        if (maxTimer) {
          _clearTimeout(maxTimer);
        }

        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };

  return filter;
}

/**
 * Debounce execution of a function.
 *
 * @see https://vueuse.org/useDebounceFn
 * @param  fn          A function to be executed after delay milliseconds debounced.
 * @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  opts        options
 *
 * @return A new, debounce, function.
 */
export function useDebounceFn<T extends FunctionArgs>(
  fn: T,
  ms: MaybeRefOrGetter<number> = 200,
  options: DebounceFilterOptions = {}
): PromisifyFn<T> {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
