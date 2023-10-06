import { defineConfig } from '@tok/generation';

export default defineConfig({
  pages: [
    {
      slides: [
        {
          media: {
            type: 'image',
            src: import('./assets/img/base.png'),
            style: 'aspect-ratio: 420/465',
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'ChatGPT – the most powerful AI',
          description: 'Now in Telegram',
          button: 'Next',
        },
        {
          media: {
            type: 'image',
            src: import('./assets/img/base.png'),
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Send voice messages',
          description: 'Get instant answers',
          button: 'Next',
        },
        {
          media: {
            type: 'image',
            src: import('./assets/img/base.png'),
          },
          pagination: 'count',
          shape: 'rounded',
          title: 'Generate images from text',
          description: 'Powered by OpenAI',
          button: {
            content: 'Next',
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
        src: import('./assets/stickers/lama_clown.tgs'),
      },
      title: 'Unlock PRO Features',
      mainButtonText: 'Subscribe for {price}',
      features: [
        '100,000 tokens per day (50+ A4 pages)',
        'Access to GPT-4',
        'Voice messages',
        'PRO Chat Modes',
      ],
      products: [
        {
          id: 'id1',
          title: '12 months',
          description: '12$/month',
          discount: 'Discount 60%',
          price: 144,
        },
        {
          id: 'id2',
          title: '1 month',
          description: '16$/month',
          discount: 'Discount 60%',
          price: 16,
        },
        {
          id: 'id3',
          title: '1 week',
          description: '12$/month',
          price: 12,
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
