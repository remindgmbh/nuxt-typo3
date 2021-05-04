import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import CeBackground from '~rmnd-typo3/components/content/CeBackground.vue'
import CeBreadcrumbs from '~rmnd-typo3/components/content/CeBreadcrumbs'
import CeFrame from '~rmnd-typo3/components/content/CeFrame.vue'
import CeRenderer from '~rmnd-typo3/components/content/CeRenderer'
import CeWrapper from '~rmnd-typo3/components/content/CeWrapper.vue'

const components = {
    CeBackground,
    CeBreadcrumbs,
    CeWrapper,
    CeRenderer,
    CeFrame,
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
