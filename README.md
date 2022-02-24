# REMIND - Nuxt TYPO3

This module is an extension to [nuxt-typo3](https://github.com/TYPO3-Headless/nuxt-typo3) and contains layouts and content elements defined in remind/typo3-headless as well as general Vue components to be used in a frontend application.

## Requirements

### Backend
TYPO3 Instance with the following extensions:
- friendsoftypo3/headless
- remind/typo3-content
- remind/typo3-headless

### Frontend
- nuxt-typo3

## Installation

1. install using npm install `@remindgmbh/nuxt-typo3`

2. add module in nuxt.config.js

   ```javascript
   export default {
       ...
       modules: [
           ...
           '@remindgmbh/nuxt-typo3',
           'nuxt-typo3',
           ...
       ]
       ...
   }
   ```

   **IMPORTANT: **`@remindgmbh/nuxt-typo3` has to be above `nuxt-typo3`

   

3. add scss in nuxt.config.js

   ```javascript
   export default {
       ...
       css: [
           '@remindgmbh/nuxt-typo3/src/styles/index.scss'
       ]
       ...
   }
   ```

   

## Configuration

### Module Options

#### Layout

##### Container

Wrap whole page in container instead of each content element on its own. Allows Shadow around all content elements but no full width content elements are possible.

*Default value = false*

```javascript
export default {
    ...
    rmndTypo3: {
        layout: {
            container: true
        }
    }
    ...
}
```



### SCSS Variables

Instead of including `@remindgmbh/nuxt-typo3/src/styles/index.scss` in `nuxt.config.js` create a new scss file, override variables and include the new file in `nuxt.config.js`:

```scss
// ./assets/styles/custom.scss

@forward '@remindgmbh/nuxt-typo3/src/styles/variables' with (
    $color-primary: red,
    $color-accent: blue,
);
    
@forward '@remindgmbh/nuxt-typo3/src/styles/index';
```

```
export default {
    ...
    css: [
        'assets/styles/custom.scss'
    ]
    ...
}
```

Variables available for override can be found in `@remindgmbh/nuxt-typo3/src/styles/variables`.

## Development

The easiest way to develop this module is to use yalc to add it to a nuxt application. Yalc can be installed globally using `npm i yalc -g`. Use `yalc add @remindgmbh/nuxt-typo3` in your nuxt application to add the dependency.
In this module run `npm run watch` to watch for changes and then automatically publish these changes to yalc.