# REMIND - Nuxt TYPO3

This nuxt3 module is the frontend part of the [TYPO3 headless extension](https://github.com/TYPO3-Headless/headless) and [remind/headless](https://github.com/remindgmbh/headless).

## Requirements

TYPO3 Instance with the following extensions:

-   [friendsoftypo3/headless](https://github.com/TYPO3-Headless/headless)
-   [remind/headless](https://github.com/remindgmbh/headless)

## Installation

1. install using `npm install @remindgmbh/nuxt-typo3`

2. add module in nuxt.config.js

    ```javascript
    export default defineNuxtConfig({
        ...
        modules: [
            ...
            '@remindgmbh/nuxt-typo3',
            ...
        ]
        ...
    })
    ```

## Configuration

Module options are described in `ModuleOptions` Interface in [module.ts](src/module.ts) and can be set using the config key `typo3`. Public runtimeConfig can be used as well to set module options.

Available [App Config](https://nuxt.com/docs/guide/directory-structure/app-config) inputs are described in [AppConfigInput Interface](src/runtime/models/config/appConfigInput.ts).

## Customization

To customize a components template, script and style just create a component with the same name to override the original.
Import the original component explicitly from `#nuxt-typo3/components/...` and use it in the template to simply add additional script and styles.


**IMPORTANT**: Never use styles in assets for customizing components because they will be loaded regardless if the component is used on the current page or not.

## Development

Use `npm install` to install dependencies. Add `.env` file to playground directory and set `NUXT_PUBLIC_TYPO3_BASE_URL` and `NUXT_PUBLIC_TYPO3_API_BASE_URL`. Then use `npm run dev` to start a dev server.
