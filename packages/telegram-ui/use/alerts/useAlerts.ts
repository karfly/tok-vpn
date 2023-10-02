import { useAlerts as useWebAlerts } from '@tok/ui/use/alerts';
import Telegram from '@twa-dev/sdk';

type Params = Parameters<typeof Telegram.showAlert>;

export function useAlerts(type: 'web' | 'telegram' = 'telegram') {
  const webAlerts = useWebAlerts();

  const show = (message: Params[0], onClose?: Params[1]) => {
    if (type === 'web') {
      webAlerts.show(message);

      return;
    }

    try {
      Telegram.showAlert(message, onClose);
    } catch (e) {
      webAlerts.show(message, {
        type: 'telegram',
        autoClose: false,
        onClose,
      });
    }
  };

  return {
    show,
  };
}
