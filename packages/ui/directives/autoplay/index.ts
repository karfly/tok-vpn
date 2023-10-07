import { Directive } from 'vue';

let wasinteraction = false;

const dict = new Map<HTMLVideoElement, () => void>();

const mounted = (el: HTMLVideoElement) => {
  if (wasinteraction) {
    el.play();

    return;
  }

  const play = () => {
    wasinteraction = true;

    el.play();
  };

  window.addEventListener('mousedown', play, { passive: true, once: true });
  window.addEventListener('touchstart', play, { passive: true, once: true });
  window.addEventListener('touchend', play, { passive: true, once: true });

  dict.set(el, play);
};

const beforeUnmount = (el: HTMLVideoElement) => {
  const handler = dict.get(el);

  if (handler) {
    window.removeEventListener('mousedown', handler);
    window.removeEventListener('touchstart', handler);
    window.removeEventListener('touchend', handler);
  }
};

export const AutoplayDirective: Directive<HTMLVideoElement> = {
  mounted,
  beforeUnmount,
};
