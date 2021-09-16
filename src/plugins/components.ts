import Vue from 'vue'
import { Plugin } from '@nuxt/types'

import * as contentHelper from '~rmnd-typo3/components/content/helper'
import * as contentElements from '~rmnd-typo3/components/content/elements'
import * as ui from '~rmnd-typo3/components/ui'
import * as transitions from '~rmnd-typo3/components/transitions'
import * as util from '~rmnd-typo3/components/util'

const plugin: Plugin = ({ app }) => {
    const components = {
        ...contentHelper,
        ...contentElements,
        ...ui,
        ...util,
        ...transitions,
    }
    Object.keys(components).forEach((key) => {
        if (app.components) {
            Vue.component(key, components[key])
            app.components[key] = components[key]
        }
    })
}

export default plugin
