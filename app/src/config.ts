import { defineConfig } from '@tok/generation';

export default defineConfig({
  pages: [
    {
      slides: [
        // intro slide
        // TODO
        {
          media: {
            type: 'image',
            src: import('./assets/img/base.png'),
            style: 'aspect-ratio: 420/465',
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Telegram Onboarding Kit',
          description: 'Easily create stunning onboardings and paywalls for Telegram Bots',
          button: 'Next',
        },

        // slide with image
        {
          media: {
            type: 'image',
            src: import('./assets/img/durov.webp'),
            style: 'aspect-ratio: 1/1',
          },
          pagination: 'count',
          shape: 'rounded',
          title: "We support many content types. Let's start with Image",
          description: '<b>.webp</b>, <b>.png</b>, <b>.jpg</b> and other formats are supported',
          button: 'Next',
        },

        // slide with video
        {
          media: {
            type: 'video',
            src: import('./assets/videos/spongebob.webm'),
            style: 'aspect-ratio: 400/287',
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Videos',
          description: '<b>.webp</b>, <b>.mp4</b> formats are supported',
          button: 'Next',
        },

        // slide with sticker
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_love.tgs'),
            style: 'width: 250px; height: 250px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Animated Telegram stickers',
          description: '<b>.tgs</b> format is supported',
          button: 'Next',
        },

        // slide with form
        {
          extends: 'form',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_spy.tgs'),
            style: 'width: 150px; height: 150px; margin: 0 auto',
          },
          form: [
            {
              id: 'text_from_form',
              placeholder: 'Text input',
              type: 'text',
              // style: '--tok-radius-m: 12px',
            },
            {
              id: 'number_from_form',
              placeholder: 'Number input',
              type: 'number',
              // style: '--tok-radius-m: 12px',
            },
            {
              id: 'checkbox_from_form',
              placeholder: 'Checkbox',
              type: 'checkbox',
              // style: '--tok-radius-m: 12px',
            },
          ],
          pagination: 'count',
          shape: 'rounded',
          title: 'Even Forms are supported!',
          description: 'User fills in the form and then data is sent to the bot',
          button: 'Next',
        },

        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_juggling.tgs'),
            style: 'width: 200px; height: 200px; margin: 0 auto',
          },
          textAlign: 'left',
          title: 'Lists',
          description: 'Items support customizable icons',
          list: [
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/guide.svg'),
                size: 40,
              },
              text: 'Some cool feature',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/track.svg'),
                size: 40,
              },
              text: 'Some very cool feature',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/time.svg'),
                size: 40,
              },
              text: 'Some extremely cool feature',
            },
          ],
          button: {
            content: '_s4.button',
            to: '/paywall',
          },
        },

        // slide with cutomizable text alignment and button
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_xray.tgs'),
            style: 'width: 200px; height: 200px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Everything is very customizable!',
          description: "Text alignment, button text (look below), CSS styles",
          textAlign: 'center',
          button: 'Super-Duper Next',
        },

        // slide with other features
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_cool.tgs'),
            style: 'width: 200px; height: 200px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'We carefully worked out all the details',
          description: "Here're some other features:",
          textAlign: 'left',
          list: [  // TODO: go to default media in list
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'One click <b>deployment</b> with GitHub Actions on GitHub Pages',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Language localization support',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: "Automatic adaptation to Telegram's <b>color scheme</b>",
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Haptic feedback for "Next" button',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Many examples of implemented custom onboardings',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Content prefetching for fast loading',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Low-code approach to building onboardings',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Adaptive layout for different screen sizes',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'And much more... (see GitHub)',  // TODO: add link to GitHub
            },
          ],
          button: 'Next',
        },

        // slide with go to paywall
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_knife.tgs'),
            style: 'width: 200px; height: 200px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'rounded',
          title: "But onboarding slides are not enough...",
          description: "Let's go to Paywall...",
          textAlign: 'center',
          button: {
            content: 'Go to Paywall',
            to: '/paywall',
          },
        },
      ],
    },
    {
      extends: 'paywall',
      path: '/paywall',
      media: {
        type: 'sticker',
        src: import('./assets/stickers/duck_money.tgs'),
        style: 'width: 200px; height: 200px; margin: 0 auto',
      },
      title: 'Your beautiful Paywall',
      mainButtonText: 'Buy for {price}',
      features: [
        'Custom product list',
        '<b>Telegram Payments</b> and 👛 <b>Wallet Pay</b> support',
        'Subscriptions or One-time payments',
      ],
      products: [
        {
          id: '1_month_subscription',
          title: '1 month subscription',
          description: '12$/month',
          discount: '',
          price: 12,
        },
        {
          id: '1_year_subscription',
          title: '1 year subscription',
          description: '6$/month',
          discount: 'Discount 50%',
          price: 72,
        },
        {
          id: 'lifetime_access',
          title: 'Lifetime access',
          description: '100$ once',
          discount: 'Best offer',
          price: 100,
        },
      ],
      links: [
        {
          text: 'Privacy policy',
          href: 'https://google.com',
        },
        {
          text: 'Terms of use',
          href: 'https://google.com',
        },
      ],
    },
  ],
});
