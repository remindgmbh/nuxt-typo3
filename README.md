# rmnd-nuxt-typo3

## Requirements

- nuxt-typo3

## Installation

1. install using npm install `rmnd-nuxt-typo3`

2. add module in nuxt.config.js

   ```javascript
   export default {
       ...
       modules: [
           ...
           'rmnd-nuxt-typo3',
           'nuxt-typo3',
           ...
       ]
       ...
   }
   ```

   **IMPORTANT: **`rmnd-nuxt-typo3` has to be above `nuxt-typo3`

   

3. add scss in nuxt.config.js

   ```javascript
   export default {
       ...
       css: [
           'rmnd-nuxt-typo3/src/styles/main.scss'
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

Instead of including `rmnd-nuxt-typo3/src/styles/main.scss` in `nuxt.config.js` create a new scss file, override variables and include the new file in `nuxt.config.js`:

```scss
// ./assets/styles/custom.scss

@forward 'rmnd-nuxt-typo3/src/styles/variables' with (
    $color-primary: red,
    $color-accent: blue,
);
    
@forward 'rmnd-nuxt-typo3/src/styles/main';
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

Variables available for override can be found in `rmnd-nuxt-typo3/src/styles/variables`.

