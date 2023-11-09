// temporary fix until https://github.com/nuxt/module-builder/issues/90 is resolved

import { defineBuildConfig } from 'unbuild'
import copy from 'rollup-plugin-copy'

export default defineBuildConfig({
    hooks: {
        'rollup:options'(_ctx, options) {
            if (Array.isArray(options.plugins)) {
                options.plugins.push(
                    copy({
                        targets: [
                            { src: 'src/runtime/**/*.scss', dest: 'dist' },
                        ],
                        flatten: false,
                    }),
                )
            }
        },
    },
})
