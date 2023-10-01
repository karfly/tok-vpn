import { inject, onBeforeUnmount } from 'vue';

import { TELEGRAM_TOKEN } from './Telegram.plugin';
import { HapticFeedbackStyle, MainButtonParams } from './telegram.type';

const supportedLanguages = ['ru', 'en'];
const defaultLanguage = 'en';

export function useTelegram() {
  const sdk = inject(TELEGRAM_TOKEN, null);

  const tgUser = sdk?.initDataUnsafe?.user;
  const tgLanguage = tgUser?.language_code;
  const language =
    tgLanguage && supportedLanguages.includes(tgLanguage)
      ? tgLanguage
      : defaultLanguage;

  const getTheme = () => {
    return sdk?.colorScheme;
  };

  const user = {
    id: tgUser?.id,
    language,
    photo_url: tgUser?.photo_url,
    is_bot: tgUser?.is_bot,
    first_name: tgUser?.first_name,
    last_name: tgUser?.last_name,
    username: tgUser?.username,
    is_premium: tgUser?.is_premium || false,
  };

  const expand = () => sdk?.expand();

  const ready = () => sdk?.ready();

  const haptic = (style: HapticFeedbackStyle = 'light') =>
    sdk?.HapticFeedback.impactOccurred(style);

  const showPopup = sdk?.showPopup;

  const showAlert = sdk?.showAlert;

  const onEvent = sdk?.onEvent;

  const sendData = sdk?.sendData;

  return {
    sendData,
    onEvent,
    getTheme,
    user,
    ready,
    expand,
    haptic,
    showPopup,
    showAlert,
  };
}

export function useTelegramMainButton() {
  const sdk = inject(TELEGRAM_TOKEN, null);
  const button = sdk?.MainButton || null;

  const listeners = new Set<() => void>();

  const show = (params: MainButtonParams) => {
    if (!button) {
      return;
    }

    button.setParams({ is_active: true, ...params });

    if (!button.isVisible) {
      button.show();
    }
  };

  const hide = () => {
    button?.hide();
  };

  const registerOnClick = (fn: () => void) => {
    listeners.add(fn);
  };

  const unregisterOnClick = (fn: () => void) => {
    listeners.delete(fn);
  };

  const buttonCallback = () => {
    listeners.forEach((fn) => fn());
  };

  button?.onClick(buttonCallback);

  onBeforeUnmount(() => {
    button?.offClick(buttonCallback);
    listeners.clear();
  });

  return {
    show,
    hide,
    unregisterOnClick,
    registerOnClick,
  };
}

export function useTelegramBackButton() {
  const sdk = inject(TELEGRAM_TOKEN, null);
  const button = sdk?.BackButton || null;

  const listeners = new Set<() => void>();

  const show = () => {
    if (button && !button.isVisible) {
      button.show();
    }
  };

  const hide = () => {
    button?.hide();
  };

  const registerOnClick = (fn: () => void) => {
    listeners.add(fn);
  };

  const buttonCallback = () => {
    listeners.forEach((fn) => fn());
  };

  button?.onClick(buttonCallback);

  onBeforeUnmount(() => {
    button?.offClick(buttonCallback);
    listeners.clear();
  });

  return {
    show,
    hide,
    registerOnClick,
  };
}
