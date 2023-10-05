import { Directive } from 'vue';

let wasinteraction = false;

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
};

export const AutoplayDirective: Directive<HTMLVideoElement> = {
  mounted,
};
