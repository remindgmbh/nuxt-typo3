import Vue from 'vue'
import { Plugin } from '@nuxt/types'

import HtmlParser from '~rmnd-typo3/components/util/HtmlParser.vue'
import * as components from '~rmnd-typo3/components'

const plugin: Plugin = ({ app }) => {
    Object.keys({ ...components, HtmlParser }).forEach((key) => {
        if (app.components) {
            Vue.component(key, components[key])
            app.components[key] = components[key]
        }
    })
}

export default plugin
