import { defineConfig } from '@tok/generation';

export default defineConfig({
  // TODO locales: see meditaion app example
  pages: [
    {
      slides: [
        // intro
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_hello.tgs'),
            style: 'width: 250px; height: 250px; margin: 0 auto',
          },
          pagination: 'count',
          title: 'Welcome to Telegram Onboarding Kit',
          description: "Create stunning onboarding and paywall for your Telegram Bot using the full power of Mini Apps<br><br>It's <b>simple</b>, <b>fast</b>, highly <b>customizable</b> and <a href='https://www.google.com'>open-source</a>!",  // TODO: add link to GitHub
          button: 'Next',
        },

        // image
        {
          media: {
            type: 'image',
            src: import('./assets/img/durov.webp'),
            // style: 'aspect-ratio: 1/1',
          },
          pagination: 'count',
          shape: 'rounded',
          title: "Onboardings supports many types of content",
          description: "Here you can see <b>Image</b>. But it's just the beginning...",
          button: 'Next',
        },

        // video
        {
          media: {
            type: 'video',
            src: import('./assets/videos/spongebob.mp4'),
            style: 'aspect-ratio: 400/287',  // TODO: (16:9 by default) docs
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Videos',
          description: 'We recommend using <b>.mp4</b> format',
          button: 'Next',
        },

        // sticker
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_love.tgs'),
            style: 'width: 300px; height: 300px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'square',
          title: 'Telegram stickers',
          description: 'Just download any <b>.tgs</b> sticker from Telegram and use it in your onboardings',
          button: 'Next',
        },

        // form
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
            },
            {
              id: 'number_from_form',
              placeholder: 'Number input',
              type: 'number',
            },
            {
              id: 'checkbox_from_form',
              placeholder: 'Checkbox',
              type: 'checkbox',
            },
          ],
          pagination: 'count',
          shape: 'square',
          title: 'Forms',
          description: 'User fills in the form – the bot receives the data',
          button: 'Next',
        },

        // list
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_juggling.tgs'),
            style: 'width: 150px; height: 150px; margin: 0 auto',
          },
          textAlign: 'left',
          shape: 'square',
          title: 'Lists',
          pagination: 'count',
          description: "Lists can be used to showcase <b>features</b> of your product. Items support customizable icons",
          list: [
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/guide.svg'),
                size: 30,
              },
              text: 'Some cool feature',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/track.svg'),
                size: 30,
              },
              text: 'Some very cool feature',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/time.svg'),
                size: 30,
              },
              text: 'Some extremely cool feature',
            },
          ],
          button: 'Next',
        },

        // "everything is customizable" slide
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_xray.tgs'),
            style: 'width: 250px; height: 250px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'square',
          title: 'Everything is customizable',
          description: '',
          textAlign: 'center',
          list: [  // TODO: go to default media in list
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: '<b>CSS styles</b>: extend primary colors from Telegram or set yours',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Button text and actions (look down)',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Use our carefully crafted <b>presets</b> or easily create your own',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Easy switch between Telegram and web popups',
            },
          ],
          button: 'Super-Duper Next',
        },

        // slide with other features
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_cool.tgs'),
            style: 'width: 150px; height: 150px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'square',
          title: 'Some other features:',
          description: '',
          textAlign: 'left',
          list: [  // TODO: go to default media in list
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'One click free <b>deployment</b> with GitHub Actions on GitHub Pages',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Language and currency localization',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Buttons with <b>haptic</b> feedback',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Many examples/presets',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: 'Content pre-loading for high speed',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: '<b>Low-code</b> approach to building onboardings',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/checkmark-fill.svg'),
                size: 20,
              },
              text: "And many more... (see <a href='https://www.google.com'>GitHub</a>)",  // TODO: add link to GitHub
            },
          ],
          button: 'Next',
        },

        // go to paywall slide
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_knife.tgs'),
            style: 'width: 250px; height: 250px; margin: 0 auto',
          },
          pagination: 'count',
          shape: 'square',
          title: "But onboarding slides are not enough...",
          description: "Let's go to Paywall",
          textAlign: 'center',
          button: {
            content: 'Go to Paywall',
            to: '/paywall',
          },
        },
      ],
    },

    // paywall
    {
      extends: 'paywall',
      path: '/paywall',
      shape: 'square',
      popup: {
        type: 'web',
        title: 'Choose payment method',
        message: '',
        buttons: [],  // TODO
      },
      media: {
        type: 'sticker',
        src: import('./assets/stickers/duck_money.tgs'),
        style: 'width: 150px; height: 150px; margin: 0 auto',
      },
      title: 'Your beautiful Paywall',
      mainButtonText: 'Buy for {price}',
      list: [
        'Ajustable product cards',
        '<b>Telegram Payments</b> and 👛 <b>Wallet Pay</b> TODO other methods',
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
