# Welcome to Telegram Onboarding Kit

## Introduction

Telegram Onboarding Kit is a versatile tool that allows developers to easily create onboarding applications by configuring various aspects of the app's behavior. With minimal adjustments to the configuration, you can achieve the desired onboarding experience for your users.

## Getting Started

1. Fork this repository
2. Clone your forked repository

```
Make sure that you have installed `pip` and `node` on your machine
```

2. Run command `npm ci` to install packages
   1. The Python dependencies will be automatically installed as part of the process. You don't need to run any additional commands for this
3. After successful installation you are ready to run `mini app` with command `npm run dev`
4. To run python but run command `npm run bot`

## Configuration

The heart of this project lies in the configuration. By tweaking the configuration file, you can customize the onboarding experience according to your project's requirements. The configuration file can be found at [config.ts](./app/src/config.ts).

For detailed information on configuring the app, refer to the [Configuration Guide](./configuration-guide.md).

## Example Applications

To help you understand how to create your own configuration, we have provided three example applications in the `examples` directory. Each example demonstrates different onboarding scenarios and includes a sample configuration file.

1. Fashion AI App

   - Located in `examples/ai`.
   - Key Features: `custom pressets` `currency configuration`
   - To Run the App: Execute: `npm run dev:ai`

2. Meditation App

   - Located in `examples/meditation`.
   - Key Features: `localization`
   - To Run the App: Execute: `npm run dev:meditation`

3. WonderTales App
   - Located in `examples/wondertales`.
   - Key Features: `localization` `localized currency` `custom pages`
   - To Run the App: Execute: `npm run dev:wondertales`

## Reusable Packages

1. UI [Readme](packages/ui/README.md)
   A collection of essential UI components. Explore the potential of these components by visiting our [Figma project](https://www.figma.com/file/ssQqPZ2vqZhD4QF2xyCTd2/Telegram-Onboarding--ToolKit), where you can see them in action and gain a better understanding of their capabilities.
2. Telegram-UI [Readme](packages/telegram-ui/README.md)
   This package offers a convenient wrapper around the [@twa-dev/sdk](https://github.com/twa-dev/SDK), providing Vue-like components and use-case solutions for Popups, MainButton, BackButton, and Theme integration.
3. i18n [Readme](packages/i18n/README.md)
   A minimalistic package for handling localization in your applications. We refrain from using third-party solutions due to concerns about the bundle sizes they introduce. While we provide this solution, feel free to replace it with your own if it better suits your needs.
4. Generation [Readme](packages/generation/README.md)
   The primary package for generating projects via a configuration file. It offers presets that can be easily extended within the configuration file.

##### Tools:

1. Compress [Readme](packages/compress/README.md)
   A Node solution for image compression. It processes PNG, JPG, and JPEG files, compressing them and converting them into WEBP, PNG, JPG, or JPEG formats.
2. Eslint-Config [Readme](packages/compress/README.md)
   A basic ESLint configuration for vue projects to maintain clean and consistent code.
3. Tsconfig [Readme](packages/tsconfig/README.md)
   Shared `tsconfig.base.json` file for vue + vite projects

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
