// see https://github.com/nuxt/module-builder/issues/90#issuecomment-1902706165

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    hooks: {
        'mkdist:entry:options'(_ctx, _entry, opts) {
            opts.loaders = ['js', 'vue']
        },
    },
})
