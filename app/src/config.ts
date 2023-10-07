import { defineConfig } from '@tok/generation';

export default defineConfig({
  // If you want to add language/currency localization – see ./examples/meditation as reference

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
          },
          pagination: 'count',
          shape: 'rounded',
          title: "Onboarding supports many types of content",
          description: "Here you can see <b>Image</b>. But it's just the beginning...",
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

        // video
        {
          media: {
            type: 'video',
            src: import('./assets/videos/spongebob.mp4'),  // TODO add preview
            style: 'aspect-ratio: 400/287',  // here we manually set video aspect-ratio (default is 16:9)
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Videos',
          description: "Typically, video starts <b>automatically</b><br><br>However, on iOS, it will only autoplay upon any prior tap on the page ('Next' button doesn't count). If video doesn't autoplay, user will see preview and pretty animation, inviting them to tap to play the video",
          button: 'Next',
        },

        // list
        {
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
          list: [
            '<b>CSS styles</b>: extend primary colors from Telegram or set yours',
            'Button text and actions (look down)',
            'Use our carefully crafted <b>presets</b> or easily create your own',
            'Easy switch between Telegram and web popups',
          ],
          button: 'Super-Duper Next',
        },

        // slide with other features
        {
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
          list: [
            'One-click 0$ <b>deploy</b> on GitHub Pages',
            'Language and currency localization',
            'Buttons with <b>haptic</b> feedback',
            'Content pre-loading for high speed',
            '<b>Low-code</b> approach to building onboardings',
            'Many examples/presets',
            "And many more... (see <a href='https://www.google.com'>GitHub</a>)"
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
        'Adjustable product cards',
        '<b>👛 Wallet Pay</b> and <b>Telegram Payments</b> ready. Add custom methods easily',
        'Subscriptions or One-time payments',
      ],
      products: [
        {
          id: '1_month_subscription',
          title: '1 month subscription',
          description: '2$/month',
          discount: '',
          price: 2,
        },
        {
          id: '1_year_subscription',
          title: '1 year subscription',
          description: '1$/month',
          discount: 'Discount 50%',
          price: 12,
        },
        {
          id: 'lifetime_access',
          title: 'Lifetime access',
          description: '20$ once',
          discount: 'Best offer',
          price: 20,
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
