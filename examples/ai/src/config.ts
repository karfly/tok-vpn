import ActionSlide from './custom/ActionSlide.vue';

type Config = {
  pages: any[];
};

export default <Config>{
  // 'dark' | 'light' | 'auto'
  theme: 'dark',
  override: {
    action_slide: ActionSlide,
  },
  pages: [
    {
      slides: [
        {
          extends: 'action_slide',
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
          extends: 'action_slide',
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
          extends: 'action_slide',
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
      extends: 'paywallMultiProducts',
      path: '/paywall',
      media: {
        type: 'image',
        src: import('./assets/img/paywall.png'),
        style: 'aspect-ratio: 390/251',
      },
      title: 'Purchase credits and redress your photos',
      description: '1 credit = 1 photo re-dress',
      mainButtonText: 'Subscribe for {price} per month',
      products: [
        {
          id: 'id1',
          currency: 'USD',
          price: 4.99,
          title: '4<br />credits',
          description: 'Perfect to<br />start with',
        },
        {
          id: 'id2',
          currency: 'USD',
          price: 8.99,
          title: '20<br />credits',
          description: 'Best value<br />offer',
          bestText: 'Best&nbsp;Choise',
        },
        {
          id: 'id3',
          currency: 'USD',
          price: 19.99,
          title: '100<br />credits',
          description: 'For the true<br />enthusiasts',
        },
      ],
      links: [
        {
          text: 'Privacy policy',
          href: 'http://google.com',
        },
        {
          text: 'Terms of use',
          href: 'http://google.com',
        },
      ],
    },
  ],
};
