import Vue from 'vue'
import { Plugin } from '@nuxt/types'

import * as content from '~rmnd-typo3/components/content'
import * as layout from '~rmnd-typo3/components/layout'
import * as transition from '~rmnd-typo3/components/transition'
import * as ui from '~rmnd-typo3/components/ui'
import * as util from '~rmnd-typo3/components/util'
import * as vueFormulate from '~rmnd-typo3/components/vue-formulate'

const components = {
    ...content,
    ...layout,
    ...transition,
    ...ui,
    ...util,
    ...vueFormulate,
}

const plugin: Plugin = ({ app }) => {
    Object.keys(components).forEach((key) => {
        if (app.components) {
            Vue.component(key, components[key])
            app.components[key] = components[key]
        }
    })
}

export default plugin
