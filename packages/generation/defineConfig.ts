import { MediaPressetProps } from '@tok/generation/pressets/Media';
import { ThemeConfigParam } from '@tok/generation/tokens';
import { FlatButtonProps } from '@tok/ui/components/FlatButton';
import { CurrencyVariants } from '@tok/ui/setup/currency/currency';
import type { PopupButton } from '@twa-dev/types';
import { CSSProperties } from 'vue';

export type PaywalPopupPressetButtons = (PopupButton & {
  media?: MediaPressetProps;
})[];

type TODO = any;

export type _GenerationSlideConfig = {
  extends?: 'slide';

  media: MediaPressetProps;

  title: string;

  description?: string;

  pagination?: 'count';

  shape?: 'rounded' | 'square' | 'stacked';

  textAlign?: 'left' | 'center' | 'right';

  background?: string;

  button: string | (FlatButtonProps & { content: string }) | null;
};

export type _GenerationFormControlConfig = {
  id: string;
  placeholder: string;
  type?: 'checkbox' | 'number' | 'text';
  style?: string | CSSProperties;
};

export type _GenerationFormConfig = Omit<_GenerationSlideConfig, 'extends'> & {
  extends: 'form';

  form: _GenerationFormControlConfig[];
};

export type _GenerationListOptionsConfig = {
  media?: MediaPressetProps;
  text: string;
};

export type _GenerationListConfig = Omit<_GenerationSlideConfig, 'extends'> & {
  extends: 'list';

  list: _GenerationListOptionsConfig[];
};

export type _GenerationPrimitivePaywallConfig = Omit<
  _GenerationSlideConfig,
  'button' | 'extends'
> & {
  features?: { text: string; media?: MediaPressetProps }[] | string[];

  // can be shown with price Something {price} subscribe
  mainButtonText?: string;

  links: { text: string; href: string }[];

  // todo: fix type
  popup?: {
    type?: 'web' | 'telegram';
    title: string;
    message?: string;
    buttons: PaywalPopupPressetButtons;
  };
};

export type _GenerationPaywallProduct = {
  id: string;

  title: string;
  price: number;
  discount?: string;
  pricePostfix?: string;
};

export type _GenerationPaywallConfig = _GenerationPrimitivePaywallConfig & {
  extends: 'paywall';

  products: _GenerationPaywallProduct[];
};

export type _GenerationPaywallSingleConfig =
  _GenerationPrimitivePaywallConfig & {
    extends: 'paywall_single';

    product: {
      id: string;
      title: string;
      description: string;
      price: number;
      pricePostfix?: string;
      media?: MediaPressetProps;
    };
  };

export type _GenerationPaywallRowProductConfig = {
  id: string;

  title: string;

  description: string;

  price: number;

  bestText?: string;
};

export type _GenerationPaywallRowConfig = _GenerationPrimitivePaywallConfig & {
  extends: 'paywall_row';

  products: _GenerationPaywallRowProductConfig[];
};

export type _GenerationCarouselConfig<T> = {
  extends?: 'base';
  slides: (
    | _GenerationPaywallConfig
    | _GenerationPaywallSingleConfig
    | _GenerationPaywallRowConfig
    | _GenerationSlideConfig
    | _GenerationFormConfig
    | _GenerationListConfig
    | {
        [key in keyof T]: { extends: keyof T; [key: string]: any };
      }[keyof T]
  )[];
};

type BootstrapPage<TCustom> = {
  path?: string;
} & (
  | _GenerationCarouselConfig<TCustom>
  | _GenerationPaywallConfig
  | _GenerationPaywallSingleConfig
  | _GenerationPaywallRowConfig
  | _GenerationSlideConfig
  | _GenerationFormConfig
  | _GenerationListConfig
  | {
      [key in keyof TCustom]: {
        extends: keyof TCustom;
        [key: string]: any;
      };
    }[keyof TCustom]
);

export type DefinedPressetsKeys<T = BootstrapPage<{}>> = T extends {
  extends: infer E;
}
  ? E
  : T extends { extends?: string }
  ? 'base' | 'slide'
  : never;

export type BootstrapConfig<TDefined extends {}> = {
  theme?: ThemeConfigParam;
  locale?: {
    fallback: string;
  } & Record<string, TODO>;
  setupCurrency?: {
    // left
    align?: 'left' | 'right';

    // 2
    precision?: number;

    // USD
    currency?: CurrencyVariants;

    // .
    decimalSeparator?: string;

    // ' '
    thousandSeparator?: string;
  };
  definePressets?: TDefined;
  pages: BootstrapPage<TDefined>[];
};

export function defineConfig<TDefined extends {}>(
  config: BootstrapConfig<TDefined>
) {
  return config;
}
