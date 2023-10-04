declare type TelegramStickerJson = {
  tgs: number;
  v: string;
  fr: number;
};

declare module '*.tgs' {
  export default TelegramStickerJson;
}

// declare module '*.tgs?component' {
//   import { FunctionalComponent } from 'vue';

//   type Props = {
//     autoplay?: boolean;
//     loop?: boolean;
//     speed?: boolean;
//     playOnClick?: boolean;
//   };

//   const src: FunctionalComponent<Props>;
//   export default src;
// }
