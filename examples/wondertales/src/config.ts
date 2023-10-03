import Story from './story/StoryExample.vue';

type Config = {
  pages: any[];
};

export default <Config>{
  theme: 'dark',
  locale: {
    default: 'en',
    ru: import('./locales/ru.json'),
    en: import('./locales/en.json'),
  },
  override: {
    story: Story,
  },
  pages: [
    {
      slides: [
        {
          extends: 'slide',
          media: {
            type: 'image',
            src: import('./assets/img/main.png'),
            webp: import('./assets/img/main.webp'),
            style: 'aspect-ratio: 420/465',
          },
          title: '_s1.title',
          description: '_s1.description',
          button: '_s1.button',
        },
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/shpooky_love.tgs'),
            loop: true,
            style:
              'width: 160px; height: 160px; margin: 0 auto; margin-top: 1rem',
          },
          title: '_s2.title',
          list: [
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/smile.svg'),
              },
              text: '_s2.list1',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/learn.svg'),
              },
              text: '_s2.list2',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/play.svg'),
              },
              text: '_s2.list3',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/book.svg'),
              },
              text: '_s2.list4',
            },
          ],
          button: '_s2.button',
        },
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/shpooky_easy.tgs'),
            loop: true,
            style:
              'width: 160px; height: 160px; margin: 0 auto; margin-top: 1rem',
          },
          title: '_s3.title',
          description: '_s3.description',
          list: [
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/count_1.svg'),
              },
              text: '_s3.list1',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/count_2.svg'),
              },
              text: '_s3.list2',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/count_3.svg'),
              },
              text: '_s3.list3',
            },
          ],
          button: '_s2.button',
        },
        {
          extends: 'list',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/shpooky_speed.tgs'),
            loop: true,
            style:
              'height: 160px; width: 160px; margin: 0 auto; margin-top: 1rem',
          },
          title: '_s4.title',
          description: '_s4.description',
          list: [
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/time.svg'),
              },
              text: '_s4.list1',
            },
            {
              media: {
                type: 'icon',
                src: import('./assets/icons/play.svg'),
              },
              text: '_s4.list2',
            },
          ],
          button: '_s2.button',
        },
        {
          extends: 'slide',
          media: {
            type: 'image',
            src: import('./assets/img/colorful.png'),
            webp: import('./assets/img/colorful.webp'),
            style: 'aspect-ratio: 375/250',
          },
          title: '_s5.title',
          description: '_s5.description',
          button: '_s2.button',
        },
        {
          extends: 'slide',
          media: {
            type: 'image',
            src: import('./assets/img/unicorn.png'),
            webp: import('./assets/img/unicorn.webp'),
            style: 'aspect-ratio: 375/209',
          },
          title: '_s6.title',
          description: '_s6.description',
          button: {
            content: '_s6.button',
            to: '/story',
          },
        },
      ],
    },
    {
      extends: 'story',
      path: '/story',
    },
    {
      extends: 'base_paywall',
      path: '/paywall',
      media: {
        type: 'sticker',
        src: import('./assets/stickers/shpooky_party.tgs'),
        loop: true,
        style: 'width: 160px; height: 160px; margin: 0 auto; margin-top: 1rem',
      },
      title: '_paywall.title',
      mainButtonText: '_paywall.main',
      features: ['_paywall.feature1', '_paywall.feature2', '_paywall.feature3'],
      products: [
        {
          id: 'monthly',
          title: '1 month',
          price: 8.95,
          currency: 'USD',
          pricePostfix: '/month',
        },
        {
          id: 'yearly',
          title: '1 year',
          price: 5.95,
          discount: 'Discount 34%',
          currency: 'USD',
          pricePostfix: '/month',
        },
      ],
      popup: {
        type: 'telegram',
        message: '_paywall.popup.title',
        buttons: [
          {
            id: 'telegram_payments',
            text: '_paywall.popup.telegram_payments',
            type: 'default',
          },
          {
            id: 'wallet_pay',
            text: '_paywall.popup.wallet_pay',
            type: 'default',
          },
        ],
      },
      links: [
        {
          text: '_paywall.policy',
          href: '_paywall.policy_href',
        },
        {
          text: '_paywall.terms',
          href: '_paywall.terms_href',
        },
        {
          text: '_paywall.wt',
          href: '_paywall.wt_href',
        },
      ],
    },
  ],
};
