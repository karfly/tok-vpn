import ActionSlide from './custom/ActionSlide.vue';

type Config = {
  pages: any[];
};

export default <Config>{
  // 'dark' | 'light' | 'auto'
  theme: 'dark',
  override: {
    slide: ActionSlide,
  },
  pages: [
    {
      slides: [
        {
          title: 'Transform into a stylish look!',
          description: "See how you'd look in a different outfit",
          actionButton: ['Apply beauty filter', 'Applied'],
          nextButton: 'Next',
          media: [
            {
              type: 'image',
              src: import('./assets/img/slide1_init.png'),
            },
            {
              type: 'image',
              src: import('./assets/img/slide1_res.png'),
            },
          ],
        },
        {
          title: 'Ready for an important meeting?',
          description: 'Find the perfect business attire',
          actionButton: ['Apply beauty filter', 'Applied'],
          nextButton: 'Next',
          media: [
            {
              type: 'image',
              src: import('./assets/img/slide2_init.png'),
            },
            {
              type: 'image',
              src: import('./assets/img/slide2_res.png'),
            },
          ],
        },
        {
          title: 'Planning a special date?',
          description: 'Choose an outfit that will impress!',
          actionButton: ['Apply beauty filter', 'Applied'],
          nextButton: {
            to: '/paywall',
            content: 'Next',
          },
          media: [
            {
              type: 'image',
              src: import('./assets/img/slide1_init.png'),
            },
            {
              type: 'image',
              src: import('./assets/img/slide1_res.png'),
            },
          ],
        },
      ],
    },
    {
      extends: 'paywall',
      path: '/paywall',
      media: {
        type: 'image',
        src: '/fifth.png',
        webp: '/fifth.webp',
        style: 'aspect-ratio: 420/340',
      },
      title: '_paywall.title',
      description: '_paywall.description',
      product: {
        media: {
          type: 'icon',
          name: 'star',
          size: 40,
        },
        title: '_paywall.product.title',
        price: 99,
        currency: 'USD',
        description: '_paywall.product.description',
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
      ],
    },
  ],
};
