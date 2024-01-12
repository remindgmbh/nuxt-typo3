// temporary fix until https://github.com/nuxt/module-builder/issues/90 is resolved

import copy from 'rollup-plugin-copy'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    hooks: {
        'rollup:options'(_ctx, options) {
            if (Array.isArray(options.plugins)) {
                options.plugins.push(
                    copy({
                        flatten: false,
                        targets: [
                            { dest: 'dist', src: 'src/runtime/**/*.scss' },
                        ],
                    }),
                )
            }
        },
    },
})
