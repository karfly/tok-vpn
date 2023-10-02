import Telegram from '@twa-dev/sdk';
import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useTheme(value: 'light' | 'dark' | 'auto' = 'auto') {
  const init = value === 'auto' ? Telegram.colorScheme : value;

  const theme = ref(init);

  const onThemeChange = () => {
    theme.value = Telegram.colorScheme;
  };

  onMounted(() => {
    if (value === 'auto') {
      Telegram.onEvent('themeChanged', onThemeChange);
    }
  });

  onBeforeUnmount(() => {
    Telegram.offEvent('themeChanged', onThemeChange);
  });

  return theme;
}
